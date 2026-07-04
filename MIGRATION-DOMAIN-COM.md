# Migration chape-expert.fr → chape-expert.com

Procédure complète pour migrer le domaine sans perdre le SEO acquis.

- **Stack** : Nuxt + Netlify
- **Durée totale** : ~2h de manipulations effectives, étalées sur 2-3 semaines de surveillance
- **Coût** : ~9 €/an (Cloudflare Registrar) + ~12 €/an pour garder chape-expert.fr actif (indispensable, voir Phase 7)

---

## Pré-requis

- [ ] Accès admin au dashboard Netlify du site Chape Expert
- [ ] Accès admin à Google Search Console (property `chape-expert.fr` déjà vérifiée)
- [ ] Accès au registrar actuel de `chape-expert.fr` (juste pour vérifier que le renouvellement est actif)
- [ ] Compte Cloudflare (gratuit) pour acheter le `.com`
- [ ] Accès au repo Nuxt (push sur la branche de prod)
- [ ] Accès à Google My Business + comptes réseaux sociaux

---

## Phase 1 — Acheter `chape-expert.com`

- [ ] Aller sur [dash.cloudflare.com](https://dash.cloudflare.com) → **Domain Registration** → **Register Domains**
- [ ] Rechercher `chape-expert.com`, vérifier la disponibilité
- [ ] **Avant d'acheter, vérifier l'historique du domaine** (10 min de check) :
  - [ ] `https://web.archive.org/web/*/chape-expert.com` → existe-t-il des snapshots ? Si oui, de quel type de site ?
  - [ ] `https://ahrefs.com/site-explorer` (version free) → backlinks, traffic estimate, Domain Rating
  - [ ] `https://moz.com/domain-analysis` → Spam Score (idéal : ≤ 3/17)
  - **Si historique propre ou aucun historique** : OK pour acheter
  - **Si historique douteux** (spam, PBN abandonné, parking page) : envisager une variation (`chape-expert.com` vs `chapeexpert.com`, etc.)
- [ ] Acheter (~9 €/an, prix coûtant, aucun upsell)
- [ ] Le domaine apparaît dans Cloudflare DNS automatiquement

---

## Phase 2 — Configurer le DNS pour pointer vers Netlify

- [ ] Dans Cloudflare, sélectionner `chape-expert.com` → onglet **DNS** → **Records**
- [ ] Récupérer d'abord le hostname Netlify de ton site actuel :
  - Netlify Dashboard → site Chape Expert → **Site configuration** → **Domain management**
  - Repérer le hostname Netlify, format : `<some-name>-12345.netlify.app`
- [ ] Dans Cloudflare DNS, ajouter ces deux enregistrements :

  | Type  | Name | Content                  | Proxy status    | TTL  |
  | ----- | ---- | ------------------------ | --------------- | ---- |
  | CNAME | @    | `<ton-site>.netlify.app` | DNS only (gris) | Auto |
  | CNAME | www  | `<ton-site>.netlify.app` | DNS only (gris) | Auto |

  **Important** : le proxy doit être **DÉSACTIVÉ** (nuage gris, pas orange). Sinon double couche TLS et Netlify ne peut pas provisionner son certificat Let's Encrypt.

  Cloudflare gère le CNAME flattening sur l'apex (@), donc cette config fonctionne.

---

## Phase 3 — Ajouter `chape-expert.com` dans Netlify (sans casser le `.fr`)

- [ ] Netlify Dashboard → site Chape Expert → **Site configuration** → **Domain management**
- [ ] Cliquer **Add domain alias** → saisir `chape-expert.com`
- [ ] Confirmer
- [ ] Attendre 5-10 min : Netlify détecte le CNAME et provisionne le SSL Let's Encrypt automatiquement
- [ ] Vérifier qu'il n'y a pas d'erreur dans le panneau Domain management (un cadenas vert doit apparaître)
- [ ] Aussi ajouter l'alias `www.chape-expert.com` de la même façon
- [ ] **Test** : visiter `https://chape-expert.com` dans un navigateur. Tu dois voir **le même contenu** que `chape-expert.fr`, en HTTPS, sans erreur de certificat.

À ce stade, **les deux domaines servent le contenu identique sans aucun redirect**. C'est la phase de coexistence — tu peux tester tranquillement.

---

## Phase 4 — Modifier le code Nuxt avant le switch

### 4a. Mettre à jour la config Nuxt

- [ ] Ouvrir `nuxt.config.ts`
- [ ] Trouver / ajouter le bloc `site` :

  ```ts
  export default defineNuxtConfig({
    site: {
      url: 'https://chape-expert.com',
      name: 'Chape Expert',
    },
  })
  ```

- [ ] Si `@nuxtjs/seo` ou `@nuxtjs/sitemap` est installé, c'est suffisant — les canonicals et le sitemap se régénèrent avec le bon domaine
- [ ] Si pas installé, ajouter manuellement le canonical dans `app.vue` :

  ```vue
  <script setup>
  const route = useRoute()
  useHead({
    link: [{ rel: 'canonical', href: `https://chape-expert.com${route.path}` }],
  })
  </script>
  ```

### 4b. Chercher et remplacer les URLs hardcoded

- [ ] À la racine du repo :

  ```bash
  grep -rn "chape-expert\.fr" \
    --include="*.vue" --include="*.ts" --include="*.js" \
    --include="*.json" --include="*.md" --include="*.toml" \
    --include="*.yaml" --include="*.yml" \
    .
  ```

- [ ] Remplacer chaque occurrence par `chape-expert.com` (ou idéalement par une URL relative `/services/...`)
- [ ] Lieux typiques où ça traîne :
  - [ ] Balises `<meta property="og:url">` et `<meta property="og:image">`
  - [ ] Données structurées JSON-LD (`schema.org`)
  - [ ] Footer / mentions légales / CGV
  - [ ] Liens dans des fichiers `.md` de contenu (blog, articles)
  - [ ] Configuration emails transactionnels si applicable
  - [ ] `robots.txt` (mention `Sitemap:`)

### 4c. Ajouter les 301 dans `netlify.toml`

- [ ] Ouvrir `netlify.toml` à la racine du repo (créer si absent)
- [ ] Ajouter à la fin :

  ```toml
  [[redirects]]
  from = "https://chape-expert.fr/*"
  to = "https://chape-expert.com/:splat"
  status = 301
  force = true

  [[redirects]]
  from = "https://www.chape-expert.fr/*"
  to = "https://chape-expert.com/:splat"
  status = 301
  force = true
  ```

  Le `force = true` est crucial : sans lui, Netlify ne déclenche le redirect que si l'URL n'existe pas. Avec, le 301 prend la priorité absolue, ce qui est ce qu'on veut.

### 4d. Commit + push

- [ ] `pnpm build` en local pour vérifier que rien ne casse
- [ ] `git add netlify.toml nuxt.config.ts <fichiers modifiés>`
- [ ] `git commit -m "Migrate to chape-expert.com with 301 from .fr"`
- [ ] `git push` → Netlify auto-deploy

---

## Phase 5 — Activer `chape-expert.com` comme primary domain

- [ ] Une fois le deploy terminé, Netlify Dashboard → site → **Domain management**
- [ ] Cliquer le menu `⋯` à côté de `chape-expert.com` → **Set as primary domain**
- [ ] Confirmer
- [ ] Netlify met automatiquement `chape-expert.fr` en alias avec 301 vers `.com` (et les règles explicites du `netlify.toml` renforcent ce comportement)

### Vérifications immédiates

- [ ] Tester avec curl (depuis n'importe quel terminal) :

  ```bash
  for url in \
    "https://chape-expert.fr/" \
    "https://chape-expert.fr/services/chape-liquide" \
    "https://chape-expert.fr/contact" \
    "https://www.chape-expert.fr/" \
    "https://chape-expert.fr/sitemap.xml" ; do
      echo "=== $url ==="
      curl -sIL "$url" | grep -E "^HTTP|^location" -i
      echo
  done
  ```

  Tu dois voir partout :

  ```
  HTTP/2 301
  location: https://chape-expert.com/...
  HTTP/2 200
  ```

  **Une seule étape 301** dans la chaîne (pas 2 ou 3). Si tu vois 2+ redirects empilés (ex: `301 → 301 → 200`), il y a un problème de config à corriger.

- [ ] Vérifier que `https://chape-expert.com/sitemap.xml` retourne bien des URLs en `.com` exclusivement
- [ ] Vérifier que `https://chape-expert.com/robots.txt` pointe `Sitemap:` vers `https://chape-expert.com/sitemap.xml`

