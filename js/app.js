/* ============================================================
   Moteur du site d'entraînement C — TBIn212
   Quiz + fiches + atelier de code (compilation en ligne)
   ============================================================ */

const CLE_STOCKAGE = "entrainementC_progression";
const app = document.getElementById("app");

let progression = chargerProgression();
let quiz = null;            // état du quiz en cours
let editeur = null;         // instance CodeMirror (ou repli textarea)
let minuterieSauvegarde = null;
let filtreDiff = 0;         // 0 = toutes les difficultés
let filtreStatut = "tous";  // tous | afaire | reussis

/* En-têtes ajoutés automatiquement devant les exercices "fonction" */
const ENTETES_FONCTION = "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <ctype.h>\n\n";

/* ---------------- Utilitaires ---------------- */

function chargerProgression() {
  let p = { scores: {}, exercices: {} };
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (brut) p = JSON.parse(brut);
  } catch (e) { /* stockage corrompu : on repart de zéro */ }
  if (!p.scores) p.scores = {};
  if (!p.exercices) p.exercices = {};
  return p;
}

function sauverProgression() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(progression));
  } catch (e) { /* stockage indisponible : mode sans sauvegarde */ }
  /* si un compte est connecté, on pousse aussi en ligne (différé) */
  if (typeof COMPTE !== "undefined" && COMPTE.connecte()) {
    COMPTE.programmerPush(progression);
  }
}

/* Fusionne la progression locale et celle du compte en ligne :
   on garde le meilleur des deux mondes (meilleurs scores de quiz,
   statut "réussi" prioritaire, brouillons de code conservés). */
function fusionnerProgressions(locale, distante) {
  const a = locale || { scores: {}, exercices: {} };
  const b = distante || { scores: {}, exercices: {} };
  const r = { scores: {}, exercices: {} };

  const idsScores = Object.keys(a.scores || {}).concat(Object.keys(b.scores || {}));
  idsScores.forEach(function (id) {
    const sa = (a.scores || {})[id];
    const sb = (b.scores || {})[id];
    if (sa && sb) {
      r.scores[id] = pourcentage(sa.meilleur, sa.total) >= pourcentage(sb.meilleur, sb.total) ? sa : sb;
    } else {
      r.scores[id] = sa || sb;
    }
  });

  const idsExos = Object.keys(a.exercices || {}).concat(Object.keys(b.exercices || {}));
  idsExos.forEach(function (id) {
    const ea = (a.exercices || {})[id];
    const eb = (b.exercices || {})[id];
    if (ea && eb) {
      const statuts = { reussi: 2, tente: 1 };
      const meilleurStatut = (statuts[ea.statut] || 0) >= (statuts[eb.statut] || 0) ? ea.statut : eb.statut;
      r.exercices[id] = {
        statut: meilleurStatut,
        code: ea.code !== undefined ? ea.code : eb.code /* le code de l'appareil actuel prime */
      };
    } else {
      r.exercices[id] = ea || eb;
    }
  });

  return r;
}

/* Appelée par compte.js après connexion : applique la progression
   du compte (fusionnée avec la progression locale) et rafraîchit. */
function appliquerProgressionDistante(distante) {
  progression = fusionnerProgressions(progression, distante);
  sauverProgression(); /* enregistre localement ET repousse la fusion en ligne */
  majProgressionGlobale();
  afficherAccueil();
}

function echapper(texte) {
  return String(texte)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* Coloration syntaxique minimaliste pour le C (une seule passe) */
function colorerC(source) {
  const texte = echapper(source);
  const motif = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:\\.|[^"\\\n])*")|('(?:\\.|[^'\\\n])+')|(^[ \t]*#\w+[^\n]*)|\b(int|char|float|double|void|if|else|for|while|do|return|switch|case|default|break|continue|struct|typedef|const|unsigned|signed|long|short|sizeof|enum|static|FILE|NULL|EOF|size_t)\b|(\b\d+(?:\.\d+)?\b)/gm;
  return texte.replace(motif, function (m, com, str, chr, pp, mot, nb) {
    if (com) return '<span class="cd-mc">' + m + "</span>";
    if (str || chr) return '<span class="cd-ch">' + m + "</span>";
    if (pp) return '<span class="cd-pp">' + m + "</span>";
    if (mot) return '<span class="cd-mo">' + m + "</span>";
    if (nb) return '<span class="cd-nb">' + m + "</span>";
    return m;
  });
}

function melanger(tableau) {
  const copie = tableau.slice();
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

function normaliser(s) {
  return String(s).replace(/\s+/g, " ").trim();
}

/* Comparaison des sorties de programme : on ignore les espaces de fin
   de ligne et les lignes vides finales, mais on respecte le reste. */
function normaliserSortie(s) {
  return String(s)
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map(function (l) { return l.replace(/[ \t]+$/, ""); })
    .join("\n")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "");
}

function pourcentage(score, total) {
  return total > 0 ? Math.round((score / total) * 100) : 0;
}

