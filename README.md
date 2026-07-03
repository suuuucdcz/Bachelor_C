# 🎓 Entraînement C — TBIn212

Site d'entraînement à la programmation en C, construit à partir du cours
TBIn212 (CM01 → CM07) : fiches de révision, quiz interactifs et atelier
de code avec **vraie compilation gcc en ligne**.

## ✨ Fonctionnalités

- 📖 **7 fiches de révision** : introduction au C, types, pointeurs,
  allocation dynamique, structures, chaînes de caractères, fichiers
- ✏️ **97 questions de quiz** (QCM, vrai/faux, « que va afficher ce code ? »,
  chasse au bug) avec explications détaillées
- 💻 **48 exercices de rédaction de code** classés ★ / ★★ / ★★★, avec
  éditeur intégré, compilation réelle (gcc via l'API Piston), tests
  automatiques, indices et solutions
- 🎓 **Examen blanc** : 20 questions tirées au hasard
- 📊 **Suivi de progression** (scores, étoiles, brouillons de code),
  avec comptes en ligne optionnels via Supabase
- 📱 **Adapté au téléphone** (installable sur l'écran d'accueil)

## 🚀 Utilisation

Site 100 % statique : ouvrir `index.html` dans un navigateur, ou servir
le dossier tel quel (Vercel, Netlify, GitHub Pages…).

- La **compilation** des exercices nécessite une connexion Internet
  (API publique [Piston](https://github.com/engineer-man/piston)).
- Les **comptes en ligne** s'activent en remplissant `js/config.js`
  (voir `README-DEPLOIEMENT.md` pour le guide complet Supabase + Vercel).
- Après toute modification JS/CSS, incrémenter le paramètre `?v=N`
  dans `index.html` pour rafraîchir le cache des navigateurs.

## 🗂 Structure

```
index.html            page unique (l'application gère la navigation)
css/style.css         styles (thème sombre, responsive)
js/data.js            fiches + questions de quiz (par chapitre)
js/exercices.js       les 48 exercices de code (énoncés, tests, solutions)
js/executeur.js       exécution du C à distance (Piston + secours Wandbox)
js/compte.js          comptes & synchronisation de progression (Supabase)
js/config.js          clés Supabase (vide = mode local)
js/app.js             moteur de l'application
```