---

## Phase 6 — Google Search Console (étape critique)

C'est l'étape qui fait la différence entre 2-4 mois de transition et 6-12 mois.

- [ ] Ajouter `chape-expert.com` comme **nouvelle property** dans [Search Console](https://search.google.com/search-console)
  - Méthode recommandée : **DNS TXT record** (vérification rapide via Cloudflare)
  - Cloudflare DNS → ajouter le TXT record fourni par Google → cliquer Verify
- [ ] Sur la property **`chape-expert.fr`** → icône ⚙️ **Settings** → **Change of address**
- [ ] Cible : `chape-expert.com`
- [ ] Google fait des vérifications automatiques (que les 301 marchent, que les deux properties sont vérifiées, etc.). Si tout est OK, confirmer.
- [ ] Sur la property **`chape-expert.com`** → **Sitemaps** → soumettre `https://chape-expert.com/sitemap.xml`
- [ ] Optionnel mais utile : **URL Inspection** sur 5-10 URLs importantes (homepage, services principaux, top pages traffic) → "Request indexing" pour accélérer

### Bing aussi

- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters) → ajouter `chape-expert.com`
- [ ] Outil **Site Move** (équivalent Change of Address) → cibler le nouveau domaine
- [ ] Soumettre le nouveau sitemap