function pause(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

/* Fait défiler la page pour rendre un élément visible (clavier virtuel
   et petit écran pris en compte via visualViewport). Défilement instantané :
   le défilement animé est ignoré par le navigateur dans certains contextes. */
function assurerVisible(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  if (r.top > vh - 130 || r.top < 0) {
    el.scrollIntoView({ block: "start" });
  }
}

/* ---------------- Statistiques exercices ---------------- */

function exercicesDe(chapitreId) {
  return EXERCICES.filter(function (e) { return e.chapitre === chapitreId; });
}

function statutExercice(id) {
  const e = progression.exercices[id];
  return e && e.statut ? e.statut : null;
}

function statsExos(chapitreId) {
  const liste = chapitreId ? exercicesDe(chapitreId) : EXERCICES;
  let reussis = 0, etoilesGagnees = 0, etoilesTotal = 0;
  liste.forEach(function (ex) {
    etoilesTotal += ex.difficulte;
    if (statutExercice(ex.id) === "reussi") {
      reussis++;
      etoilesGagnees += ex.difficulte;
    }
  });
  return { reussis: reussis, total: liste.length, etoilesGagnees: etoilesGagnees, etoilesTotal: etoilesTotal };
}

function etoilesHtml(d) {
  return '<span class="etoiles">' + "★".repeat(d) +
    '<span class="etoile-vide">' + "★".repeat(3 - d) + "</span></span>";
}

function iconeStatut(id) {
  const s = statutExercice(id);
  if (s === "reussi") return "✅";
  if (s === "tente") return "🟠";
  return "⚪";
}

/* ---------------- Progression globale (en-tête) ---------------- */

function majProgressionGlobale() {
  let somme = 0;
  CHAPITRES.forEach(function (ch) {
    const s = progression.scores[ch.id];
    const quizPct = s ? pourcentage(s.meilleur, s.total) : 0;
    const st = statsExos(ch.id);
    const exoPct = pourcentage(st.reussis, st.total);
    somme += (quizPct + exoPct) / 2;
  });
  const moyenne = Math.round(somme / CHAPITRES.length);
  document.getElementById("progression-texte").textContent = moyenne + " %";
  document.getElementById("progression-barre").style.width = moyenne + "%";
}

/* ---------------- Page d'accueil ---------------- */

function afficherAccueil() {
  quiz = null;
  const stG = statsExos(null);

  let html = '<div class="hero">' +
    "<h1>Entraîne-toi en C, chapitre par chapitre 🚀</h1>" +
    "<p>Fiches de révision, quiz interactifs et atelier de code avec vraie compilation, " +
    "générés à partir de ton cours TBIn212.</p>" +
    "</div>";

  html += '<div class="carte-atelier">' +
    "<div><h3>💻 Atelier de code</h3>" +
    "<p>" + EXERCICES.length + " exercices de rédaction de C, du ★ au ★★★, compilés et corrigés en ligne. " +
    "Réussis : <strong>" + stG.reussis + "/" + stG.total + "</strong> · Étoiles : <strong>⭐ " +
    stG.etoilesGagnees + "/" + stG.etoilesTotal + "</strong></p></div>" +
    '<button class="btn btn-vert" id="btn-atelier">Ouvrir l\'atelier →</button>' +
    "</div>";

  html += '<div class="grille-chapitres">';
  CHAPITRES.forEach(function (ch) {
    const s = progression.scores[ch.id];
    const quizPct = s ? pourcentage(s.meilleur, s.total) : 0;
    const st = statsExos(ch.id);
    const exoPct = pourcentage(st.reussis, st.total);
    html += '<div class="carte-chapitre" data-chapitre="' + ch.id + '">' +
      '<div class="haut">' +
      '<div class="icone">' + ch.icone + "</div>" +
      "<div>" +
      '<div class="numero">' + ch.numero + "</div>" +
      "<h3>" + echapper(ch.titre) + "</h3>" +
      "</div></div>" +
      '<p class="description">' + echapper(ch.description) + "</p>" +
      '<div class="bas-colonne">' +
      '<div class="ligne-prog"><span class="libelle">✏️ Quiz</span>' +
      '<div class="barre"><div class="barre-remplie" style="width:' + quizPct + '%"></div></div>' +
      '<span class="valeur">' + (s ? s.meilleur + "/" + s.total : "—") + "</span></div>" +
      '<div class="ligne-prog"><span class="libelle">💻 Exos</span>' +
      '<div class="barre"><div class="barre-remplie" style="width:' + exoPct + '%"></div></div>' +
      '<span class="valeur">' + st.reussis + "/" + st.total + "</span></div>" +
      "</div></div>";
  });
  html += "</div>";

  const se = progression.scores.examen;
  const scoreExamen = se
    ? "Meilleur score : " + se.meilleur + "/" + se.total + " (" + pourcentage(se.meilleur, se.total) + " %)"
    : "Pas encore tenté.";
  html += '<div class="carte-examen">' +
    "<div><h3>🎓 " + EXAMEN.titre + "</h3>" +
    "<p>" + EXAMEN.description + " " + scoreExamen + "</p></div>" +
    '<button class="btn btn-principal" id="btn-examen">Lancer l\'examen</button>' +
    "</div>";

  app.innerHTML = html;

  app.querySelectorAll(".carte-chapitre").forEach(function (carte) {
    carte.addEventListener("click", function () {
      afficherChapitre(carte.dataset.chapitre, "fiche");
    });
  });
  document.getElementById("btn-atelier").addEventListener("click", function () {
    vueAtelier();
  });
  document.getElementById("btn-examen").addEventListener("click", demarrerExamen);
  window.scrollTo(0, 0);
}

/* ---------------- Page chapitre (fiche + quiz + exos) ---------------- */

function afficherChapitre(id, onglet) {
  const ch = CHAPITRES.find(function (c) { return c.id === id; });
  if (!ch) return afficherAccueil();
  const nbExos = exercicesDe(id).length;

  let html = '<div class="fil-ariane"><a id="retour-accueil">← Accueil</a><span>/</span><span>' +
    ch.numero + "</span></div>";
  html += '<div class="titre-chapitre"><div class="icone">' + ch.icone + "</div>" +
    "<h1>" + echapper(ch.titre) + "<small>" + ch.numero + " — " + ch.questions.length +
    " questions · " + nbExos + " exercices de code</small></h1></div>";

  html += '<div class="onglets">' +
    '<button class="onglet' + (onglet === "fiche" ? " actif" : "") + '" data-onglet="fiche">📖 Fiche</button>' +
    '<button class="onglet' + (onglet === "quiz" ? " actif" : "") + '" data-onglet="quiz">✏️ Quiz</button>' +
    '<button class="onglet' + (onglet === "exos" ? " actif" : "") + '" data-onglet="exos">💻 Exercices (' + nbExos + ")</button>" +
    "</div>";

  html += '<div id="contenu-chapitre"></div>';
  app.innerHTML = html;

  document.getElementById("retour-accueil").addEventListener("click", afficherAccueil);
  app.querySelectorAll(".onglet").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.onglet === "quiz") {
        demarrerQuiz(ch);
      } else {
        afficherChapitre(id, btn.dataset.onglet);
      }
    });
  });

  if (onglet === "quiz") {
    demarrerQuiz(ch);
  } else if (onglet === "exos") {
    afficherListeExos(ch);
  } else {
    afficherFiche(ch);
  }
  window.scrollTo(0, 0);
}

