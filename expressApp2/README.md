# Airbnb

## Objectif

Le but est de créer une application **Express** permettant de rechercher des Airbnb en fonction de critères choisis par l'utilisateur. L'application gère également l'authentification des utilisateurs avec JWT et permet une expérience sécurisée et personnalisée.

## Architecture

Le projet est codé en **MVC** (Model-View-Controller) avec une séparation claire des responsabilités :

* **Models** : définissent les schémas Mongoose pour les `Listing` et les `User`, avec validation et timestamps.
* **Views** : pages EJS stylisées avec TailwindCSS pour une interface responsive et moderne.
* **Controllers** : contiennent la logique métier et gèrent les interactions entre la base de données et les vues.
* **Services** : encapsulent les requêtes vers la base de données pour `Listings` et `Users`.
* **Routes** : définissent les endpoints REST et utilisent des middlewares pour l'authentification et la sécurisation des données.

## Fonctionnalités principales

* Recherche d’Airbnb par prix, nombre de chambres, lits, invités, pays et type de propriété.
* Authentification simple avec JWT et gestion des sessions via cookies sécurisés.
* Possibilité de se connecter et se déconnecter avec un bouton “Logout”.
* Interface responsive et agréable grâce à TailwindCSS.

## Installation

1. Cloner le projet :

```bash
git clone <repo-url>
```

2. Naviguer dans expressApp2

```bash
cd ./expressApp2/
```

3. Installer les dépendances :

```bash
pnpm install
```

4. Configurer le fichier `.env` avec :

```
JWT_SECRET=
MONGO_URI=
MONGO_USER=
MONGO_PASSWORD=
AUTHSOURCE=
PORT=
```

5. Lancer le seed pour créer les utilisateurs :

```bash
pnpm seed
```

6. Démarrer le serveur :

```bash
pnpm dev
```

## Usage

* Accéder à l’application : `http://localhost:3001/login:3001`
* Se connecter avec un des utilisateurs seedés (`admin/1234`, `root/root`).
* Rechercher des listings et consulter les résultats en temps réel.
* Se déconnecter via le bouton Logout.

## Stack technique

* Node.js + Express
* MongoDB + Mongoose
* EJS + TailwindCSS
* JWT pour l’authentification
* Bcrypt pour le hash des mots de passe