---

## Phase 7 — Update tous les éléments externes

| Élément                                 | Action                                            | Coché |
| --------------------------------------- | ------------------------------------------------- | ----- |
| Google My Business (Pro Profile)        | Modifier le site web → `https://chape-expert.com` | [ ]   |
| Pages Jaunes                            | Update site web → `.com`                          | [ ]   |
| Annuaires métier (Mappy, Yelp, Yandex…) | Update partout où tu es référencé                 | [ ]   |
| Facebook (page pro)                     | Bio + lien                                        | [ ]   |
| Instagram (compte pro)                  | Bio                                               | [ ]   |
| LinkedIn (page entreprise)              | Site web                                          | [ ]   |
| Signature email                         | `.com`                                            | [ ]   |
| Cartes de visite                        | Réimpression à la prochaine commande              | [ ]   |
| Devis / factures (template)             | `.com`                                            | [ ]   |
| Top 10 backlinks (depuis Ahrefs / GSC)  | Email aux webmasters pour update direct du lien   | [ ]   |
| Renouvellement `chape-expert.fr`        | **Auto-renew activé** chez le registrar actuel    | [ ]   |

---

## Phase 8 — Surveillance (jours J+1 à J+90)

- [ ] **Semaine 1** : check Search Console des deux properties tous les 2-3 jours
- [ ] **Semaine 2-4** : surveiller la couverture (les anciennes URLs basculent en "Page avec redirection" puis sortent de l'index ; les nouvelles apparaissent)
- [ ] **Perte temporaire de trafic** : -10 à -30 % les 2-3 premières semaines = **normal**, ne pas paniquer
- [ ] **Alerte** : si perte > 50 % ou trafic toujours en baisse à 2+ mois → problème (chaîne de redirects, blocage robots, perte de contenu lors de la migration)
- [ ] Mois 2-3 : majorité de l'index basculé vers `.com`, trafic résorbé
- [ ] Mois 6 : SEO totalement consolidé sur `.com`

---

## Choses à NE PAS faire

- **Ne PAS laisser expirer `chape-expert.fr`**. Garde-le actif au moins 2 ans, idéalement à vie (~12 €/an). Si le `.fr` expire, les 301 tombent et tu perds tout l'historique SEO d'un coup.
- **Ne PAS refondre le contenu** en même temps que la migration de domaine. Si tu veux retravailler des pages ou changer la structure URL, fais-le **avant** ou **après** (séparé d'au moins 2-3 mois). Sinon double perturbation et Google ne sait plus quoi attribuer à quoi.
- **Ne PAS désactiver / supprimer** le site Netlify pour `chape-expert.fr` même après la migration. Les 301 doivent rester actifs en permanence.
- **Ne PAS faire des 302** (redirect temporaire). Doit être **301** (permanent). Sans ça, Google ne transfère pas le link juice.
- **Ne PAS empiler les redirects** (`http://chape-expert.fr` → `https://chape-expert.fr` → `https://chape-expert.com`). Un seul saut de 301 direct vers la destination HTTPS finale.

---

## Délais réalistes à anticiper

| Délai        | Ce qui se passe                                                            |
| ------------ | -------------------------------------------------------------------------- |
| Immédiat     | 301 prend effet après deploy Netlify                                       |
| 24-72h       | Google détecte les premiers 301, met à jour son cache des top URLs         |
| 2-4 semaines | Majorité de l'index basculée vers `.com` (grâce au Change of Address)      |
| 2-3 mois     | Indexation stable, perte temporaire de trafic résorbée                     |
| 6 mois       | SEO totalement consolidé sur `.com`, on peut considérer la migration finie |