function afficherFiche(ch) {
  const zone = document.getElementById("contenu-chapitre");
  let html = "";
  ch.fiche.forEach(function (section) {
    html += '<div class="section-fiche"><h3>' + echapper(section.titre) + "</h3>" +
      (section.html || "");
    if (section.code) {
      html += '<div class="bloc-code">' + colorerC(section.code) + "</div>";
    }
    html += "</div>";
  });
  html += '<div class="appel-quiz"><button class="btn btn-principal" id="btn-vers-quiz">✏️ Quiz (' +
    ch.questions.length + ' questions)</button> <button class="btn btn-vert" id="btn-vers-exos">💻 Exercices de code</button></div>';
  zone.innerHTML = html;
  document.getElementById("btn-vers-quiz").addEventListener("click", function () {
    demarrerQuiz(ch);
  });
  document.getElementById("btn-vers-exos").addEventListener("click", function () {
    afficherChapitre(ch.id, "exos");
  });
}

/* Liste des exercices d'un chapitre (onglet) */
function afficherListeExos(ch) {
  const zone = document.getElementById("contenu-chapitre");
  zone.innerHTML = rendreLignesExos(exercicesDe(ch.id));
  brancherLignesExos(zone, { chapitre: ch.id });
}

/* ---------------- Atelier global ---------------- */

function vueAtelier() {
  quiz = null;
  const st = statsExos(null);

  let html = '<div class="fil-ariane"><a id="retour-accueil">← Accueil</a><span>/</span><span>Atelier</span></div>';
  html += '<div class="titre-chapitre"><div class="icone">💻</div>' +
    "<h1>Atelier de code<small>" + EXERCICES.length + " exercices · réussis : " + st.reussis + "/" + st.total +
    " · ⭐ " + st.etoilesGagnees + "/" + st.etoilesTotal + "</small></h1></div>";

  html += '<div class="filtres">' +
    puce("d0", "Toutes difficultés", filtreDiff === 0) +
    puce("d1", "★", filtreDiff === 1) +
    puce("d2", "★★", filtreDiff === 2) +
    puce("d3", "★★★", filtreDiff === 3) +
    '<span style="width:12px"></span>' +
    puce("stous", "Tous", filtreStatut === "tous") +
    puce("safaire", "À faire", filtreStatut === "afaire") +
    puce("sreussis", "Réussis", filtreStatut === "reussis") +
    "</div>";

  let liste = EXERCICES.filter(function (ex) {
    if (filtreDiff !== 0 && ex.difficulte !== filtreDiff) return false;
    const s = statutExercice(ex.id);
    if (filtreStatut === "afaire" && s === "reussi") return false;
    if (filtreStatut === "reussis" && s !== "reussi") return false;
    return true;
  });

  if (liste.length === 0) {
    html += '<p style="color:var(--texte-2);text-align:center;padding:30px">Aucun exercice ne correspond à ces filtres.</p>';
  } else {
    CHAPITRES.forEach(function (ch) {
      const duChapitre = liste.filter(function (e) { return e.chapitre === ch.id; });
      if (duChapitre.length === 0) return;
      html += '<div class="groupe-exos"><h3>' + ch.icone + " " + ch.numero + " · " + echapper(ch.titre) + "</h3>" +
        rendreLignesExos(duChapitre) + "</div>";
    });
  }

  app.innerHTML = html;
  document.getElementById("retour-accueil").addEventListener("click", afficherAccueil);

  const actions = {
    d0: function () { filtreDiff = 0; }, d1: function () { filtreDiff = 1; },
    d2: function () { filtreDiff = 2; }, d3: function () { filtreDiff = 3; },
    stous: function () { filtreStatut = "tous"; },
    safaire: function () { filtreStatut = "afaire"; },
    sreussis: function () { filtreStatut = "reussis"; }
  };
  app.querySelectorAll(".puce").forEach(function (p) {
    p.addEventListener("click", function () {
      actions[p.dataset.filtre]();
      vueAtelier();
    });
  });
  brancherLignesExos(app, { atelier: true });
  window.scrollTo(0, 0);
}

