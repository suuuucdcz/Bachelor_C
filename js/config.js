/* ============================================================
   Configuration Supabase (comptes + sauvegarde en ligne).
   ------------------------------------------------------------
   Tant que ces deux champs sont vides, le site fonctionne en
   mode local (progression enregistrée dans le navigateur).
   Pour activer les comptes : suis le guide README-DEPLOIEMENT.md
   puis colle ici l'URL du projet et la clé "anon public"
   (Supabase → Settings → API).
   La clé anon est PUBLIQUE par conception : la sécurité des
   données est assurée par les règles RLS côté Supabase.
   ============================================================ */

const CONFIG_SUPABASE = {
  url: "https://hsqhclbptgovpzwlflue.supabase.co",
  cleAnon: "sb_publishable_o7DZVo6DF6gjZAcPGWaRVA_-IwWjFZB"
};
