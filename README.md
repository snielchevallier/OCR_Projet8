# Kasa — Frontend

Application web de location de logements entre particuliers. Projet 8 OpenClassrooms — parcours développeur Full Stack.

---

## Description du projet

Kasa est une plateforme de mise en relation entre propriétaires et locataires. Ce dépôt contient le **frontend** Next.js, qui communique avec une API REST distincte (backend non inclus).

**Fonctionnalités implémentées :**

- Parcours public : accueil, liste des logements, détail logement, page à propos
- Authentification par JWT (inscription, connexion, déconnexion) avec redirection post-login
- Favoris persistés en `localStorage` (côté client)
- Messagerie (interface uniquement, données mock)
- Formulaire d'ajout de logement (UI complète, soumission non connectée à l'API)
- Protection des routes privées via middleware
- SEO : métadonnées dynamiques, sitemap, robots.txt, données structurées JSON-LD

---

## Pré-requis

| Outil | Version minimale |
|-------|-----------------|
| Node.js | 20 |
| npm | 10 |

L'application nécessite également une instance du **backend Kasa** accessible via HTTP.

---

## Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-repo>
cd OCR_Projet8

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
```

Éditer `.env.local` :

```env
BACKEND_API_URL=http://localhost:3001   # URL de l'API backend
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # URL publique du site (utilisée pour le sitemap)
NODE_ENV=development
USE_MOCK_DATA=false # Utilisation des données mockées
```

---

## Lancement du projet

```bash
# Développement (hot-reload)
npm run dev

# Build de production
npm run build
npm run start

# Tests unitaires
npm test

# Tests avec rapport de couverture
npm run test:coverage
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

---

## Architecture du projet

### Structure des fichiers

```
src/
├── app/                        # Pages et layouts (Next.js App Router)
│   ├── layout.tsx              # Layout racine : providers, header, footer
│   ├── (public)/               # Routes publiques
│   │   ├── page.tsx            # Accueil
│   │   ├── about/              # À propos
│   │   ├── logements/          # Liste et détail logements
│   │   │   └── [idSlug]/       # Détail — format URL : id--slug
│   │   └── favoris/            # Page favoris (client-side)
│   ├── (auth)/                 # Routes d'authentification
│   │   ├── login/              # Connexion
│   │   └── signin/             # Inscription
│   └── (protected)/            # Routes privées (middleware requis)
│       ├── messagerie/         # Messagerie
│       └── logements/ajouter/  # Formulaire d'ajout
│
├── actions/                    # Server Actions (couche données)
│   ├── auth.ts                 # loginUser, registerUser, logoutUser
│   ├── properties.ts           # getProperties, getProperty
│   ├── favorites.ts            # getFavorites, addFavorite, removeFavorite (TODO)
│   └── uploads.ts              # uploadImage, deleteImages (TODO)
│
├── lib/                        # Utilitaires partagés
│   ├── api.ts                  # apiFetch — client HTTP centralisé
│   ├── auth.ts                 # Gestion du cookie JWT et décodage payload
│   └── image.ts                # BLUR_PLACEHOLDER — placeholder SVG base64
│
├── components/
│   ├── layout/                 # Header, Footer
│   ├── ui/                     # Composants génériques (Button, Modal, Carousel, Spinner…)
│   ├── property/               # PropertyCard, PropertyGrid, PropertyGallery, HostCard…
│   ├── forms/                  # LoginForm, SigninForm, AddPropertyForm + sections
│   ├── messaging/              # ConversationList, ChatThread, MessageBubble…
│   └── home/                   # HeroSection, HowItWorks
│
├── context/
│   ├── AuthContext.tsx          # État utilisateur connecté (user, isLoggedIn)
│   └── FavoritesContext.tsx    # IDs des favoris + persistance localStorage
│
├── types/
│   ├── property.ts             # Property, PropertyDetail
│   └── user.ts                 # User
│
└── proxy.ts                    # Middleware Next.js — protection et redirections
```

### Fonctionnement général

**Flux de données :**  
Les pages Server Components appellent directement les **Server Actions** (`src/actions/`), qui appellent `apiFetch` avec le token JWT lu depuis les cookies serveur. Aucun appel API côté client sauf pour la page favoris.

**Authentification :**  
À la connexion, le token JWT est stocké dans un cookie `httpOnly` via `setTokenCookie`. Le **middleware** (`proxy.ts`) intercepte les routes protégées et redirige vers `/login?callbackUrl=<route>` si le cookie est absent. L'état utilisateur est hydraté côté serveur dans `layout.tsx` (décodage du payload JWT) pour alimenter `AuthProvider` et éviter un flash UI.

**Favoris :**  
Gérés localement via `FavoritesContext` + `localStorage`. L'API côté serveur (favorites.ts) est préparée mais non connectée.

**Protection des routes :**

| Route | Accès |
|-------|-------|
| `/messagerie` | Connecté uniquement |
| `/logements/ajouter` | Connecté uniquement |
| `/login`, `/signin` | Non connecté uniquement (redirigent vers `/` si déjà connecté) |

### Fonctions importantes

| Fonction | Fichier | Rôle |
|----------|---------|------|
| `apiFetch<T>` | `src/lib/api.ts` | Client HTTP centralisé — injecte le JWT, normalise les erreurs en `ApiError` |
| `proxy` | `src/proxy.ts` | Middleware de routage auth — protège les routes privées et bloque les pages auth si connecté |
| `decodeTokenPayload` | `src/lib/auth.ts` | Décode le payload JWT côté serveur pour hydrater l'UI sans requête API supplémentaire |
| `loginUser` / `registerUser` | `src/actions/auth.ts` | Server Actions de formulaire — valident, posent le cookie JWT, redirigent |
| `toggle` | `src/context/FavoritesContext.tsx` | Ajoute/retire un favori en mémoire et synchronise avec `localStorage` |
| `buildThreadItems` | `src/components/messaging/ChatThread.tsx` | Insère des séparateurs de date entre les groupes de messages |

---

## Reste à faire

### Fonctionnalités non implémentées

- **Favoris côté API** — `getFavorites`, `addFavorite`, `removeFavorite` dans `src/actions/favorites.ts` sont des stubs. Il faut les connecter à l'API backend et remplacer la persistance `localStorage` par des appels serveur.

- **Upload d'images** — `uploadImage` et `deleteImages` dans `src/actions/uploads.ts` sont des stubs. Le formulaire d'ajout de logement collecte les fichiers mais ne les envoie pas.

- **Soumission du formulaire d'ajout** — `AddPropertyForm` (`src/components/forms/AddPropertyForm.tsx`) log les données en console à la place d'un appel API. À connecter à une action server `createProperty`.

- **Messagerie réelle** — Toute la UI messagerie utilise `src/components/messaging/mockData.ts`. À remplacer par de vraies conversations et messages depuis l'API.

- **Page CGU** — Le formulaire d'inscription (`SigninForm`) contient un lien vers `/cgu` qui n'existe pas encore.