function puce(filtre, libelle, active) {
  return '<button class="puce' + (active ? " active" : "") + '" data-filtre="' + filtre + '">' + libelle + "</button>";
}

function rendreLignesExos(liste) {
  let html = "";
  liste.forEach(function (ex) {
    const s = statutExercice(ex.id);
    const typeLibelle = ex.type === "fonction" ? "Fonction à écrire" : "Programme complet";
    html += '<div class="ligne-exo' + (s === "reussi" ? " reussi" : "") + '" data-exo="' + ex.id + '">' +
      '<span class="statut-exo">' + iconeStatut(ex.id) + "</span>" +
      '<div class="infos"><strong>' + echapper(ex.titre) + "</strong>" +
      "<small>" + typeLibelle + "</small></div>" +
      etoilesHtml(ex.difficulte) +
      "</div>";
  });
  return html;
}

function brancherLignesExos(zone, origine) {
  zone.querySelectorAll(".ligne-exo").forEach(function (ligne) {
    ligne.addEventListener("click", function () {
      vueExercice(ligne.dataset.exo, origine);
    });
  });
}

/* ---------------- Page d'un exercice ---------------- */

function vueExercice(exId, origine) {
  const ex = EXERCICES.find(function (e) { return e.id === exId; });
  if (!ex) return vueAtelier();
  const ch = CHAPITRES.find(function (c) { return c.id === ex.chapitre; });
  origine = origine || { atelier: true };

  const memes = exercicesDe(ex.chapitre);
  const pos = memes.indexOf(ex);
  const precedent = pos > 0 ? memes[pos - 1] : null;
  const suivant = pos < memes.length - 1 ? memes[pos + 1] : null;

  const sauvegarde = progression.exercices[ex.id];
  const codeInitial = (sauvegarde && sauvegarde.code) ? sauvegarde.code : ex.depart;
  const reussi = statutExercice(ex.id) === "reussi";
  const retourLibelle = origine.chapitre ? "← " + ch.numero : "← Atelier";

  let html = '<div class="fil-ariane"><a id="retour-accueil">Accueil</a><span>/</span>' +
    '<a id="retour-liste">' + (origine.chapitre ? ch.numero + " · Exercices" : "Atelier") + "</a>" +
    "<span>/</span><span>" + echapper(ex.titre) + "</span></div>";

  html += '<div class="entete-exo"><div>' +
    "<h1>" + echapper(ex.titre) + "</h1>" +
    '<div class="meta">' + etoilesHtml(ex.difficulte) +
    "<span>" + ch.icone + " " + ch.numero + " · " + echapper(ch.titre) + "</span>" +
    "<span>" + (ex.type === "fonction" ? "Fonction à écrire" : "Programme complet") + "</span>" +
    "</div></div>" +
    (reussi ? '<span class="badge-reussi">✅ Réussi</span>' : "") +
    "</div>";

  html += '<div class="section-fiche">' + ex.enonce;
  if (ex.exemple) {
    html += '<div class="bloc-code">' + echapper(ex.exemple) + "</div>";
  }
  html += "</div>";

  if (ex.type === "fonction") {
    html += '<div class="note-fonction">⚠️ Écris uniquement la ou les fonctions demandées — <strong>pas de main</strong> : ' +
      "le testeur ajoute lui-même un programme principal qui appelle ta fonction.</div>";
  }

  html += '<div class="zone-editeur" id="zone-editeur"></div>';

  html += '<div class="barre-actions">' +
    '<button class="btn btn-vert" id="btn-tester">▶ Compiler &amp; tester</button>' +
    '<button class="btn" id="btn-indice">💡 Indice</button>' +
    '<button class="btn" id="btn-solution">👀 Solution</button>' +
    '<button class="btn btn-fantome" id="btn-reinit" title="Revenir au code de départ">↺ Réinitialiser</button>' +
    "</div>";

  html += '<div id="boite-indice"></div><div id="boite-solution"></div><div class="zone-resultats" id="zone-resultats"></div>';

  html += '<div class="nav-exos">' +
    (precedent ? '<button class="btn" id="btn-prec">← ' + echapper(precedent.titre) + "</button>" : "<span></span>") +
    (suivant ? '<button class="btn" id="btn-suiv">' + echapper(suivant.titre) + " →</button>" : "<span></span>") +
    "</div>";

  app.innerHTML = html;

  /* --- éditeur --- */
  creerEditeur(document.getElementById("zone-editeur"), codeInitial, ex.id);

  /* --- navigation --- */
  document.getElementById("retour-accueil").addEventListener("click", afficherAccueil);
  document.getElementById("retour-liste").addEventListener("click", function () {
    sauverBrouillon(ex.id);
    if (origine.chapitre) afficherChapitre(origine.chapitre, "exos");
    else vueAtelier();
  });
  if (precedent) {
    document.getElementById("btn-prec").addEventListener("click", function () {
      sauverBrouillon(ex.id);
      vueExercice(precedent.id, origine);
    });
  }
  if (suivant) {
    document.getElementById("btn-suiv").addEventListener("click", function () {
      sauverBrouillon(ex.id);
      vueExercice(suivant.id, origine);
    });
  }

  /* --- actions --- */
  document.getElementById("btn-tester").addEventListener("click", function () {
    testerExercice(ex, origine);
  });
  document.getElementById("btn-indice").addEventListener("click", function () {
    const boite = document.getElementById("boite-indice");
    if (boite.innerHTML) { boite.innerHTML = ""; return; }
    boite.innerHTML = '<div class="boite-indice">💡 ' + echapper(ex.indice || "Pas d'indice pour cet exercice.") + "</div>";
  });
  document.getElementById("btn-solution").addEventListener("click", function () {
    const boite = document.getElementById("boite-solution");
    if (boite.innerHTML) { boite.innerHTML = ""; return; }
    if (!reussi && !confirm("Voir la solution ? Essaie encore un peu avant… 😉")) return;
    boite.innerHTML = '<div class="section-fiche"><h3>👀 Solution proposée</h3>' +
      '<div class="bloc-code">' + colorerC(ex.solution) + "</div>" +
      "<p><em>Il existe souvent plusieurs façons correctes d'écrire la même chose !</em></p></div>";
  });
  document.getElementById("btn-reinit").addEventListener("click", function () {
    if (!confirm("Revenir au code de départ ? Ton code actuel sera perdu.")) return;
    editeur.setValue(ex.depart);
    sauverBrouillon(ex.id);
  });

  window.scrollTo(0, 0);
}

