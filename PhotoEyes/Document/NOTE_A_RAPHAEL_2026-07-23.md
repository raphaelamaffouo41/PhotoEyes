# Note pour Raphaël — Point d'étape auth + réservation

Bonjour Raphaël,

J'ai relu tout ce que tu as poussé depuis le dernier retour : l'inscription/connexion,
la sécurité des mots de passe, et tes deux nouveaux chantiers **Réservation** et
**Disponibilité**. Il y a de **vraies bonnes choses** — et un point de méthode qu'on
doit corriger ensemble. Rien de méchant, comme d'habitude : je te dis ce qui va, ce qui
coince, et **par quoi commencer** — mais **le code, c'est toujours toi qui l'écris**. 🙂

> Date : 2026-07-23.

---

## 1. En une phrase

> Tu as bien musclé le backend (mots de passe hachés, login réel, réservation propre),
> **mais tu as ouvert de nouveaux chantiers avant de finir le précédent** : le front ne
> peut toujours pas afficher un seul vrai photographe, parce que les **endpoints GET
> manquent encore**. On termine la tranche en cours avant d'en ouvrir une autre.

---

## 2. Ce qui est BIEN ✅ (garde-le, bravo)

- 🔐 **Les mots de passe sont maintenant hachés** (BCrypt) à l'inscription **et** vérifiés
  au login. C'était **la dette de sécurité n°1** — réglée. C'est la meilleure nouvelle du lot.
- 🔑 **Le login est réel** : tu cherches l'utilisateur par email, tu compares le hash, tu
  renvoies un DTO propre (nom/email/rôle) sans exposer le mot de passe. Bien.
- 🖥️ **Le login front est branché sur le vrai backend** (`login.component.ts`), en
  `async/await` comme le veut notre convention (pas d'Observable), avec gestion du
  `returnUrl` et de la redirection. Propre.
- 🗓️ **La réservation est bien pensée** (`ReservationServiceImpl`) : c'est `@Transactional`,
  tu vérifies que le créneau est bien `DISPONIBLE`, que celui qui réserve est bien un
  `CLIENT`, tu crées la résa en `PENDING` et tu bascules le créneau en `RESERVE`. C'est
  exactement le bon raisonnement métier.

---

## 3. Le point de méthode le plus important 🎯

Tu as un réflexe à corriger : **tu passes au chantier suivant sans finir/brancher/nettoyer
le précédent.**

- La **réservation** est bien codée… mais elle ne sert à rien tant que le front ne peut même
  pas **afficher un photographe** venu de la base. On a construit l'étage avant l'escalier.
- Règle qu'on adopte à partir de maintenant :
  > **On termine une tranche verticale — du bouton front jusqu'à la base de données — avant
  > d'en ouvrir une autre.**

Ce n'est pas grave, c'est un réflexe qui s'apprend. Mais je veux qu'on s'y tienne.

---

## 4. À corriger, un par un

### 4.1 🚪 Les endpoints GET photographes n'existent TOUJOURS pas (priorité absolue)

- **Le problème :** ton `PhotographerController` n'a encore **qu'un `POST`**. Je te l'avais déjà
  signalé dans `RETOUR_TABLE_PHOTOGRAPHE.md` (point 3.4) — ça n'a pas été fait. Résultat : le
  front d'accueil et la page détail tournent **encore sur des données mock**.
- **À faire :**
  - un endpoint pour **lister** les photographes (`GET /photographers`),
  - un endpoint pour en récupérer **un seul par son id** (`GET /photographers/{id}`),
  - renvoyer des **DTO de réponse**, **jamais l'entité brute** (sinon tu exposes le mot de
    passe de l'utilisateur lié — ⚠️ point de sécurité).
- **Comment savoir que c'est fait :** tu démarres le back, tu tapes l'URL dans le navigateur
  (ou Postman), tu vois du JSON ; **puis** tu débranches le mock côté front et tu vois de
  **vrais** photographes s'afficher sur l'accueil. **C'est ça, « fini ».**

### 4.2 🧹 Les `System.out.println` de debug sont ENCORE là

- **Le problème :** dans `UserServiceImpl`, il reste des traces de debug
  (`"ROLE RECU = ..."`, `"ROLE USER = ..."`, `"STATUT USER = ..."`). C'est **le même reproche**
  que la dernière fois sur `PhotographerServiceImpl`.
- **À faire :** enlève-les. Si tu as besoin de tracer pendant que tu développes, utilise un
  **logger** (`org.slf4j.Logger`), pas `System.out.println`, et tu ne le commites pas.
- **Pourquoi j'insiste :** du debug oublié dans le code, c'est le premier signe d'un travail
  « pas relu avant de committer ». Prends l'habitude de **relire ton diff** avant chaque commit.

### 4.3 🚦 Toujours des `RuntimeException` → erreur 500

- **Le problème :** partout (login, réservation, création profil), quand quelque chose ne va
  pas tu lèves une `RuntimeException` → le front reçoit un **500 (« erreur serveur »)** alors
  que c'est souvent une **demande invalide** (mauvais mot de passe, créneau déjà pris…).
- **À faire :** renvoie de vrais codes HTTP : **404** quand on ne trouve pas, **400/409** quand
  la demande est invalide (ex. créneau déjà réservé). Si tu ne sais pas encore comment, note-le
  comme « à améliorer » — mais je veux que tu saches **pourquoi** c'est important : le front a
  besoin de distinguer « c'est ta faute » de « le serveur est en panne ».

### 4.4 🔒 Le login ne prouve rien (à comprendre, pas à coder tout de suite)

- **Le problème :** aujourd'hui le login renvoie juste un DTO, et le front stocke le rôle dans
  `AuthState`. Rien n'empêche quelqu'un de **se déclarer admin** côté navigateur. Et côté back,
  `Spring Security` est en `permitAll("/**")` : **tout est ouvert**.
- **À comprendre :** c'est acceptable **pour le dev**, mais ce n'est **pas** de la sécurité. La
  vraie étape d'après, ce sera un **token (JWT)** que le back délivre au login et vérifie à
  chaque appel. **Ne le fais pas maintenant** — mais mets-le sur la feuille de route.

---

## 5. Deux questions pour toi (je veux tes réponses, pas que je te les donne)

1. Dans ta réservation : **qu'est-ce qui empêche deux clients de réserver le même créneau en
   même temps ?** (indice : pense à ce qui se passe si deux requêtes arrivent en même
   temps, et à une contrainte au niveau de la base.)
2. **Comment le backend sait-il *qui* réserve ?** Aujourd'hui tu reçois un `clientId` dans la
   requête — qu'est-ce qui empêche d'envoyer l'id de quelqu'un d'autre ? (c'est le même sujet
   que le point 4.4.)

---

## 6. Par quoi commencer (dans l'ordre)

1. 🚪 **Endpoints GET** photographes (liste + par id, en DTO) **et débrancher le mock du front**.
   → tant que ce n'est pas fait, on ne passe à rien d'autre.
2. 🧹 **Nettoyer** les `System.out.println` de `UserServiceImpl`.
3. 🗣️ Vérifier qu'on a bien **`certifie` partout** (front + back), comme convenu.
4. 🚦 Commencer à remplacer les `RuntimeException` par de vrais codes HTTP (au moins sur le login).
5. ✍️ Me répondre aux **deux questions** de la section 5.

> Comme toujours : avant de dire « c'est fait », **tu démarres le back ET le front**, et tu
> vérifies dans le navigateur qu'un **vrai** photographe s'affiche. 🚀

Merci Raphaël, le fond est là — maintenant on finit ce qu'on commence. 💪
