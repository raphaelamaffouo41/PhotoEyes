# Conception — Page de Détail (Profil public d'un photographe)

> Plateforme de gestion des réservations de photographes (principe d'opacité).
> Sources analysées : `Document/CDC_Plateforme_Photographes_v2.docx` (CDC v3, §2.1 Visiteur / §2.2 Client),
> `PhotoEyes/maquetteUI/maquette_plateforme_photographes.html` (écran `ScreenProfil`).
> Cible : Angular 17+ (composants standalone). Voir aussi `CONCEPTION_ACCUEIL.md` (listing) et `CONCEPTION_AUTH.md`.

---

## 1. Périmètre & règles

Page profil accessible au **visiteur** et au **client**. D'après le CDC : photo, nom, bio, portfolio,
tarifs, avis, badges — **aucune coordonnée** (principe d'opacité), et **« Réserver » est la seule action**
(elle transite par l'admin).

```
┌───────────────────────────────────────────────┐
│  COVER (bandeau photo + dégradé)               │
│    ┌────┐                                       │
│    │avat│  Nom  [✓ Vérifié]        [ Réserver ] │
│    └────┘  📷 spécialité · 📍 ville · ★4.9 (128)│
├───────────────────────────┬───────────────────┤
│  À PROPOS (bio + tags)     │  TARIFS (sticky)  │
│  PORTFOLIO (grille 3×2)    │   • Séance 1h      │
│  AVIS CLIENTS              │   • Demi-journée   │
│   (modérés par l'admin)    │   • Journée        │
│   ★ avatar · texte · date  │   [ Réserver ]     │
│                            │   ⚠ note opacité   │
└───────────────────────────┴───────────────────┘
   (mobile : bouton « Réserver » collé en bas)
```

---

## 2. Route (lazy)

`/photographes/:id` — chargé depuis le clic sur une carte de l'accueil.

```ts
{ path: 'photographes', loadChildren: () =>
    import('./photographes/photographes.routes').then(m => m.PHOTOGRAPHES_ROUTES) }
// photographes.routes.ts : { path: ':id', loadComponent: () => PhotographerDetailComponent }
```

---

## 3. Découpage en composants (standalone)

| Composant | Type | Rôle |
|---|---|---|
| `PhotographerDetailComponent` | page (smart) | Lit `:id`, charge le détail, gère loading/404, action Réserver |
| `ProfileHeaderComponent` | dumb | Cover + avatar + nom + badge ✓ + spécialité/ville/note + Réserver |
| `AboutCardComponent` | dumb | Bio + puces catégories |
| `PortfolioGalleryComponent` | dumb | Grille de photos (lightbox en option) |
| `PricingCardComponent` | dumb | Tarifs (sticky) + bouton Réserver + note opacité |
| `ReviewsListComponent` / `ReviewItemComponent` | dumb | Liste d'avis (avatar, ★, texte, date) |

Réutilise `shared/ui` : `rating-stars`, `verified-badge`, pipe FCFA.

---

## 4. Modèles

```ts
export interface PhotographerDetail {
  id: number;
  nom: string;
  specialite: string;
  ville: string;
  note: number;
  nombreAvis: number;
  certifie: boolean;
  photoProfil: string;
  photoCouverture: string;
  bio: string;
  categories: string[];
  portfolio: PortfolioItem[];
  tarifs: PricingItem[];
  avis: Review[];
}
export interface PortfolioItem { id: number; url: string; label?: string; }
export interface PricingItem  { libelle: string; prix: number; }        // FCFA
export interface Review { id: number; auteur: string; note: number; texte: string; date: string; }
```

---

## 5. Service (convention Promise)

> Convention projet : services en `Promise` (async/await), pas `Observable` — conversion via `firstValueFrom()`.

```ts
async getById(id: number): Promise<PhotographerDetail> {
  return firstValueFrom(
    this.http.get<PhotographerDetail>(`/api/public/photographes/${id}`)
  );
}
```

Endpoint **public** (`permitAll`), ne renvoie que les photographes **VALIDATED**, **jamais** de coordonnées.
Un id inconnu / non validé → **404** (page « profil introuvable »).

---

## 6. Structure de dossiers

```
photographes/
├── pages/detail/photographer-detail.component.{ts,html,css}
├── components/
│   ├── profile-header/
│   ├── about-card/
│   ├── portfolio-gallery/
│   ├── pricing-card/
│   └── reviews-list/ (+ review-item/)
├── models/{photographer-detail, portfolio-item, pricing-item, review}.model.ts
├── services/photographer.service.ts   (réutilise/étend celui de l'accueil : search + getById)
└── photographes.routes.ts
```

---

## 7. Bouton « Réserver » — jonction auth / opacité (point clé)

| Utilisateur | Comportement |
|---|---|
| **Visiteur** | Redirection `/auth/login?returnUrl=/photographes/:id` → puis flux réservation |
| **Client connecté** | `/reservations/nouvelle?photographe=:id` (demande envoyée **à l'admin**) |
| **Photographe / Admin** | Bouton masqué (pas concernés par la réservation) |

→ Un petit garde / `AuthState` décide de la cible. La demande **ne va jamais au photographe** (opacité).

---

## 8. États & signals

Style `HomeComponent` : `signal` pour `photographe`, `loading`, `error`. Gérer : chargement,
**404 introuvable**, erreur réseau. `PhotographerDetailComponent` reste *smart*, les enfants `OnPush`.

---

## 9. Options prévues au CDC (à cadrer)

- **Favoris** (client) : bouton cœur sur le header → `POST /api/client/favoris/:id`
  (visible seulement si client connecté).
- **Signalement** : lien « signaler ce profil » (CDC §2.2) → à prévoir plus tard.
- **Avis** : lecture seule ici (modérés par l'admin) ; le dépôt d'avis relève de l'espace client
  post-prestation.

---

## 10. Plan d'implémentation (incrémental)

| Étape | Contenu |
|---|---|
| **D1** | Modèles (`PhotographerDetail`, `PortfolioItem`, `PricingItem`, `Review`) |
| **D2** | `getById` + **mock** (dérivé des 6 photographes) + route `/photographes/:id` |
| **D3** | `ProfileHeaderComponent` (cover, avatar, badge, note) |
| **D4** | `AboutCardComponent` + `PortfolioGalleryComponent` |
| **D5** | `ReviewsListComponent` + `PricingCardComponent` (sticky) |
| **D6** | Bouton **Réserver** (redirection selon rôle) + note opacité + états 404/erreur |
| **D7** | Favoris + responsive (bouton Réserver collé en bas sur mobile) + bascule vers vrai endpoint |
