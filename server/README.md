# 🎯 Backend - MyMood.app

Ce répertoire contient la partie backend de **MyMood.app**, une API RESTful permettant la gestion des utilisateurs, des cohortes et du suivi des émotions des étudiants.

---

## 🚀 Technologies utilisées

- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour créer l'API
- **MySQL** - Base de données relationnelle
- **Sequelize** - ORM pour la gestion de la BDD
- **JWT (jsonwebtoken)** - Authentification sécurisée
- **bcrypt** - Hashage des mots de passe
- **dotenv** - Gestion des variables d'environnement
- **helmet & cors** - Sécurisation des requêtes HTTP
- **nodemon** - Rechargement automatique en développement

---

## 🛠️ Installation et configuration

### Prérequis

- Node.js (v20+ recommandé)

### Configuration des variables d’environnement

Crée un fichier `.env` à la racine et ajoute :

```env
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=mymood_db
JWT_SECRET=supersecretkey
```

> ⚠️ **Remarque** : Remplace ces valeurs par celles de ton environnement !

---

## 📂 Structure du projet

```
📂 server
├── Dockerfile              # Fichier Docker pour containeriser l'application
├── package.json            # Fichier de configuration npm
└── 📂 src
    │── app.js              # Configuration principale de l'application
    │── database.js         # Configuration et connexion à la base de données
    │── index.js            # Point d'entrée du serveur
    │
    ├── 📂 controllers      # Logique métier (controllers)
    │   ├── authController.js
    │   ├── blacklistController.js
    │   ├── cohortController.js
    │   ├── moodScoreController.js
    │   ├── userController.js
    │
    ├── 📂 dump             # Sauvegardes de la base de données
    │   ├── data-only_31-01.sql
    │   ├── db-data_29-01.sql
    │
    ├── 📂 models           # Modèles Sequelize représentant les tables de la BDD
    │   ├── blacklistModel.js
    │   ├── cohortModel.js
    │   ├── cohortUserModel.js
    │   ├── moodScoreModel.js
    │   ├── userModel.js
    │
    └── 📂 routes           # Routes définissant les endpoints de l'API
        ├── authRoutes.js
        ├── blacklistRoutes.js
        ├── cohortRoutes.js
        ├── moodScoreRoutes.js
        ├── userRoutes.js
```

---

## 📡 Routes API

### 🔑 **Authentification**
| Méthode | Endpoint        | Description |
|---------|----------------|-------------|
| `POST`  | `/auth/login`  | Connexion utilisateur (JWT) |
| `POST`  | `/auth/signup` | Inscription d’un utilisateur |
| `POST`  | `/auth/logout` | Déconnexion (invalidation du token) |

### 👥 **Utilisateurs**
| Méthode | Endpoint         | Description |
|---------|-----------------|-------------|
| `GET`   | `/users/`        | Récupérer tous les utilisateurs |
| `GET`   | `/users/:id`     | Récupérer un utilisateur par ID |
| `POST`  | `/users/new`     | Créer un utilisateur |
| `PUT`   | `/users/update/:id` | Modifier un utilisateur |
| `DELETE` | `/users/delete/:id` | Supprimer un utilisateur |

### 🎓 **Cohortes**
| Méthode | Endpoint         | Description |
|---------|-----------------|-------------|
| `GET`   | `/cohorts/`      | Récupérer toutes les cohortes |
| `POST`  | `/cohorts/new`   | Créer une cohorte |
| `PUT`   | `/cohorts/:id`   | Modifier une cohorte |
| `DELETE` | `/cohorts/:id`  | Supprimer une cohorte |

### 📊 **Scores d'humeur**
| Méthode | Endpoint            | Description |
|---------|--------------------|-------------|
| `GET`   | `/mood-scores/`    | Récupérer tous les scores |
| `POST`  | `/mood-scores/new` | Enregistrer un score d'humeur |

### 🚨 **Alertes**
| Méthode | Endpoint                   | Description |
|---------|----------------------------|-------------|
| `PUT`   | `/users/activate-alert/:id`   | Activer une alerte pour un utilisateur |
| `PUT`   | `/users/deactivate-alert/:id` | Désactiver une alerte |
| `GET`   | `/alerts/`                    | Voir toutes les alertes |

---

## 🔔 Notifications

- **Emails** : Envoi d’alertes aux superviseurs en cas de situation critique.

---

## 🔒 Sécurité et authentification

- **Authentification avec JWT** : Chaque utilisateur reçoit un token après connexion, utilisé pour sécuriser les routes.
- **Middleware de protection** pour les routes sensibles en fonction des rôles (utilisateur, superviseur, administrateur).
- **Hashage des mots de passe avec bcrypt** pour protéger les comptes utilisateurs.
- **Protection contre les attaques XSS et CORS** grâce à **helmet**.

