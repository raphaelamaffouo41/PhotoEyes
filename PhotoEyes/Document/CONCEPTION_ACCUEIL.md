# Conception — Page d'Accueil (Espace Visiteur)

> Plateforme de gestion des réservations de photographes (principe d'opacité).
> Sources analysées : `Document/CDC_Plateforme_Photographes_v2.docx` (CDC v3, §2.1 Espace Visiteur),
> `PhotoEyes/maquetteUI/maquette_plateforme_photographes.html` (écran `ScreenRecherche`).
> Cible : Angular 17+ (composants standalone). Voir aussi `CONCEPTION_AUTH.md` pour le module d'authentification.

---

## 1. Périmètre de la page d'accueil (visiteur, non connecté)

D'après la maquette (`ScreenRecherche`) et le CDC §2.1, l'accueil se compose de **3 blocs empilés** :

```
┌─────────────────────────────────────────────────────────┐
│  HERO (bandeau bleu dégradé)                             │
│  • badge « Photographes vérifiés · Cameroun »           │
│  • titre + sous-titre                                    │
│  • barre de recherche : [spécialité] [ville] [Rechercher]│
├─────────────────────────────────────────────────────────┤
│  BARRE DE FILTRES                                        │
│  Filtres: [Toutes villes][Spécialité][Prix][Note 4+]    │
│                              « N photographes vérifiés » │
├─────────────────────────────────────────────────────────┤
│  GRILLE DE CARTES (auto-fill, responsive)               │
│  ┌───────┐ ┌───────┐ ┌───────┐                          │
│  │ photo │ │ photo │ │ photo │                          │
│  │ nom ✓ │ │ nom ✓ │ │ nom ✓ │  ★note · ville · spéc.  │
│  │ prix →│ │ prix →│ │ prix →│  « à partir de X FCFA »  │
│  └───────┘ └───────┘ └───────┘                          │
└─────────────────────────────────────────────────────────┘
```

**Règles métier importantes :**
- Aucune coordonnée du photographe visible (principe d'opacité).
- Clic sur une carte → **profil public** (lecture seule).
- Bouton **« Réserver »** (sur le profil) → **redirige vers login/register** → pont avec le module Auth (guard).

---

## 2. Découpage en composants (standalone Angular 17)

| Composant | Type | Rôle |
|---|---|---|
| `HomeComponent` | page (conteneur) | Orchestration : appelle le service, tient l'état recherche/filtres |
| `HeroSearchComponent` | présentation | Bandeau + barre de recherche (émet un `SearchCriteria`) |
| `FilterBarComponent` | présentation | Filtres ville/spécialité/prix/note + compteur (émet des filtres) |
| `PhotographerGridComponent` | présentation | Reçoit la liste, affiche la grille / états vides / chargement |
| `PhotographerCardComponent` | présentation | Une carte (photo, nom, badge ✓, note, ville, prix, « Voir ») |

> Pattern : `HomeComponent` = **smart** (données/état), les autres = **dumb** (`@Input`/`@Output`, `OnPush`).

---

## 3. Structure de dossiers cible

```
src/app/
├── core/                          # singletons transverses (à créer)
│   └── models/
│       └── page.model.ts          # Page<T> (pagination générique)
├── shared/                        # « Module Shared » du CDC (réutilisable)
│   └── ui/
│       ├── rating-stars/          # ★ note
│       ├── verified-badge/        # bouclier « vérifié »
│       └── currency.pipe.ts       # format FCFA (fcfa() de la maquette)
├── accueil/
│   ├── pages/
│   │   └── home/                  # home.component.ts/html/scss
│   ├── components/
│   │   ├── hero-search/
│   │   ├── filter-bar/
│   │   ├── photographer-grid/
│   │   └── photographer-card/
│   ├── models/
│   │   ├── photographer.model.ts       # carte publique (sans coordonnées)
│   │   └── search-criteria.model.ts    # ville, spécialité, prix, note, tri, page
│   ├── services/
│   │   └── photographer.service.ts     # GET liste publique + filtres
│   └── accueil.routes.ts               # route lazy '' → HomeComponent
└── styles/
    └── _tokens.scss               # charte (couleurs/ombres) extraite de la maquette
```

---

## 4. Modèles de données

```ts
// photographer.model.ts — vue publique (opacité : AUCUN téléphone/email)
export interface PhotographerCard {
  id: number;
  nom: string;
  specialite: string;
  ville: string;
  note: number;
  nombreAvis: number;
  prixDepart: number;      // FCFA
  certifie: boolean;
  photoCouverture: string; // URL
  categories: string[];
}

// search-criteria.model.ts
export interface SearchCriteria {
  q?: string;              // « Mariage, portrait… »
  ville?: string;
  specialite?: string;
  prixMax?: number;
  noteMin?: number;        // ex. 4
  tri?: 'note' | 'prix' | 'recent';
  page?: number;
  size?: number;
}

// core/models/page.model.ts
export interface Page<T> { content: T[]; totalElements: number; page: number; size: number; }
```

---

## 5. Service + contrat backend attendu

> **Convention du projet : on travaille avec des `Promise`, pas des `Observable`.**
> `HttpClient` renvoie un `Observable` → on le convertit avec `firstValueFrom()` (rxjs) et on
> le consomme en `async/await`. Les services exposent donc des méthodes `async` renvoyant `Promise<T>`.

```ts
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhotographerService {
  private http = inject(HttpClient);
  private baseUrl = '/api/public/photographes';   // route PUBLIQUE (permitAll)

  async search(criteria: SearchCriteria): Promise<Page<PhotographerCard>> {
    return firstValueFrom(
      this.http.get<Page<PhotographerCard>>(this.baseUrl, { params: toHttpParams(criteria) })
    );
  }
}
```

Côté composant (`HomeComponent`), consommation en `async/await` :

```ts
async rechercher(criteria: SearchCriteria): Promise<void> {
  this.loading.set(true);
  try {
    const page = await this.service.search(criteria);
    this.photographes.set(page.content);
  } finally {
    this.loading.set(false);
  }
}
```

**Endpoint backend à prévoir** (côté Spring) : `GET /api/public/photographes` — accessible
**sans token** (matcher `permitAll`), ne renvoyant que les photographes **VALIDATED** et
**jamais** de coordonnées (principe d'opacité).

---

## 6. Charte graphique (à extraire de la maquette → `_tokens.scss`)

```scss
$blue:#2563EB; $blue-700:#1D4ED8; $ink:#1E293B; $ink3:#94A3B8;
$bg:#F8FAFC; $surface:#FFFFFF; $line:#E2E8F0; $ok:#16A34A;
$shadow:0 12px 32px rgba(15,23,42,.12); $radius:18px;
// Fonts: corps = Inter ; titres = Outfit
```

---

## 7. Routing & intégration

- `accueil.routes.ts` : `{ path: '', loadComponent: () => HomeComponent }`
- Dans `app.routes.ts` : la racine `''` charge l'accueil (au lieu de rediriger vers `login`),
  car le visiteur voit l'accueil **sans se connecter**.
- « Réserver » → `[routerLink]="/login"` avec `returnUrl` pour revenir après connexion
  (jonction avec le module Auth).

---

## 8. Plan d'implémentation (incrémental)

| Étape | Contenu |
|---|---|
| **A1** | Modèles (`PhotographerCard`, `SearchCriteria`, `Page<T>`) + `_tokens.scss` |
| **A2** | `PhotographerService` + données **mock** (les 6 de la maquette) pour avancer sans backend |
| **A3** | `PhotographerCardComponent` + `PhotographerGridComponent` (grille responsive + états vide/chargement) |
| **A4** | `HeroSearchComponent` + `FilterBarComponent` (émission des critères) |
| **A5** | `HomeComponent` : câblage recherche/filtres → service, `accueil.routes.ts`, branchement `app.routes.ts` |
| **A6** | Composants `shared/ui` (rating-stars, verified-badge, pipe FCFA) + responsive mobile |
| **A7** | Bascule mock → vrai endpoint `GET /api/public/photographes` |
