# Plan de travail — Sprint « Authentification réelle » (pour Raphaël)

> Objectif de ce document : te guider **étape par étape** pour rendre l'authentification
> vraiment fonctionnelle. Je te dis **quoi faire, où, et les pièges à éviter** — mais
> **le code, c'est toi qui l'écris**. C'est fait exprès : c'est comme ça qu'on apprend. 💪
>
> À lire avant de commencer : `CONCEPTION_AUTH.md` (le plan d'origine de l'auth).
> Date : 2026-07-16.

---

## 1. Le but du sprint (en une phrase)

> Aujourd'hui, **seul le `register` fonctionne vraiment**. Le login est un **écran vide**,
> et l'appli **ne sait jamais qui est connecté ni son rôle**.

À la fin de ce sprint, on doit pouvoir :
1. **S'inscrire** (déjà OK) ,
2. **Se connecter** avec un vrai formulaire,
3. Et surtout : **l'appli connaît le rôle réel** de la personne (CLIENT / PHOTOGRAPHE / ADMIN),
   récupéré depuis le serveur — plus de rôle « fantôme ».

Pourquoi c'est le premier sprint ? Parce que **le bouton « Réserver » de la page détail
dépend du rôle**. Sans login réel, tout le reste (réservation) reste bloqué.

---

## 2. L'état des lieux (ce que tu as déjà, ce qui manque)

| Élément | Où | État aujourd'hui |
|---|---|---|
| Formulaire d'inscription | `register.component.ts` | 🟢 fait et branché au backend |
| `AuthService.register()` | `authentification/services/auth.service.ts` | 🟢 fait |
| Formulaire de connexion | `login.component.ts` | 🔴 **vide** (juste `isOpen = true`) |
| `AuthService.login()` | `auth.service.ts` | 🔴 **n'existe pas** |
| Gardien de session (rôle) | `services/auth-state.service.ts` | 🟡 existe mais **jamais alimenté** par le vrai login |
| Login backend | `UserServiceImpl.java` → `loginDtoRespons()` | 🟡 marche mais renvoie **juste un message**, pas le rôle |
| Mots de passe | `UserServiceImpl.java` | 🔴 **stockés en clair** (gros problème de sécurité) |

---

## 3. Les étapes, dans l'ordre

> Fais-les **dans l'ordre** et **teste après chaque étape**. Ne saute pas d'étape.

### Étape 1 — Backend : sécuriser les mots de passe (BCrypt)

**Le problème :** dans `UserServiceImpl.java`, le mot de passe est enregistré **tel quel**
(`user.setMotDePasse(...)`) et comparé **tel quel** au login
(`user.getMotDePasse().equals(...)`). Si quelqu'un ouvre la base, il lit tous les mots de passe.
**Ça ne doit jamais arriver.**

**Ce que tu dois faire :**
- Ajouter la brique de sécurité Spring qui sait chiffrer un mot de passe (indice : on utilise
  un **`BCryptPasswordEncoder`**). Il faut la dépendance correspondante côté Maven (`pom.xml`)
  et déclarer l'encodeur en **bean** (le fichier `config/config.java` est l'endroit logique).
- À l'**inscription** : au lieu d'enregistrer le mot de passe brut, enregistre sa **version chiffrée**.
- À la **connexion** : ne compare **plus** avec `.equals()`. Utilise la méthode de l'encodeur
  qui **vérifie** un mot de passe en clair contre un mot de passe chiffré (indice : `matches`).

**Piège à éviter :** si tu chiffres au register mais que tu oublies de changer le login,
plus personne ne pourra se connecter. Les deux vont **ensemble**.

**Comment vérifier :** inscris un nouvel utilisateur, puis regarde la table `user` dans MySQL.
Le mot de passe doit être une **longue suite illisible** (commence souvent par `$2a$...`),
pas le mot de passe en clair.

---

### Étape 2 — Backend : le login doit renvoyer le rôle

**Le problème :** `loginDtoRespons()` renvoie seulement `{ "message": "connexion reussie" }`.
Le frontend ne peut donc pas savoir **qui** vient de se connecter.

