# Rapport d'évaluation — Page d'Accueil (expliqué très simplement)

> On compare **ce qui a été codé** avec **ce qui était prévu** dans `CONCEPTION_ACCUEIL.md`.
> Tout est raconté avec des images de la vie de tous les jours. Date : 2026-07-04.

---

## 1. C'est quoi la page d'accueil ?

Imagine la **vitrine d'un magasin** de photographes.
Quand un visiteur arrive (sans être connecté), il voit :

1. Une **grande affiche** en haut avec un titre et une **barre pour chercher** (« Mariage, portrait… » + la ville).
2. Une **rangée de boutons** pour trier : ville, spécialité, prix, note.
3. Des **petites fiches** (des cartes) : une par photographe, avec sa photo, son nom, sa ville, son prix.

C'est tout. La page d'accueil, c'est **juste la vitrine**. On regarde, on ne réserve pas encore.

---

## 2. La note globale (en une phrase)

> **Le décor est bien posé, mais le magasin ne marche pas encore.**

Les meubles sont au bon endroit (belle structure), mais :
- la **porte d'entrée est fermée** (on ne peut pas arriver sur la page),
- les **boutons ne font rien** (chercher / trier ne marchent pas),
- plusieurs **tiroirs sont vides** (des fichiers créés mais sans rien dedans),
- les fiches montrent **toujours le même faux photographe** (« julio » répété).

Note d'avancement : **à peu près 3 sur 10**. La base est saine, mais il reste le plus gros à brancher.

---

## 3. Ce qui est BIEN ✅ (on garde)

- 🗂️ **Les dossiers sont bien rangés**, exactement comme le plan le demandait (chaque chose à sa place).
- 🧱 **Le travail est découpé en petits morceaux** (une affiche, une barre de filtres, une grille, une carte).
  C'est la bonne façon de faire : chaque morceau a un seul job.
- 👀 **Ça ressemble à la maquette** : les bons textes sont là (« Trouvez le photographe parfait… »).
- 🔒 **Pas de numéro de téléphone ni d'email** du photographe affiché → la règle « on ne se parle pas
  directement » est respectée.

---

## 4. Ce qui NE VA PAS ❌ (à réparer), expliqué un par un

### 4.1 🚪 La porte est fermée : on ne peut pas voir la page
Pour qu'un site sache « quand je tape cette adresse, montre cette page », il faut une **liste d'adresses**
(on appelle ça les *routes*). Ici, cette liste pour l'accueil **est vide**, et l'adresse principale du site
renvoie encore vers la page **« connexion »**.
👉 Résultat : **personne ne peut atterrir sur la page d'accueil.** C'est le problème n°1.

### 4.2 🗄️ Des tiroirs vides (fichiers créés mais rien dedans)
Plusieurs fichiers ont été créés mais sont **complètement vides** :
- la fiche qui décrit « à quoi ressemble une liste de résultats » → vide ;
- la fiche « ce que le visiteur a cherché » (ville, prix, note…) → vide ;
- la liste d'adresses de l'accueil → vide ;
- l'outil pour écrire joliment les prix en FCFA → vide ;
- la feuille de décoration (les couleurs/styles) de la page → vide.
👉 Ce sont des boîtes étiquetées mais **sans contenu**.

### 4.3 🤖 Les faux photographes sont écrits « en dur »
La liste des photographes est **tapée à la main directement dans la page**, avec le même nom « julio »
répété 5 fois. Normalement, il faut un **petit livreur** (on appelle ça un *service*) dont le seul travail
est **d'aller chercher la liste** (aujourd'hui une fausse liste, demain la vraie du serveur).
👉 Ici, **il n'y a pas de livreur du tout**, et les fausses données sont mélangées à la page.
Du coup, quand on branchera le vrai serveur, il faudra tout re-toucher.

### 4.4 🧹 Un vieux meuble inutile traîne
Il y a un fichier `accueil.module.ts` qui est **vide et ne sert à rien** — c'est une **ancienne façon**
de faire qu'on n'utilise plus (on avait déjà enlevé le même genre de meuble côté connexion).
👉 À **jeter**.

### 4.5 🏷️ La fiche photographe est incomplète
La description d'un photographe **oublie deux choses** :
- le **nombre d'avis** (ex. « 128 avis ») qui était dans la maquette ;
- un photographe peut avoir **plusieurs spécialités**, mais le code n'en garde **qu'une seule**.
👉 Aussi : les noms des cases sont en anglais alors que le plan les voulait en français. Pas grave en soi,
mais **il faut choisir une fois pour toutes** pour que ça colle avec le serveur plus tard.

### 4.6 🔇 Les boutons ne font rien
- La **barre de recherche** est juste un dessin : on peut écrire dedans, mais **ça ne cherche rien**.
- Les **boutons de tri** (ville, prix, note) sont des dessins aussi : **ils ne trient rien**.
- Le petit texte « 6 photographes vérifiés » est **écrit à la main** : même s'il y en avait 100,
  il afficherait toujours « 6 ».
👉 Bref, **aucune interactivité** pour l'instant.

### 4.7 ⭐ Les cartes oublient des détails de la maquette
- Pas d'**étoile avec la note** (⭐ 4.9) sur la carte.
- Le petit **badge « vérifié »** s'affiche **tout le temps**, même pour un photographe pas vérifié
  (il devrait apparaître seulement si le photographe est vraiment vérifié).
- **Cliquer sur une carte ne fait rien** : normalement ça devrait ouvrir la page du photographe.

---

## 5. Où en est-on par rapport au plan (les 7 étapes)

| Étape prévue | En français simple | État |
|---|---|---|
| **A1** | Préparer les fiches de description + les couleurs | 🟡 à moitié |
| **A2** | Le livreur qui va chercher les photographes | 🔴 pas fait |
| **A3** | La carte + la grille de cartes | 🟢 fait (mais incomplet) |
| **A4** | Faire marcher la recherche et les filtres | 🔴 pas fait |
| **A5** | Ouvrir la porte (routing) + tout relier | 🔴 pas fait |
| **A6** | Les petits outils réutilisables + version mobile | 🔴 pas fait |
| **A7** | Brancher le vrai serveur | ⚪ normal, pas encore |

🟢 fait · 🟡 à moitié · 🔴 à faire · ⚪ pas encore le moment.

---

## 6. Par quoi commencer (dans l'ordre)

1. 🚪 **Ouvrir la porte** : réparer les adresses pour qu'on arrive enfin sur l'accueil.
2. 🧹 **Jeter le vieux meuble** inutile (`accueil.module.ts`).
3. 🗄️ **Remplir les tiroirs vides** (les fiches de description) et **choisir les noms** une fois pour toutes.
4. 🚚 **Créer le livreur** (le service) et sortir les fausses données de la page.
5. 🔘 **Faire marcher les boutons** (recherche + filtres) et compter les photographes pour de vrai.
6. ⭐ **Finir les cartes** : étoile, badge « vérifié » seulement si vérifié, clic qui ouvre le profil.

---

## 7. En une image

> La vitrine est **jolie mais éteinte** : la lumière n'est pas branchée (routing),
> les vendeurs ne répondent pas (boutons), et les fiches montrent un mannequin en plastique (« julio »).
> Il faut **brancher le courant**, **mettre un vrai vendeur**, et **poser les vraies fiches**.
