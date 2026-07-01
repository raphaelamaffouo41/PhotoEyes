# Conception — Module d'Authentification

> Plateforme de gestion des réservations de photographes (principe d'opacité).
> Sources analysées : `Document/CDC_Plateforme_Photographes_v2.docx` (CDC v3),
> `PhotoEyes/maquetteUI/maquette_plateforme_photographes.html`, backend Spring Boot `PhotoEyes/sa-backend`.

---

## 0. Expliqué très simplement (pour tout le monde)

> Cette section raconte tout le document avec des images de la vie de tous les jours.
> Si tu ne lis que ça, tu auras déjà compris l'essentiel.

### L'histoire : un grand magasin de photos avec un gardien

Imagine un **grand magasin** où on réserve des photographes. À l'entrée, il y a un **gardien**.
Le gardien, c'est le programme qui vérifie **qui tu es** avant de te laisser entrer.

Il y a **4 sortes de gens** :

- 🚶 **Le visiteur** : il passe devant la vitrine et regarde. Il n'entre pas, il n'a pas de carte de membre.
- 🙋 **Le client** : il veut réserver un photographe. Il a une carte de membre « client ».
- 📷 **Le photographe** : il veut travailler. Il a une carte de membre « photographe ».
- 👑 **L'admin (le patron)** : c'est le chef. C'est lui qui décide tout au milieu.

**Règle très importante du magasin** : le client et le photographe **ne se parlent jamais directement**.
Ils parlent **toujours au patron**, qui fait le lien. (C'est ce que le projet appelle le « principe d'opacité ».)

### C'est quoi « se connecter » ?

- **S'inscrire** = fabriquer sa carte de membre (donner son nom, son email, un mot de passe secret).
- **Se connecter** = montrer sa carte pour entrer.
- Quand tu te connectes, le gardien te donne un **bracelet magique** (on l'appelle le **jeton / JWT**).
  Tant que tu portes le bracelet, tu peux circuler sans re-montrer ta carte à chaque porte.
- Le bracelet **s'efface tout seul après un moment** (pour la sécurité). Un **deuxième bracelet de secours**
  (le « refresh token ») permet d'en refaire un neuf sans devoir se reconnecter.

### Le rôle (ta couleur de bracelet) VS le statut (est-ce que ta carte marche)

Ce sont **deux choses différentes**, et c'est le point le plus important à comprendre :

- **Le rôle** = **la couleur de ton bracelet**. Elle dit **où tu as le droit d'aller**.
  Bracelet client → rayon « réservations ». Bracelet photographe → rayon « missions ». Bracelet patron → partout.
- **Le statut** = **est-ce que ta carte est valable aujourd'hui**.
  Un photographe a bien le bracelet « photographe »… mais tant que **le patron n'a pas vérifié son dossier**,
  sa carte affiche « en attente » et il **ne peut pas encore travailler**.

> Résumé : le rôle dit *quelle porte*, le statut dit *si la porte est ouverte pour toi maintenant*.

### Pourquoi on ne choisit pas d'être patron soi-même

Quand tu fabriques ta carte, tu **ne peux pas écrire « patron » dessus**. Sinon n'importe qui deviendrait chef !
- Le client et le photographe **choisissent leur porte d'inscription** (client OU photographe).
- Le bracelet « patron » est **donné à la main**, jamais choisi tout seul.

### Les deux gardiens (le vrai et le faux)

- Le **vrai gardien** est **derrière** (le serveur / backend). C'est lui qui décide pour de vrai. On ne peut pas le tromper.
- Devant (le site / frontend), il y a juste un **panneau** qui cache les portes interdites pour que ce soit joli et pratique.
  Mais ce panneau **ne protège rien** : c'est toujours le vrai gardien derrière qui vérifie.

### Le gardien qui compte les erreurs

Si quelqu'un essaie plein de mots de passe pour voler une carte, le gardien **compte**.
Après **5 essais ratés**, il ferme la porte **15 minutes** et demande un petit test « je ne suis pas un robot » (**CAPTCHA**).

### Et le mot de passe secret ?

On ne garde **jamais** le mot de passe écrit en clair. On le transforme en **charabia impossible à relire** (**BCrypt**),
comme un cadenas dont on a jeté la clé. On peut vérifier qu'il est bon, mais on ne peut pas le relire.

### Ce qu'il faut réparer dans le programme actuel

Aujourd'hui, dans le code déjà écrit :
1. La carte de membre **n'a pas de couleur de bracelet** (pas de rôle) → à ajouter.
2. Le mot de passe est **écrit en clair** (dangereux) → à cacher avec BCrypt.
3. La porte « se connecter » **tourne en rond toute seule** (un bug qui s'appelle lui-même à l'infini) → à corriger.
4. Il **n'y a pas encore de bracelet** (pas de jeton JWT fabriqué) → à ajouter.

> La suite du document (sections 1 à 6) redit tout ça, mais avec les **mots techniques** et les **détails** pour construire.

---

## 1. Analyse (maquette + CDC)

### Acteurs (4)

| Rôle | Authentifié ? | Origine du compte |
|---|---|---|
| **VISITEUR** | Non | Aucun compte |
| **CLIENT** | Oui | Auto-inscription (formulaire ou Google) |
| **PHOTOGRAPHE** | Oui | Auto-inscription **+ validation admin** |
| **ADMIN** | Oui | Créé/seedé (jamais d'auto-inscription) |

### Exigences d'authentification (CDC §5.1 + footer maquette login)

- JWT **avec expiration + refresh token** ; **OAuth2 Google** (clients).
- Mots de passe **BCrypt**, min 8 caractères, 1 majuscule, 1 chiffre.
- **RBAC** : chaque rôle n'accède qu'à ses ressources ; messagerie cloisonnée
  (client ↔ admin, photographe ↔ admin).
- **Brute-force** : blocage temporaire après **5 tentatives**, **CAPTCHA**,
  compte bloqué **15 min**.
- Vérification **email + SMS** ; réinitialisation mot de passe par email.
- HTTPS/TLS 1.2, protection CSRF/XSS/SQLi.

**Distinction imposée par le CDC** : séparer le **rôle** (périmètre de permissions) du
**statut du compte** (cycle de vie). Un photographe a le *rôle* PHOTOGRAPHE dès l'inscription,
mais ne peut recevoir de missions qu'une fois son *statut* passé à VALIDÉ par l'admin.

---

## 2. Point clef — Gestion des rôles (RBAC)

### 2.1 Principe directeur

- **Un seul rôle par compte** (CLIENT *ou* PHOTOGRAPHE *ou* ADMIN). Pas de multi-rôles.
- **Le backend est l'unique source de vérité.** Les guards Angular ne font que du confort UX
  (masquer/rediriger) ; toute règle est re-vérifiée côté Spring Security.
- **Séparer `Role` et `AccountStatus`.** Trois gardes en cascade :

```
Requête → [1] Authentifié ? (JWT valide)
        → [2] Rôle autorisé ? (RBAC)
        → [3] Statut autorisé ? (ex: PHOTOGRAPHE doit être VALIDÉ pour /missions)
```

### 2.2 Attribution du rôle à l'inscription

- Le rôle **n'est jamais choisi librement** dans le payload (sinon auto-nomination ADMIN).
- Deux **parcours d'inscription distincts** :
  - `POST /auth/register/client` → force `role = CLIENT`
  - `POST /auth/register/photographe` → force `role = PHOTOGRAPHE`,
    statut initial `EN_ATTENTE_DE_VALIDATION`
- **ADMIN** : jamais d'endpoint public. Seedé en base (migration) ou créé par un admin existant.

> Dans la maquette, le sélecteur de rôles (`ROLES`) est un **outil de démo** pour visualiser
> les 4 espaces — ce n'est pas le mécanisme d'attribution réel.

### 2.3 Le rôle voyage dans le JWT

```
JWT claims: { sub, email, role: "PHOTOGRAPHE", status: "VALIDATED", iat, exp }
```

- Le rôle est un **claim signé** → non falsifiable côté client.
- Exposer **`GET /auth/me`** que le front appelle au démarrage, plutôt que de décoder le token
  dans le navigateur — on récupère le **statut à jour** (un photographe peut avoir été suspendu
  depuis l'émission du token).

### 2.4 Enforcement backend (Spring Security)

```java
.requestMatchers("/admin/**").hasRole("ADMIN")
.requestMatchers("/photographe/**").hasRole("PHOTOGRAPHE")
.requestMatchers("/client/**").hasRole("CLIENT")
.requestMatchers("/auth/**", "/public/**").permitAll()
```

- Filtre JWT qui peuple le `SecurityContext` avec `ROLE_<X>`.
- `@PreAuthorize("@statusGuard.isValidated(authentication)")` pour le gating de statut.

### 2.5 Enforcement frontend (Angular) — UX uniquement

- `authGuard` (connecté ?), `roleGuard(data.roles)` (rôle autorisé ?),
  `guestGuard` (déjà connecté → hors de /login).
- `jwtInterceptor` (injecte le Bearer) + `errorInterceptor`
  (401 → refresh ou logout, 403 → page « accès refusé »).

### 2.6 Matrice d'accès (extrait, à compléter par module)

| Zone | VISITEUR | CLIENT | PHOTOGRAPHE | ADMIN |
|---|:--:|:--:|:--:|:--:|
| Consultation profils publics | ✅ | ✅ | ✅ | ✅ |
| Réserver / mes réservations | ❌ | ✅ | ❌ | ❌ |
| Missions / disponibilités | ❌ | ❌ | ✅ *(si VALIDÉ)* | ❌ |
| Validation dossiers / matching / litiges | ❌ | ❌ | ❌ | ✅ |
| Messagerie | ❌ | ↔ admin | ↔ admin | ↔ tous |

---

## 3. Modélisation des données (backend)

### 3.1 Enums

```
Role            = { CLIENT, PHOTOGRAPHE, ADMIN }
AuthProvider    = { LOCAL, GOOGLE }
AccountStatus   = { PENDING_EMAIL, ACTIVE,                    // client
                    PENDING_VALIDATION, VALIDATED, REJECTED,  // photographe
                    SUSPENDED, DISABLED }                     // transverse
```

### 3.2 Entité `User` (enrichie)

Champs à ajouter à l'entité existante (`nom, prenom, email, numeroTelephone, motDePasse`) :

| Champ | Rôle |
|---|---|
| `role : Role` | **RBAC** — manquant aujourd'hui |
| `status : AccountStatus` | Gating cycle de vie |
| `provider : AuthProvider` | LOCAL vs GOOGLE |
| `emailVerified / phoneVerified : boolean` | Vérif email + SMS |
| `failedLoginAttempts : int` / `lockedUntil : Instant` | Anti brute-force (5 essais / 15 min) |
| `createdAt / updatedAt` | Audit |

### 3.3 Entités support (module Auth)

- `RefreshToken` (id, user, tokenHash, expiresAt, revoked)
- `VerificationToken` (email — usage unique, TTL)
- `OtpCode` (SMS — code, expiresAt, attempts)
- `PasswordResetToken` (usage unique, TTL court)

### 3.4 Cycle de vie des statuts

```
CLIENT :      PENDING_EMAIL --(email vérifié)--> ACTIVE --(admin)--> SUSPENDED/DISABLED
PHOTOGRAPHE : PENDING_VALIDATION --(dossier soumis + admin OK)--> VALIDATED
                     │                              └--(refus, max 3)--> REJECTED/DISABLED
                     └--(admin)--> SUSPENDED
ADMIN :       ACTIVE (seedé)
```

---

## 4. Architecture cible du module Auth (frontend Angular 17)

```
authentification/
├── pages/
│   ├── login/            ← existe
│   ├── register/         ← existe (à scinder client / photographe)
│   ├── forgot-password/
│   ├── reset-password/
│   ├── verify-email/
│   └── verify-otp/
├── services/
│   ├── auth.service.ts   ← login, register, logout, me
│   └── token.service.ts  ← stockage + refresh du JWT
├── guards/
│   ├── auth.guard.ts · role.guard.ts · guest.guard.ts
├── interceptors/
│   ├── jwt.interceptor.ts · error.interceptor.ts
├── models/
│   ├── role.enum.ts · account-status.enum.ts
│   ├── user.model.ts · auth-request.model.ts · auth-response.model.ts
├── store/
│   └── auth.state.ts     ← état courant via signals (currentUser, role, isAuthenticated)
└── auth.routes.ts        ← routes lazy + data:{roles}
```

---

## 5. Écarts du backend actuel à corriger (bloquants)

1. **`User` n'a ni `role` ni `status`** → RBAC impossible en l'état.
2. **Mot de passe comparé en clair** (`UserServiceImpl.login` : `equals`) → passer à **BCrypt**.
3. **Bug de récursion infinie** : `Usercontroller.loginDtoRespons()` s'appelle lui-même
   au lieu d'appeler `userService`.
4. **Pas de génération de JWT / refresh token** ni de `SecurityFilterChain`.
5. `RegisterDtoRespons` ne renvoie ni rôle ni token.

---

## 6. Plan de mise en œuvre (incrémental)

| Étape | Contenu | Couche |
|---|---|---|
| **E1** | Enrichir `User` (role, status, sécurité) + enums + migration | Back |
| **E2** | Spring Security + BCrypt + génération JWT/refresh + `/auth/login` corrigé | Back |
| **E3** | Endpoints `register/client`, `register/photographe`, `/auth/me`, refresh | Back |
| **E4** | Vérif email + OTP SMS + reset password + anti brute-force (5/15min) | Back |
| **E5** | `token.service` + `auth.service` + interceptors + guards + store (signals) | Front |
| **E6** | Écrans : login (2 onglets), register client/photographe, verify, reset | Front |
| **E7** | OAuth2 Google (clients) + CAPTCHA | Full |
