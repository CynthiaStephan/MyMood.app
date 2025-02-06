# Gestion des Émotions des Étudiants

Une application web permettant de suivre et gérer le bien-être des étudiants à travers une interface intuitive. Conçue pour faciliter la communication entre étudiants et encadrants.

## Documentation 

* **[Gestion des Branches GitHub](./doc/Guidelines.md)**
* **[Documentation API](./doc/API.md)**
* **[Configuration envoie de mails](./doc/ConfigurationMail.md)**
* **[Fonctionnement de l'authentification](./doc/Authentication.md)**

## Fonctionnalités principales

### Pour les étudiants
- Notation de leur humeur (échelle 1-100) avec visualisation par couleurs
- Système d'alerte en cas de besoin d'aide

### Pour les superviseurs
- Suivi des cohortes d'étudiants
- Gestion des alertes avec notifications
- Historique des suivis

### Pour les administrateurs
- Gestion complète des utilisateurs et cohortes
- Administration des accès et blacklist
- Supervision globale du système

## Technique

- **Front** : HTML/CSS/JS
- **Back** : Node.js, Express MySQL
- **Sécurité** : Authentification JWT
- **Environement** : Docker, Postman, Workbench
- **Gestion de projet** : Notion, Google Chat

## Installation

```bash
# Cloner le projet
git clone https://github.com/CynthiaStephan/MyMood.app.git

# Lancement avec Docker
docker-compose up -d --build
```


## Auteur

Développé dans le cadre d'un projet de groupe à l'IMTS par : 
  [Manuel](https://github.com/Sir-Nunul)
  [Thibaud](https://github.com/PhysicxG)
  [Evan](https://github.com/EvanBenyahiaNorves)
  [Cloë](https://github.com/LyliYoune)
  [Cynthia](https://github.com/CynthiaStephan)

<a href="https://github.com/CynthiaStephan/MyMood.app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CynthiaStephan/MyMood.app" />
</a>