/* ---------------- Éditeur ---------------- */

function surTactile() {
  return window.matchMedia("(max-width: 600px)").matches || "ontouchstart" in window;
}

function creerEditeur(conteneur, valeur, exId) {
  const ta = document.createElement("textarea");
  ta.value = valeur;
  conteneur.appendChild(ta);
  const tactile = surTactile();

  if (window.CodeMirror) {
    const cm = CodeMirror.fromTextArea(ta, {
      mode: "text/x-csrc",
      theme: "material-darker",
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      matchBrackets: true,
      lineWrapping: true,
      viewportMargin: Infinity,
      /* saisie native sur mobile : meilleur support du clavier virtuel */
      inputStyle: tactile ? "contenteditable" : "textarea",
      extraKeys: {
        Tab: function (inst) { inst.replaceSelection("    "); }
      }
    });
    cm.on("change", function () { programmerSauvegarde(exId); });
    /* garder la ligne en cours de frappe visible au-dessus du clavier virtuel */
    cm.on("cursorActivity", function () {
      if (!surTactile()) return;
      const coords = cm.cursorCoords(true, "window");
      const vv = window.visualViewport;
      const limite = (vv ? vv.height : window.innerHeight) - 40;
      if (coords.bottom > limite) {
        window.scrollBy(0, coords.bottom - limite + 30);
      }
    });
    editeur = {
      getValue: function () { return cm.getValue(); },
      setValue: function (v) { cm.setValue(v); }
    };
  } else {
    /* repli sans CDN : simple textarea avec gestion de Tab */
    ta.className = "editeur-fallback";
    ta.spellcheck = false;
    ta.rows = 16;
    ta.setAttribute("autocapitalize", "off");
    ta.setAttribute("autocorrect", "off");
    ta.setAttribute("autocomplete", "off");
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const d = ta.selectionStart;
        ta.value = ta.value.slice(0, d) + "    " + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = d + 4;
      }
    });
    ta.addEventListener("input", function () { programmerSauvegarde(exId); });
    editeur = {
      getValue: function () { return ta.value; },
      setValue: function (v) { ta.value = v; }
    };
  }
}

function programmerSauvegarde(exId) {
  clearTimeout(minuterieSauvegarde);
  minuterieSauvegarde = setTimeout(function () { sauverBrouillon(exId); }, 1200);
}

function sauverBrouillon(exId) {
  if (!editeur) return;
  clearTimeout(minuterieSauvegarde);
  const entree = progression.exercices[exId] || {};
  entree.code = editeur.getValue();
  progression.exercices[exId] = entree;
  sauverProgression();
}

/* ---------------- Compilation & tests ---------------- */

function assemblerCode(ex, codeUtilisateur) {
  if (ex.type === "fonction") {
    return ENTETES_FONCTION + codeUtilisateur +
      "\n\n/* ===== Programme de test automatique ===== */\n" + ex.harnais;
  }
  return codeUtilisateur;
}

function testsDe(ex) {
  if (ex.type === "fonction") {
    return [{ stdin: "", attendu: ex.attendu }];
  }
  return ex.tests;
}

