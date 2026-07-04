# 🚀 Mettre le site en ligne pour la classe

Deux étapes indépendantes, ~10 minutes chacune :
1. **Supabase** → les comptes et la sauvegarde de progression en ligne
2. **Vercel** → l'hébergement gratuit du site

Le site fonctionne aussi sans Supabase (progression locale au navigateur) :
tu peux donc déployer d'abord et activer les comptes après.

---

## Étape 1 — Supabase (comptes + sauvegarde)

### 1.1 Créer le projet
1. Va sur https://supabase.com → **Start your project** → crée un compte (gratuit).
2. **New project** : choisis un nom (ex : `entrainement-c`), un mot de passe
   de base de données (garde-le quelque part), une région (`West EU (Paris)`
   ou `Central EU`), plan **Free**.
3. Attends ~1 minute que le projet démarre.

### 1.2 Créer la table de progression
1. Menu de gauche → **SQL Editor** → **New query**.
2. Colle ce SQL puis clique **Run** :

```sql
create table if not exists progression (
  user_id uuid primary key references auth.users(id) on delete cascade,
  donnees jsonb not null default '{}'::jsonb,
  maj timestamptz not null default now()
);

alter table progression enable row level security;

create policy "lecture de sa propre progression"
  on progression for select
  using (auth.uid() = user_id);

create policy "creation de sa propre progression"
  on progression for insert
  with check (auth.uid() = user_id);

create policy "mise a jour de sa propre progression"
  on progression for update
  using (auth.uid() = user_id);
```

> Ces règles (RLS) garantissent que chaque étudiant ne peut lire et
> modifier QUE sa propre progression, même si la clé publique circule.

### 1.3 Simplifier l'inscription (recommandé pour une classe)
1. Menu **Authentication** → **Sign In / Up** (ou Providers) → **Email**.
2. Désactive **Confirm email** → les étudiants sont connectés dès l'inscription,
   sans devoir cliquer sur un lien reçu par mail.
   (Si tu le laisses activé, ça marche aussi : le site affiche le message adapté.)

### 1.4 Brancher le site
1. Menu **Settings** (roue dentée) → **API** (ou "API Keys").
2. Copie **Project URL** et la clé **anon public**.
3. Ouvre `js/config.js` et colle les deux valeurs :

```js
const CONFIG_SUPABASE = {
  url: "https://TON-PROJET.supabase.co",
  cleAnon: "eyJhbGciOiJI...ta-longue-cle..."
};
```

C'est tout : le bouton **👤 Se connecter** apparaît dans l'en-tête du site.

---

## Étape 2 — Vercel (hébergement gratuit)

### Option A : en ligne de commande (le plus simple ici)
1. Crée un compte sur https://vercel.com (gratuit, "Hobby").
2. Dans un terminal, dans le dossier du site :

```
npx vercel login
npx vercel --prod
```

3. Réponds aux questions (projet : `entrainement-c`, dossier : `./`,
   pas de build command — c'est un site statique).
4. Vercel affiche l'URL publique, du type
   `https://entrainement-c.vercel.app` → **c'est l'adresse à donner à la classe** 🎉

Pour mettre à jour le site plus tard : relance `npx vercel --prod`.

### Option B : Netlify Drop (zéro ligne de commande)
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier `entrainement` entier dans la page.
3. Crée un compte pour garder l'URL. Pour mettre à jour : re-glisse le dossier.

---

## À savoir

- **Clé "anon public"** : elle est faite pour être visible dans le code du
  site. Ne mets JAMAIS la clé `service_role` dans le site, par contre.
- **Mise à jour du site** : quand tu modifies un fichier JS/CSS, incrémente
  le numéro `?v=5` dans `index.html` (→ `?v=6`) pour que les navigateurs
  des étudiants rechargent la nouvelle version.
- **Compilation C** : elle passe par l'API publique Wandbox (gratuite,
  gcc 13), avec Piston en secours. Pour une classe entière qui compile
  en même temps en TP, ça peut ralentir aux heures de pointe — dans ce
  cas on pourra héberger notre propre exécuteur, dis-le-moi.
- **Limites gratuites** : Supabase Free = 500 Mo de base et 50 000
  utilisateurs actifs/mois ; Vercel Hobby = 100 Go de trafic/mois.
  Une classe entière n'en utilisera qu'une fraction minuscule.
