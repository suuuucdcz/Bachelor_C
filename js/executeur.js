/* ============================================================
   Exécution de code C à distance.
   Service principal : Compiler Explorer / godbolt.org (gcc 13,
   rapide, gratuit, sans clé d'API).
   Service de secours : Wandbox (gcc 13).
   Les fichiers de données des exercices (CM07) sont injectés
   directement dans le source compilé (voir app.js), les deux
   services se comportent donc exactement pareil.
   Aucune donnée n'est conservée côté serveur : le code est
   compilé, exécuté en bac à sable, et la sortie est renvoyée.
   ============================================================ */

const EXECUTEUR = (function () {
  const GODBOLT = "https://godbolt.org/api/compiler/cg132/compile"; /* gcc 13.2 pour C */
  const WANDBOX = "https://wandbox.org/api/compile.json";
  const COMPILATEUR_WANDBOX = "gcc-13.2.0-c";

  /* Annule la requête si le service met trop longtemps à répondre,
     pour laisser sa chance au service de secours. */
  function signalDelai(ms) {
    const ctrl = new AbortController();
    setTimeout(function () { ctrl.abort(); }, ms);
    return ctrl.signal;
  }

  function lignes(tableau) {
    return (tableau || []).map(function (l) { return l.text; }).join("\n");
  }

  /* Enlève les codes couleur ANSI des diagnostics gcc et remplace le
     nom de fichier interne de Godbolt par quelque chose de lisible. */
  function nettoyerDiagnostic(texte) {
    return String(texte)
      .replace(/\[[0-9;]*[A-Za-z]/g, "")
      .replace(/<source>/g, "code.c");
  }

  /* ---------- Godbolt / Compiler Explorer (principal) ---------- */

  async function viaGodbolt(code, entree) {
    const rep = await fetch(GODBOLT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      signal: signalDelai(12000),
      body: JSON.stringify({
        source: code,
        options: {
          userArguments: "-std=gnu11 -O0 -Wall -Wextra -fdiagnostics-color=never",
          executeParameters: { args: [], stdin: entree || "" },
          compilerOptions: { executorRequest: true, skipAsm: true },
          filters: { execute: true },
          tools: [],
          libraries: []
        },
        lang: "c",
        allowStoreCodeDebug: false
      })
    });
    if (!rep.ok) throw new Error("Godbolt HTTP " + rep.status);
    const res = await rep.json();
    const compil = res.buildResult;
    if (compil && typeof compil.code === "number" && compil.code !== 0) {
      return {
        ok: false,
        etape: "compilation",
        message: nettoyerDiagnostic(lignes(compil.stderr)) || "Erreur de compilation inconnue"
      };
    }
    return {
      ok: true,
      stdout: lignes(res.stdout),
      stderr: lignes(res.stderr),
      codeRetour: typeof res.code === "number" ? res.code : null,
      tue: res.timedOut === true, /* programme interrompu : boucle infinie ? */
      avertissements: compil ? nettoyerDiagnostic(lignes(compil.stderr)) : ""
    };
  }

  /* ---------- Wandbox (secours) ---------- */

  async function viaWandbox(code, entree) {
    const rep = await fetch(WANDBOX, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: signalDelai(8000),
      body: JSON.stringify({
        code: code,
        compiler: COMPILATEUR_WANDBOX,
        options: "warning,gnu11",
        stdin: entree || ""
      })
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
      tue: !!res.signal,
      avertissements: res.compiler_error || ""
    };
  }

  /* Point d'entrée : Godbolt, puis Wandbox en secours, puis une
     dernière tentative Godbolt (les échecs sont souvent passagers). */
  async function executer(code, entree) {
    try { return await viaGodbolt(code, entree); } catch (e1) { /* on continue */ }
    try { return await viaWandbox(code, entree); } catch (e2) { /* on continue */ }
    try { return await viaGodbolt(code, entree); } catch (e3) { /* tant pis */ }
    return {
      ok: false,
      etape: "reseau",
      message: "Impossible de joindre les services d'exécution. Vérifie ta connexion Internet puis réessaie."
    };
  }

  return { executer: executer, _godbolt: viaGodbolt, _wandbox: viaWandbox };
})();
