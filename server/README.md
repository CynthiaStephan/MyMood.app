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
    SERVER_PORT=3650
```

Crée un fichier `.env` à la racine du dossier `📂server/` et ajoute :
```env
    JWT_SECRET=supersecretkey
    GMAIL_USER=adressemail@gmail.com
    GMAIL_APP_PASS=motdepasseapplication
```

> ⚠️ **Remarque** : Remplace ces valeurs par celles de ton environnement !

---

## 📂 Structure du projet

```
📂 server
├── Dockerfile               # Fichier Docker pour containeriser l'application
├── package.json             # Fichier de configuration npm
└── 📂 src
    │── app.js               # Configuration principale de l'application
    │── database.js          # Configuration et connexion à la base de données
    │── index.js             # Point d'entrée du serveur
    │── swaggerConfig.js     # Configuration pour Swagger (documentation API)
    │
    ├── 📂 controllers       # Logique métier (controllers)
    │   ├── authController.js
    │   ├── blacklistController.js
    │   ├── cohortController.js
    │   ├── moodScoreController.js
    │   ├── userController.js
    │
    ├── 📂 dump              # Sauvegardes de la base de données
    │   ├── data-only_31-01.sql
    │   ├── db-data_29-01.sql
    │
    ├── 📂 middlewares       # Middlewares (par exemple, pour la vérification des tokens)
    │   ├── verifyToken.js
    │
    ├── 📂 models            # Modèles Sequelize représentant les tables de la BDD
    │   ├── blacklistModel.js
    │   ├── cohortModel.js
    │   ├── cohortUserModel.js
    │   ├── moodScoreModel.js
    │   ├── userModel.js
    │
    ├── 📂 routes            # Routes définissant les endpoints de l'API
    │   ├── authRoutes.js
    │   ├── blacklistRoutes.js
    │   ├── cohortRoutes.js
    │   ├── moodScoreRoutes.js
    │   ├── userRoutes.js
    │
    └── 📂 service           # Services supplémentaires (ex: pour l'envoi d'emails)
        ├── mailer.js
```

---

## 📡 Routes API

### 🔑 **Authentification**
| Méthode | Endpoint        | Description |
|---------|----------------|-------------|
| `POST`  | `/auth/login`  | Connexion utilisateur (JWT) |
| `POST`  | `/auth/logout` | Déconnexion (invalidation du token) |

### 👥 **Utilisateurs**
| Méthode | Endpoint         | Description |
|---------|-----------------|-------------|
| `GET`   | `/user/`        | Récupérer tous les utilisateurs |
| `GET`   | `/user/trainees` | Récupérer les utilisateurs ayant le rôle de "trainee" |
| `GET`   | `/user/:user_id` | Récupérer un utilisateur par ID |
| `GET`   | `/user/admin/user-info` | Récupérer les utilisateurs ayant le rôle de "trainee" et afficher leurs infos + les cohortes associées |
| `POST`  | `/user/new`     | Créer un utilisateur |
| `PUT`   | `/user/update/:user_id` | Modifier un utilisateur |
| `DELETE` | `/user/delete/:user_id` | Supprimer un utilisateur |

### 🚨 **Alertes**
| Méthode | Endpoint                   | Description |
|---------|----------------------------|-------------|
| `PUT`   | `/activate-alert/:user_id`   | Activer une alerte pour un utilisateur |
| `PUT`   | `/deactivate-alert/:user_id` | Désactiver une alerte |

### 🎓 **Cohortes**
| Méthode | Endpoint         | Description |
|---------|-----------------|-------------|
| `GET`   | `/cohort/`      | Récupérer toutes les cohortes |
| `GET`   | `/cohort/:cohort_id` | Récupérer une cohorte par ID |
| `POST`  | `/cohort/new`   | Créer une cohorte |
| `PUT`   | `/cohort/update/:cohort_id` | Modifier une cohorte |
| `DELETE` | `/cohort/delete/:cohort_id` | Supprimer une cohorte |
| `POST`  | `/cohort/asign-user` | Assigner un utilisateur à une cohorte |
| `DELETE` | `/cohort/unasign-user` | Retirer un utilisateur d'une cohorte |

### 📊 **Scores d'humeur**
| Méthode | Endpoint            | Description |
|---------|--------------------|-------------|
| `GET`   | `/mood/:user_id`    | Afficher le dernier score d'un stagiaire |
| `POST`  | `/mood/new` | Enregistrer un score d'humeur |

### 🚫 **Blacklistes**
| Méthode | Endpoint                   | Description |
|---------|----------------------------|-------------|
| `GET`   | `/blacklist/`              | Récupérer la liste complète des entrées de la blacklist |
| `GET`   | `/blacklist/users/:supervisor_id` | Afficher les stagiaires blacklistés |
| `POST`  | `/blacklist/add`           | Ajouter un stagiaire à la blacklist |
| `POST`  | `/blacklist/add-many`      | Ajouter plusieurs stagiaires à la blacklist |
| `DELETE` | `/blacklist/remove`        | Supprimer un ou plusieurs stagiaires de la blacklist |

---

## 🔔 Notifications

- **Emails** : Envoi d’alertes aux superviseurs en cas de situation critique.

---

## 🔒 Sécurité et authentification

- **Authentification avec JWT** : Chaque utilisateur reçoit un token après connexion, utilisé pour sécuriser les routes.
- **Middleware de protection** pour les routes sensibles en fonction des rôles (utilisateur, superviseur, administrateur).
- **Hashage des mots de passe avec bcrypt** pour protéger les comptes utilisateurs.
- **Protection contre les attaques XSS et CORS** grâce à **helmet**.

