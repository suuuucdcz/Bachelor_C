/* ============================================================
   Comptes utilisateurs & sauvegarde en ligne (Supabase).
   ------------------------------------------------------------
   - Inactif tant que CONFIG_SUPabase n'est pas rempli : le site
     fonctionne alors en mode local (localStorage uniquement).
   - Une fois configuré : bouton "Se connecter" dans l'en-tête,
     inscription / connexion par email + mot de passe, et la
     progression est synchronisée dans la table "progression"
     (une ligne par utilisateur, protégée par RLS).
   - La fusion locale/distante et l'application de la progression
     sont déléguées à app.js (fusionnerProgressions /
     appliquerProgressionDistante), chargé après ce fichier.
   ============================================================ */

const COMPTE = (function () {
  let client = null;
  let utilisateur = null;
  let minuteriePush = null;
  let interfacePrete = false;

  function configure() {
    return typeof CONFIG_SUPABASE !== "undefined" &&
      CONFIG_SUPABASE.url && CONFIG_SUPABASE.cleAnon && window.supabase;
  }

  function connecte() {
    return utilisateur !== null;
  }

  /* ---------- Synchronisation ---------- */

  async function chargerDistant() {
    const rep = await client.from("progression")
      .select("donnees")
      .eq("user_id", utilisateur.id)
      .maybeSingle();
    if (rep.error) throw rep.error;
    return rep.data ? rep.data.donnees : null;
  }

  async function pousser(donnees) {
    if (!client || !utilisateur) return;
    const rep = await client.from("progression").upsert({
      user_id: utilisateur.id,
      donnees: donnees,
      maj: new Date().toISOString()
    });
    if (rep.error) console.warn("Sauvegarde en ligne impossible :", rep.error.message);
  }

  /* Poussée différée : appelée à chaque sauvegarde locale. */
  function programmerPush(donnees) {
    if (!connecte()) return;
    clearTimeout(minuteriePush);
    const copie = JSON.parse(JSON.stringify(donnees));
    minuteriePush = setTimeout(function () { pousser(copie); }, 2000);
  }

  async function synchroniser() {
    try {
      const distante = await chargerDistant();
      if (typeof appliquerProgressionDistante === "function") {
        appliquerProgressionDistante(distante);
      }
    } catch (e) {
      console.warn("Synchronisation impossible :", e.message);
    }
  }

  /* ---------- Interface (bouton en-tête + fenêtre de connexion) ---------- */

  /* Le libellé est dans un span masqué sur petit écran : seul le 👤 reste,
     sinon l'en-tête déborde à droite sur téléphone. */
  function majBouton() {
    const btn = document.getElementById("btn-compte");
    if (!btn) return;
    btn.textContent = "👤";
    const libelle = document.createElement("span");
    libelle.className = "compte-libelle";
    if (connecte()) {
      const nom = (utilisateur.email || "").split("@")[0];
      libelle.textContent = " " + (nom.length > 12 ? nom.slice(0, 12) + "…" : nom);
      btn.title = "Connecté : " + utilisateur.email + " — clique pour te déconnecter";
      btn.classList.add("compte-connecte");
    } else {
      libelle.textContent = " Se connecter";
      btn.title = "Créer un compte ou se connecter pour sauvegarder ta progression en ligne";
      btn.classList.remove("compte-connecte");
    }
    btn.appendChild(libelle);
  }

  function creerInterface() {
    if (interfacePrete) return;
    interfacePrete = true;

    /* bouton dans l'en-tête */
    const btn = document.createElement("button");
    btn.className = "btn btn-fantome btn-compte";
    btn.id = "btn-compte";
    document.querySelector(".entete-droite").prepend(btn);
    btn.addEventListener("click", function () {
      if (connecte()) {
        if (confirm("Se déconnecter de " + utilisateur.email + " ?\n(Ta progression reste enregistrée en ligne.)")) {
          deconnexion();
        }
      } else {
        ouvrirModal();
      }
    });

    /* fenêtre de connexion */
    const voile = document.createElement("div");
    voile.className = "voile-modal";
    voile.id = "voile-compte";
    voile.innerHTML =
      '<div class="modal-compte">' +
      '<button class="fermer-modal" id="fermer-compte" title="Fermer">✕</button>' +
      "<h2>👤 Mon compte</h2>" +
      '<p class="modal-note">Connecte-toi pour retrouver ta progression sur tous tes appareils (PC, téléphone…).</p>' +
      '<label>Email<input type="email" id="compte-email" autocomplete="email" placeholder="prenom.nom@exemple.fr"></label>' +
      '<label>Mot de passe<input type="password" id="compte-mdp" autocomplete="current-password" placeholder="6 caractères minimum"></label>' +
      '<div id="compte-message"></div>' +
      '<div class="modal-actions">' +
      '<button class="btn btn-principal" id="btn-connexion">Se connecter</button>' +
      '<button class="btn" id="btn-inscription">Créer un compte</button>' +
      "</div></div>";
    document.body.appendChild(voile);

    document.getElementById("fermer-compte").addEventListener("click", fermerModal);
    voile.addEventListener("click", function (e) { if (e.target === voile) fermerModal(); });
    document.getElementById("btn-connexion").addEventListener("click", connexion);
    document.getElementById("btn-inscription").addEventListener("click", inscription);
    document.getElementById("compte-mdp").addEventListener("keydown", function (e) {
      if (e.key === "Enter") connexion();
    });

    majBouton();
  }

  function ouvrirModal() {
    document.getElementById("voile-compte").classList.add("visible");
    message("");
    document.getElementById("compte-email").focus();
  }

  function fermerModal() {
    document.getElementById("voile-compte").classList.remove("visible");
  }

  function message(texte, type) {
    const zone = document.getElementById("compte-message");
    zone.innerHTML = texte ? '<p class="message-compte ' + (type || "erreur") + '">' + texte + "</p>" : "";
  }

  function traduireErreur(msg) {
    msg = String(msg || "");
    if (msg.includes("Invalid login credentials")) return "Email ou mot de passe incorrect.";
    if (msg.includes("already registered")) return "Un compte existe déjà avec cet email : utilise « Se connecter ».";
    if (msg.includes("at least 6 characters")) return "Le mot de passe doit faire au moins 6 caractères.";
    if (msg.includes("valid email") || msg.includes("invalid format")) return "Adresse email invalide.";
    if (msg.includes("Email not confirmed")) return "Confirme d'abord ton adresse : un email t'a été envoyé.";
    if (msg.includes("Failed to fetch")) return "Connexion au serveur impossible. Vérifie ta connexion Internet.";
    return "Erreur : " + msg;
  }

  function lireFormulaire() {
    const email = document.getElementById("compte-email").value.trim();
    const mdp = document.getElementById("compte-mdp").value;
    if (!email || !email.includes("@")) { message("Entre une adresse email valide."); return null; }
    if (mdp.length < 6) { message("Le mot de passe doit faire au moins 6 caractères."); return null; }
    return { email: email, mdp: mdp };
  }

  async function connexion() {
    const f = lireFormulaire();
    if (!f) return;
    message("Connexion en cours…", "info");
    const rep = await client.auth.signInWithPassword({ email: f.email, password: f.mdp });
    if (rep.error) { message(traduireErreur(rep.error.message)); return; }
    fermerModal();
    /* onAuthStateChange prend le relais (synchronisation + interface) */
  }

  async function inscription() {
    const f = lireFormulaire();
    if (!f) return;
    message("Création du compte…", "info");
    const rep = await client.auth.signUp({ email: f.email, password: f.mdp });
    if (rep.error) { message(traduireErreur(rep.error.message)); return; }
    if (rep.data && rep.data.session) {
      fermerModal(); /* connecté directement (confirmation email désactivée) */
    } else {
      message("Compte créé ! Un email de confirmation t'a été envoyé : clique sur le lien puis reviens te connecter.", "info");
    }
  }

  async function deconnexion() {
    clearTimeout(minuteriePush);
    await client.auth.signOut();
    utilisateur = null;
    majBouton();
  }

  /* ---------- Initialisation (appelée par app.js) ---------- */

  function init() {
    if (!configure()) return; /* mode local : rien à faire */
    client = window.supabase.createClient(CONFIG_SUPABASE.url, CONFIG_SUPABASE.cleAnon);
    creerInterface();
    client.auth.onAuthStateChange(function (evenement, session) {
      const avant = utilisateur;
      utilisateur = session ? session.user : null;
      majBouton();
      if (utilisateur && (!avant || avant.id !== utilisateur.id)) {
        synchroniser();
      }
    });
  }

  return {
    init: init,
    connecte: connecte,
    programmerPush: programmerPush
  };
})();