async function testerExercice(ex, origine) {
  const code = editeur.getValue();
  sauverBrouillon(ex.id);

  const zone = document.getElementById("zone-resultats");
  const btn = document.getElementById("btn-tester");

  if (ex.type === "fonction" && /\bmain\s*\(/.test(code)) {
    zone.innerHTML = '<div class="bandeau-erreur">⚠️ Ton code contient un main : pour cet exercice, ' +
      "écris uniquement la fonction demandée — le testeur fournit son propre main.</div>";
    assurerVisible(zone);
    return;
  }

  btn.disabled = true;
  zone.innerHTML = '<div class="attente"><div class="roue"></div>Compilation et exécution sur gcc (service en ligne)…</div>';
  assurerVisible(zone);

  const codeComplet = assemblerCode(ex, code);
  const tests = testsDe(ex);
  const resultats = [];
  let erreurCompil = null;
  let erreurReseau = null;

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    const res = await EXECUTEUR.executer(codeComplet, t.stdin, ex.fichiers);
    if (!res.ok) {
      if (res.etape === "compilation") erreurCompil = res.message;
      else erreurReseau = res.message;
      break;
    }
    resultats.push({
      test: t,
      obtenu: res.stdout,
      stderr: res.stderr,
      codeRetour: res.codeRetour,
      tue: res.tue,
      reussi: normaliserSortie(res.stdout) === normaliserSortie(t.attendu) && !res.tue
    });
    zone.innerHTML = '<div class="attente"><div class="roue"></div>Test ' + (i + 1) + "/" + tests.length + " exécuté…</div>";
    if (i < tests.length - 1) await pause(350);
  }

  btn.disabled = false;

  if (erreurReseau) {
    zone.innerHTML = '<div class="bandeau-erreur">🌐 ' + echapper(erreurReseau) + "</div>";
    assurerVisible(zone);
    return;
  }

  if (erreurCompil) {
    marquerTentative(ex.id);
    zone.innerHTML = '<div class="bandeau-echec">❌ Erreur de compilation — gcc te dit :</div>' +
      '<pre class="erreur-compil">' + echapper(nettoyerErreur(erreurCompil, ex)) + "</pre>";
    assurerVisible(zone);
    return;
  }

  const toutBon = resultats.every(function (r) { return r.reussi; });
  let html = "";

  if (toutBon) {
    const deja = statutExercice(ex.id) === "reussi";
    marquerReussite(ex.id);
    html += '<div class="bandeau-succes">🎉 Tous les tests passent — exercice ' +
      (deja ? "toujours" : "") + " validé ! " + "⭐".repeat(ex.difficulte) + "</div>";
  } else {
    marquerTentative(ex.id);
    const nbOk = resultats.filter(function (r) { return r.reussi; }).length;
    html += '<div class="bandeau-echec">❌ ' + nbOk + "/" + tests.length +
      " test(s) réussi(s). Compare les sorties ci-dessous :</div>";
  }

  resultats.forEach(function (r, i) {
    html += '<div class="test-resultat ' + (r.reussi ? "ok" : "ko") + '">' +
      '<div class="titre-test">' + (r.reussi ? "✅" : "❌") + " Test " + (i + 1) + "</div>" +
      '<div class="io">';
    if (r.test.stdin) {
      html += "<div><label>Entrée fournie</label><pre>" + echapper(r.test.stdin) + "</pre></div>";
    }
    html += "<div><label>Sortie attendue</label><pre>" + echapper(normaliserSortie(r.test.attendu)) + "</pre></div>";
    if (!r.reussi) {
      let obtenu = normaliserSortie(r.obtenu);
      if (obtenu === "") obtenu = "(aucune sortie)";
      if (r.tue) obtenu += "\n[programme interrompu : temps dépassé — boucle infinie ?]";
      else if (r.codeRetour !== 0 && r.codeRetour !== null) obtenu += "\n[le programme s'est terminé avec le code " + r.codeRetour + "]";
      html += '<div><label>Sortie de ton programme</label><pre class="diff-ko">' + echapper(obtenu.slice(0, 2000)) + "</pre></div>";
      if (r.stderr) {
        html += "<div><label>Messages d'erreur (stderr)</label><pre class=\"diff-ko\">" + echapper(r.stderr.slice(0, 1000)) + "</pre></div>";
      }
    }
    html += "</div></div>";
  });

  zone.innerHTML = html;
  assurerVisible(zone);

  if (toutBon) {
    /* un seul bouton "suivant" : celui de la navigation, mis en évidence */
    const btnSuiv = document.getElementById("btn-suiv");
    if (btnSuiv) btnSuiv.classList.add("btn-vert");
    majProgressionGlobale();
  }
}

/* Les numéros de ligne de gcc incluent les en-têtes ajoutés pour les
   exercices "fonction" : on précise ce décalage à l'étudiant. */
function nettoyerErreur(message, ex) {
  let m = String(message).slice(0, 4000);
  if (ex.type === "fonction") {
    const decalage = ENTETES_FONCTION.split("\n").length - 1;
    m = "(Note : " + decalage + " lignes d'en-têtes sont ajoutées avant ton code — " +
      "soustrais " + decalage + " aux numéros de ligne.)\n\n" + m;
  }
  return m;
}

function marquerReussite(exId) {
  const entree = progression.exercices[exId] || {};
  entree.statut = "reussi";
  entree.code = editeur ? editeur.getValue() : entree.code;
  progression.exercices[exId] = entree;
  sauverProgression();
}

function marquerTentative(exId) {
  const entree = progression.exercices[exId] || {};
  if (entree.statut !== "reussi") entree.statut = "tente";
  progression.exercices[exId] = entree;
  sauverProgression();
}

/* ---------------- Moteur de quiz ---------------- */

