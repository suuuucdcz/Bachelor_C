/* ============================================================
   Exécution de code C à distance.
   Service principal : Piston (https://emkc.org) — gcc, gratuit,
   sans clé d'API. Service de secours : Wandbox.
   Aucune donnée n'est conservée côté serveur : le code est
   compilé, exécuté en bac à sable, et la sortie est renvoyée.
   ============================================================ */

const EXECUTEUR = (function () {
  const PISTON = "https://emkc.org/api/v2/piston";
  let versionC = null;

  async function versionPiston() {
    if (versionC) return versionC;
    try {
      const rep = await fetch(PISTON + "/runtimes");
      if (rep.ok) {
        const runtimes = await rep.json();
        const c = runtimes.find(function (r) { return r.language === "c"; });
        if (c) versionC = c.version;
      }
    } catch (e) { /* on tentera la version par défaut */ }
    if (!versionC) versionC = "10.2.0";
    return versionC;
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
      tue: !!(res.run && res.run.signal) /* signal = programme interrompu (temps dépassé ?) */
    };
  }

  async function viaWandbox(code, entree, fichiers) {
    const corps = {
      code: code,
      compiler: "gcc-head-c",
      options: "warning,gnu11",
      stdin: entree || ""
    };
    if (fichiers && fichiers.length > 0) {
      corps.codes = fichiers.map(function (f) { return { file: f.nom, code: f.contenu }; });
    }
    const rep = await fetch("https://wandbox.org/api/compile.json", {
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
      codeRetour: res.status !== undefined ? parseInt(res.status, 10) : null,
      tue: !!res.signal
    };
  }

  /* Point d'entrée : essaie Piston, bascule sur Wandbox en secours. */
  async function executer(code, entree, fichiers) {
    try {
      return await viaPiston(code, entree, fichiers);
    } catch (e1) {
      try {
        return await viaWandbox(code, entree, fichiers);
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
