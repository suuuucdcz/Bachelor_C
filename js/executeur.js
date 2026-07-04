/* ============================================================
   Exécution de code C à distance.
   Service principal : Wandbox (https://wandbox.org) — gcc 13,
   gratuit, sans clé d'API, accepte les fichiers annexes.
   Service de secours : Piston (emkc.org) — passé en liste
   blanche le 15/02/2026, conservé au cas où (ou pour une
   instance Piston auto-hébergée plus tard).
   Aucune donnée n'est conservée côté serveur : le code est
   compilé, exécuté en bac à sable, et la sortie est renvoyée.
   ============================================================ */

const EXECUTEUR = (function () {
  const WANDBOX = "https://wandbox.org/api/compile.json";
  const COMPILATEUR = "gcc-13.2.0-c"; /* version stable épinglée */
  const PISTON = "https://emkc.org/api/v2/piston";
  let versionPistonC = null;

  /* ---------- Wandbox (principal) ---------- */

  async function viaWandbox(code, entree, fichiers) {
    const corps = {
      code: code,
      compiler: COMPILATEUR,
      options: "warning,gnu11",
      stdin: entree || ""
    };
    if (fichiers && fichiers.length > 0) {
      corps.codes = fichiers.map(function (f) { return { file: f.nom, code: f.contenu }; });
    }
    const rep = await fetch(WANDBOX, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps)
    });
    if (!rep.ok) throw new Error("Wandbox HTTP " + rep.status);
    const res = await rep.json();
    if (res.compiler_error && res.status !== "0") {
      return { ok: false, etape: "compilation", message: res.compiler_error };
    }
    return {
      ok: true,
      stdout: res.program_output || "",
      stderr: res.program_error || "",
      codeRetour: res.status !== undefined && res.status !== "" ? parseInt(res.status, 10) : null,
      tue: !!res.signal /* signal = programme interrompu (boucle infinie ?) */
    };
  }

  /* ---------- Piston (secours) ---------- */

  async function versionPiston() {
    if (versionPistonC) return versionPistonC;
    try {
      const rep = await fetch(PISTON + "/runtimes");
      if (rep.ok) {
        const runtimes = await rep.json();
        const c = runtimes.find(function (r) { return r.language === "c"; });
        if (c) versionPistonC = c.version;
      }
    } catch (e) { /* on tentera la version par défaut */ }
    if (!versionPistonC) versionPistonC = "10.2.0";
    return versionPistonC;
  }

  async function viaPiston(code, entree, fichiers) {
    const version = await versionPiston();
    const files = [{ name: "main.c", content: code }];
    (fichiers || []).forEach(function (f) {
      files.push({ name: f.nom, content: f.contenu });
    });
    const rep = await fetch(PISTON + "/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "c",
        version: version,
        files: files,
        stdin: entree || "",
        compile_timeout: 10000,
        run_timeout: 5000
      })
    });
    if (!rep.ok) throw new Error("Piston HTTP " + rep.status);
    const res = await rep.json();
    if (res.compile && res.compile.code !== 0) {
      return {
        ok: false,
        etape: "compilation",
        message: res.compile.stderr || res.compile.stdout || "Erreur de compilation inconnue"
      };
    }
    return {
      ok: true,
      stdout: (res.run && res.run.stdout) || "",
      stderr: (res.run && res.run.stderr) || "",
      codeRetour: res.run ? res.run.code : null,
      tue: !!(res.run && res.run.signal)
    };
  }

  /* Point d'entrée : essaie Wandbox, bascule sur Piston en secours. */
  async function executer(code, entree, fichiers) {
    try {
      return await viaWandbox(code, entree, fichiers);
    } catch (e1) {
      try {
        return await viaPiston(code, entree, fichiers);
      } catch (e2) {
        return {
          ok: false,
          etape: "reseau",
          message: "Impossible de joindre le service d'exécution. Vérifie ta connexion Internet puis réessaie."
        };
      }
    }
  }

  return { executer: executer };
})();