function demarrerQuiz(ch) {
  const actif = document.querySelector('.onglet[data-onglet="quiz"]');
  if (actif) {
    document.querySelectorAll(".onglet").forEach(function (b) { b.classList.remove("actif"); });
    actif.classList.add("actif");
  }
  quiz = {
    contexteId: ch.id,
    titre: ch.titre,
    questions: melanger(ch.questions),
    index: 0,
    score: 0,
    retour: function () { afficherChapitre(ch.id, "fiche"); },
    recommencer: function () { afficherChapitre(ch.id, "quiz"); }
  };
  afficherQuestion();
}

function demarrerExamen() {
  const toutes = [];
  CHAPITRES.forEach(function (ch) {
    ch.questions.forEach(function (q) {
      const copie = Object.assign({}, q);
      copie.origine = ch.numero + " · " + ch.titre;
      toutes.push(copie);
    });
  });
  quiz = {
    contexteId: "examen",
    titre: EXAMEN.titre,
    questions: melanger(toutes).slice(0, EXAMEN.nbQuestions),
    index: 0,
    score: 0,
    retour: afficherAccueil,
    recommencer: demarrerExamen
  };
  app.innerHTML = '<div class="fil-ariane"><a id="retour-accueil">← Accueil</a><span>/</span><span>Examen blanc</span></div>' +
    '<div class="titre-chapitre"><div class="icone">🎓</div><h1>' + EXAMEN.titre +
    "<small>" + EXAMEN.nbQuestions + " questions mélangées, tirées des 7 chapitres</small></h1></div>" +
    '<div id="contenu-chapitre"></div>';
  document.getElementById("retour-accueil").addEventListener("click", afficherAccueil);
  afficherQuestion();
}

const LIBELLES_TYPES = {
  qcm: { texte: "QCM", classe: "" },
  vf: { texte: "Vrai ou faux", classe: "vf" },
  sortie: { texte: "Que va afficher ce code ?", classe: "sortie" },
  bug: { texte: "Chasse au bug", classe: "bug" }
};

function afficherQuestion() {
  const zone = document.getElementById("contenu-chapitre") || app;
  const q = quiz.questions[quiz.index];
  const total = quiz.questions.length;
  const type = LIBELLES_TYPES[q.type] || LIBELLES_TYPES.qcm;

  let html = '<div class="quiz-entete">' +
    '<span class="quiz-avancement">Question ' + (quiz.index + 1) + " / " + total + "</span>" +
    '<div class="barre"><div class="barre-remplie" style="width:' + Math.round((quiz.index / total) * 100) + '%"></div></div>' +
    '<span class="quiz-score">Score : <strong>' + quiz.score + "</strong> / " + quiz.index + "</span>" +
    "</div>";

  html += '<div class="carte-question">';
  html += '<span class="badge-type ' + type.classe + '">' + type.texte +
    (q.origine ? " · " + echapper(q.origine) : "") + "</span>";
  html += '<div class="enonce">' + echapper(q.q) + "</div>";
  if (q.code) {
    html += '<div class="bloc-code">' + colorerC(q.code) + "</div>";
  }

  if (q.type === "vf") {
    html += '<div class="choix-liste">' +
      '<button class="choix" data-vf="true"><span class="lettre">A</span> Vrai</button>' +
      '<button class="choix" data-vf="false"><span class="lettre">B</span> Faux</button>' +
      "</div>";
  } else if (q.type === "sortie") {
    html += '<div class="zone-saisie">' +
      '<input type="text" id="reponse-sortie" placeholder="Ta réponse (respecte majuscules et espaces)…" autocomplete="off" spellcheck="false">' +
      '<button class="btn btn-principal" id="btn-valider">Valider</button>' +
      "</div>";
  } else {
    /* qcm ou bug : on mélange l'ordre des choix */
    const ordre = melanger(q.choix.map(function (_, i) { return i; }));
    html += '<div class="choix-liste">';
    ordre.forEach(function (indexChoix, position) {
      html += '<button class="choix" data-index="' + indexChoix + '">' +
        '<span class="lettre">' + "ABCD"[position] + "</span><span>" +
        echapper(q.choix[indexChoix]) + "</span></button>";
    });
    html += "</div>";
  }

  html += '<div id="zone-feedback"></div>';
  html += "</div>";
  zone.innerHTML = html;

  if (q.type === "vf") {
    zone.querySelectorAll(".choix").forEach(function (btn) {
      btn.addEventListener("click", function () {
        repondreVF(btn, q, zone);
      });
    });
  } else if (q.type === "sortie") {
    const champ = document.getElementById("reponse-sortie");
    champ.focus();
    document.getElementById("btn-valider").addEventListener("click", function () {
      repondreSortie(champ, q, zone);
    });
    champ.addEventListener("keydown", function (e) {
      if (e.key === "Enter") repondreSortie(champ, q, zone);
    });
  } else {
    zone.querySelectorAll(".choix").forEach(function (btn) {
      btn.addEventListener("click", function () {
        repondreQCM(btn, q, zone);
      });
    });
  }
  window.scrollTo(0, 0);
}

function repondreQCM(btn, q, zone) {
  const choisi = parseInt(btn.dataset.index, 10);
  const correct = choisi === q.bonne;
  zone.querySelectorAll(".choix").forEach(function (b) {
    b.disabled = true;
    const idx = parseInt(b.dataset.index, 10);
    if (idx === q.bonne) b.classList.add("correct");
    else if (b === btn) b.classList.add("incorrect");
  });
  conclureQuestion(correct, q, zone);
}

