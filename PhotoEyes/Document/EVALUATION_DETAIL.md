# Rapport d'évaluation — Page de Détail du photographe (expliqué très simplement)

> On compare **ce qui a été codé** avec **ce qui était prévu** dans `CONCEPTION_DETAIL.md`.
> Tout est raconté avec des images de la vie de tous les jours. Date : 2026-07-14.

---

## 1. C'est quoi la page de détail ?

Imagine la **fiche d'un artisan** affichée dans la vitrine.
Quand un visiteur clique sur un photographe, il arrive sur **sa page à lui**, où il voit :

1. Un **grand bandeau** en haut avec sa photo de couverture, son avatar, son nom, un badge « vérifié »,
   sa spécialité, sa ville, sa note en étoiles — et un bouton **« Réserver »**.
2. Une partie **« À propos »** (son texte de présentation + ses catégories).
3. Un **portfolio** (une grille de photos).
4. Les **avis clients** (modérés par l'admin).
5. Sur le côté, une **carte des tarifs** qui suit quand on descend (« sticky »), avec un bouton
   **« Réserver »** et une **note d'opacité** (« on ne donne jamais les coordonnées, tout passe par la plateforme »).

La règle d'or : **on ne montre aucun numéro ni email**, et le **seul geste possible, c'est « Réserver »**.

---

## 2. La note globale (en une phrase)

> **La belle fiche est là, mais elle est encore en carton-pâte : rien ne bouge quand on appuie.**

Les meubles sont au bon endroit (structure fidèle au plan), mais :
- deux **panneaux sont mal vissés** (bugs d'affichage visibles),
- le bouton **« Réserver » ne fait rien** (c'était pourtant le cœur de la page),
- la fiche n'a **pas de plan B** si le photographe n'existe pas (pas de page « introuvable »),
- les informations viennent de **deux tiroirs différents** au lieu d'un seul, ce qui est fragile.

Note d'avancement : **à peu près 4 sur 10**. La structure est bonne et fidèle à la maquette,
mais tout ce qui rend la page *vivante* reste à brancher.

---

## 3. Ce qui est BIEN ✅ (on garde)

- 🗂️ **Les dossiers sont bien rangés**, exactement comme le plan le demandait (page + petits morceaux séparés).
- 🧱 **Le travail est découpé en petits morceaux** : bandeau, « à propos », portfolio, avis, tarifs.
  Chaque morceau a un seul job — c'est la bonne façon de faire.
- 🚪 **La porte est ouverte** : l'adresse `/photographes/:id` est bien branchée, on arrive sur la page.
- 🔒 **Aucune coordonnée** du photographe n'est affichée → la règle d'opacité est respectée.
- 📝 La **note d'opacité** et la mention « avis modérés par l'admin » sont bien présentes, comme prévu.

---

## 4. Ce qui NE VA PAS ❌ (à réparer), expliqué un par un

### 4.1 🖼️ La photo de couverture ne s'affiche jamais (bug)
Dans le bandeau, la ligne qui doit afficher la grande photo est **mal écrite** (les crochets sont mal posés).
👉 Résultat : **la photo de couverture reste invisible**. C'est une petite faute de frappe, mais très visible.

### 4.2 🏷️ Les étiquettes de catégories affichent n'importe quoi (bug)
Dans « À propos », on veut afficher les catégories une par une (« Mariage », « Cérémonie », « Couple »).
Mais le code affiche **la liste entière à chaque fois** (« Mariage,Cérémonie,Couple » répété 3 fois).
👉 On a écrit *le paquet* au lieu de *chaque étiquette*. À corriger.

### 4.3 🔕 Le bouton « Réserver » ne fait rien (le plus important)
C'était **le cœur de la page** dans le plan : selon qui clique, il devait se passer quelque chose de différent :
- un **visiteur** → on l'emmène se connecter, puis on revient sur la fiche ;
- un **client connecté** → on ouvre la demande de réservation (qui part **chez l'admin**, jamais chez le photographe) ;
- un **photographe / admin** → le bouton disparaît (pas concerné).

👉 Aujourd'hui, **les deux boutons « Réserver » sont des dessins** : on peut cliquer, il ne se passe **rien**.

### 4.4 🚦 Pas de plan B si le photographe n'existe pas
Le plan demandait trois états : **« ça charge… »**, **« photographe introuvable » (page 404)**, et **« erreur »**.
Ici, rien de tout ça : si on tape une adresse d'un photographe qui n'existe pas, la page reste **à moitié vide,
sans message**, au lieu de dire poliment « ce profil n'existe pas ».

### 4.5 🗄️ Les infos viennent de deux tiroirs au lieu d'un seul
Le plan prévoyait **une seule fiche complète** par photographe (nom, ville, note, bio, photos, tarifs, avis…).
Ici, la page va chercher dans **deux endroits différents** :
- un tiroir « accueil » pour la note, la ville, l'avatar, la couverture ;
- un tiroir « détail » pour la bio, les photos, les avis, les tarifs.

👉 Problème : si le premier tiroir ne trouve pas le photographe, **tout le bandeau du haut disparaît**.
Et il y a **deux étiquettes « vérifié »** (une dans chaque tiroir) qui ne disent pas la même chose.
C'est fragile : mieux vaut **une seule source** pour tout.

### 4.6 📌 La carte des tarifs ne « colle » pas quand on descend
Le plan (et la maquette) voulaient une carte des tarifs qui **reste visible** quand on fait défiler la page.
Le code a bien mis « à 10 px du haut », mais **a oublié de dire qu'elle doit coller** (le fameux « sticky »).
👉 Résultat : la carte défile normalement et disparaît, au lieu de suivre.

### 4.7 ⭐ Quelques détails de la maquette oubliés
- Pas de **note chiffrée avec le nombre d'avis** (« ★ 4.9 (128) ») : seulement des étoiles pleines/vides.
- Sur téléphone, le bouton **« Réserver » collé en bas de l'écran** (prévu) n'est pas là.
- Les **petits outils réutilisables** (étoiles, badge vérifié, prix en FCFA) n'ont pas été créés :
  la logique des étoiles est **recopiée** à deux endroits au lieu d'être partagée.

### 4.8 ✏️ Des noms mal orthographiés
Dans le code, on lit `tarrif` et `review` (au singulier) au lieu de `tarifs` / `avis`.
👉 Pas grave pour l'affichage, mais **il faut choisir les bons noms une fois pour toutes** pour que
ça colle avec le serveur plus tard.

---

## 5. Où en est-on par rapport au plan (les 7 étapes)

| Étape prévue | En français simple | État |
|---|---|---|
| **D1** | Les fiches de description (modèles) | 🟡 à moitié (il manque note, nb d'avis, ville) |
| **D2** | Le livreur qui va chercher un photographe + l'adresse `/photographes/:id` | 🟢 fait |
| **D3** | Le bandeau du haut (photo, nom, badge, note) | 🟡 à moitié (bug de la couverture) |
| **D4** | « À propos » + le portfolio | 🟡 à moitié (bug des catégories) |
| **D5** | Les avis + la carte des tarifs (qui colle) | 🟡 à moitié (pas « sticky ») |
| **D6** | Bouton « Réserver » + note d'opacité + états 404/erreur | 🔴 pas fait (bouton mort, pas de 404) |
| **D7** | Favoris + version mobile + vrai serveur | ⚪ normal, pas encore |

🟢 fait · 🟡 à moitié · 🔴 à faire · ⚪ pas encore le moment.

---

## 6. Par quoi commencer (dans l'ordre)

1. 🖼️ **Réparer les 2 bugs visibles** : la photo de couverture et les étiquettes de catégories.
2. 🔔 **Faire marcher « Réserver »** : selon qui clique (visiteur / client / photographe), l'emmener au bon endroit.
3. 🚦 **Ajouter les plans B** : « ça charge… », « introuvable » (404), « erreur ».
4. 🗄️ **Regrouper les infos dans un seul tiroir** (une seule fiche complète), pour ne plus dépendre de deux endroits.
5. 📌 **Faire coller la carte des tarifs** + poser le bouton « Réserver » en bas sur téléphone.
6. ⭐ **Finir les détails** : note chiffrée + nombre d'avis, et petits outils réutilisables (étoiles, badge, FCFA).

---

## 7. En une image

> La fiche du photographe est **bien dessinée mais figée** : la grande photo ne s'allume pas,
> les étiquettes bafouillent, et le vendeur (« Réserver ») **ne décroche pas**.
> Il faut **réparer les deux vitres cassées**, **faire répondre le vendeur**, et **prévoir un mot d'excuse**
> quand la fiche n'existe pas.