**Ce que tu dois faire :**
- Dans la réponse de login (`LoginDtoRespons.java`), ajoute au minimum le **rôle**
  (et tant qu'à faire le **nom** et l'**email**, ça servira pour l'affichage).
- Dans `loginDtoRespons()`, remplis ces champs à partir du `user` trouvé.
- Gère proprement le **mauvais mot de passe / utilisateur introuvable** : aujourd'hui ça lève
  une `RuntimeException` (le navigateur reçoit une erreur 500 moche). L'idéal serait un vrai
  code **401** avec un message clair. (Si tu ne sais pas encore faire ça proprement, note-le
  comme « à améliorer » et garde l'exception pour l'instant — mais on devra y revenir.)

**Comment vérifier :** avec un outil comme Postman (ou le `console.log` du front), appelle
`POST /api/auth/login` et vérifie que la réponse contient bien le **rôle** de l'utilisateur.

---

### Étape 3 — Front : `AuthService.login()`

**Le problème :** `AuthService` n'a qu'une méthode `register()`. Il n'y a rien pour se connecter.

**Ce que tu dois faire :**
- Ajoute une méthode `login(data)` dans `auth.service.ts`, sur le **même modèle** que `register()`
  (même style : `firstValueFrom`, `async/await` — c'est notre convention, **pas d'Observable exposé**).
- Elle doit appeler `POST http://localhost:8080/api/auth/login` et **retourner la réponse**
  (qui contient maintenant le rôle, grâce à l'étape 2).

**Piège à éviter :** regarde bien l'URL de base déjà utilisée dans le fichier (`this.API`)
et réutilise la même logique. Ne recode pas une URL à la main autrement.

---

### Étape 4 — Front : le formulaire de connexion

**Le problème :** `login.component.ts` est **vide** (`isOpen = true` et rien d'autre).
`login.component.html` est probablement un décor sans champ relié.

**Ce que tu dois faire :**
- Transforme `login.component.ts` en **vrai composant de formulaire**, en t'inspirant **directement
  de `register.component.ts`** (c'est le même patron : `ReactiveFormsModule`, un `FormGroup`
  avec `email` et `motDePasse`, une méthode `submit()`).
- Dans `submit()` : appelle `authService.login(...)`, et en cas de succès **récupère le rôle**
  de la réponse.

**Piège à éviter :** vérifie que le nom des champs que tu envoies (`email`, `motDePasse`)
**correspond exactement** à ce que le backend attend dans `LoginDtoRequest.java`.
Une majuscule ou une faute de frappe = le mot de passe arrive vide côté serveur.

---

### Étape 5 — Front : brancher le rôle sur `AuthState`

**Le problème :** `AuthState` (le gardien de session) sait retenir un rôle, mais **personne
ne le lui donne jamais** après un vrai login.

**Ce que tu dois faire :**
- Après un login réussi (étape 4), appelle **`authState.setRole(rôle_reçu)`** avec le rôle
  renvoyé par le serveur.
- Ensuite, **redirige** la personne :
  - s'il y a un **`returnUrl`** dans l'adresse (le bouton « Réserver » en met un quand un visiteur
    est envoyé se connecter), renvoie-le **vers cette page** ;
  - sinon, renvoie-le vers l'**accueil**.

**Pourquoi c'est le point clé :** c'est **exactement** ce qui manquait pour que le bouton
« Réserver » de la page détail se comporte correctement selon la personne. Une fois cette étape
faite, un client connecté sera **reconnu comme client**.

---

## 4. La checklist finale (Definition of Done)

Le sprint est **terminé** seulement quand **tout** ceci est vrai :

- [ ] Un nouveau mot de passe est **chiffré** dans la base (vérifié dans MySQL).
- [ ] La connexion **fonctionne** avec un compte inscrit.
- [ ] Un **mauvais** mot de passe est **refusé** (message d'erreur, pas de connexion).
- [ ] Après connexion, le **rôle réel** est bien stocké dans `AuthState` (vérifiable :
      `localStorage` → clé `photoeyes.role`).
- [ ] Scénario complet : sur une **page détail**, en tant que **visiteur**, je clique « Réserver »
      → je suis envoyé au login → je me connecte → **je reviens sur la fiche** et le bouton
      me traite maintenant comme **client connecté**.
- [ ] `ng build` passe **sans erreur**, et le backend démarre sans erreur.

> Rappel de la règle du projet : **avant de dire « c'est fait », on lance l'appli**
> (`mvnw spring-boot:run` + `ng serve`) et **on vérifie vraiment** dans le navigateur.

---

## 5. Ce qui viendra APRÈS ce sprint (pour info, ne pas faire maintenant)

Pour que tu voies où on va, mais **ne t'en occupe pas tout de suite** :
1. Créer les endpoints **GET** des photographes côté backend, et **remplacer les données mock**
   du front par de vrais appels.
2. Finir la page détail (états « chargement / introuvable / erreur », carte tarifs qui « colle »).
3. Construire la **réservation** (le cœur du produit) — elle a besoin du rôle, donc de CE sprint.

Bon courage — avance étape par étape et teste au fur et à mesure. 🚀