function repondreVF(btn, q, zone) {
  const choisi = btn.dataset.vf === "true";
  const correct = choisi === q.bonne;
  zone.querySelectorAll(".choix").forEach(function (b) {
    b.disabled = true;
    const val = b.dataset.vf === "true";
    if (val === q.bonne) b.classList.add("correct");
    else if (b === btn) b.classList.add("incorrect");
  });
  conclureQuestion(correct, q, zone);
}

function repondreSortie(champ, q, zone) {
  if (champ.disabled) return;
  const saisie = normaliser(champ.value);
  if (saisie === "") { champ.focus(); return; }
  const correct = q.reponses.some(function (r) { return normaliser(r) === saisie; });
  champ.disabled = true;
  champ.classList.add(correct ? "correct" : "incorrect");
  const btnValider = document.getElementById("btn-valider");
  if (btnValider) btnValider.disabled = true;
  conclureQuestion(correct, q, zone, true);
}

function conclureQuestion(correct, q, zone, montrerReponse) {
  if (correct) quiz.score++;

  const feedback = document.getElementById("zone-feedback");
  let texte = '<div class="explication ' + (correct ? "ok" : "ko") + '">' +
    '<span class="verdict">' + (correct ? "✅ Bonne réponse !" : "❌ Mauvaise réponse") + "</span>";
  if (montrerReponse && !correct) {
    texte += "<p><strong>Réponse attendue :</strong> <code>" + echapper(q.affichage) + "</code></p>";
  }
  texte += "<p>" + echapper(q.explication) + "</p></div>";

  const dernier = quiz.index === quiz.questions.length - 1;
  texte += '<div class="quiz-actions"><button class="btn btn-principal" id="btn-suivant">' +
    (dernier ? "Voir mon résultat 🏁" : "Question suivante →") + "</button></div>";

  feedback.innerHTML = texte;
  const btnSuivant = document.getElementById("btn-suivant");
  btnSuivant.focus();
  btnSuivant.addEventListener("click", function () {
    quiz.index++;
    if (quiz.index < quiz.questions.length) {
      afficherQuestion();
    } else {
      afficherResultat();
    }
  });
}

/* ---------------- Écran de résultat du quiz ---------------- */

function afficherResultat() {
  const zone = document.getElementById("contenu-chapitre") || app;
  const total = quiz.questions.length;
  const pct = pourcentage(quiz.score, total);

  const ancien = progression.scores[quiz.contexteId];
  let record = false;
  if (!ancien || pct > pourcentage(ancien.meilleur, ancien.total)) {
    progression.scores[quiz.contexteId] = { meilleur: quiz.score, total: total };
    record = !!ancien;
    sauverProgression();
    majProgressionGlobale();
  }

  let emoji, message;
  if (pct === 100) { emoji = "🏆"; message = "Parfait ! Chapitre maîtrisé."; }
  else if (pct >= 80) { emoji = "🎉"; message = "Excellent ! Encore un petit effort pour le sans-faute."; }
  else if (pct >= 60) { emoji = "👍"; message = "Bien ! Relis la fiche et retente ta chance."; }
  else if (pct >= 40) { emoji = "📖"; message = "Les bases sont là. Un tour par la fiche de révision s'impose."; }
  else { emoji = "💪"; message = "Courage ! Commence par relire la fiche, puis réessaie."; }

  const couleur = pct >= 60 ? "var(--vert)" : (pct >= 40 ? "var(--jaune)" : "var(--rouge)");

  zone.innerHTML = '<div class="ecran-fin">' +
    '<div class="emoji">' + emoji + "</div>" +
    "<h2>" + echapper(quiz.titre) + " — terminé !</h2>" +
    '<div class="jauge-score" style="background: conic-gradient(' + couleur + " " + pct + '%, var(--panneau-2) 0)">' +
    '<div class="interieur">' + pct + "&nbsp;%</div></div>" +
    '<p class="detail">' + quiz.score + " bonne" + (quiz.score > 1 ? "s" : "") + " réponse" + (quiz.score > 1 ? "s" : "") +
    " sur " + total + " · " + message + "</p>" +
    (record ? '<p class="record">⭐ Nouveau record personnel !</p>' : "") +
    '<div class="actions">' +
    '<button class="btn" id="btn-retour">← Retour</button>' +
    '<button class="btn btn-principal" id="btn-rejouer">↺ Recommencer</button>' +
    "</div></div>";

  document.getElementById("btn-retour").addEventListener("click", quiz.retour);
  document.getElementById("btn-rejouer").addEventListener("click", quiz.recommencer);
  window.scrollTo(0, 0);
}

/* ---------------- Initialisation ---------------- */

document.getElementById("lien-accueil").addEventListener("click", function (e) {
  e.preventDefault();
  afficherAccueil();
});

document.getElementById("btn-reset").addEventListener("click", function () {
  if (confirm("Réinitialiser toute la progression (scores, exercices, brouillons de code) ?")) {
    progression = { scores: {}, exercices: {} };
    sauverProgression();
    majProgressionGlobale();
    afficherAccueil();
  }
});

majProgressionGlobale();
afficherAccueil();
if (typeof COMPTE !== "undefined") COMPTE.init();
