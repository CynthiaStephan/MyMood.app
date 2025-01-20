# Gestion des Émotions des Étudiants

Ce projet est une application web conçue pour permettre à des étudiants, superviseurs et administrateurs de gérer, suivre et visualiser les émotions des étudiants via une interface intuitive. L'application inclut des fonctionnalités de gestion des humeurs et des alertes pour des situations critiques.

## Fonctionnalités

### Fonctionnalités pour les Étudiants
- **Authentification** : Connexion sécurisée avec JWT (header Bearer).
- **Saisie de l’humeur** : 
  - Inscription de l’humeur sur une échelle de 1 à 100.
  - Dégradé de couleurs pour visualiser les émotions (ex. 1-20 = bleu, 21-40 = vert...).
- **Bouton d'alerte** : 
  - Déclenchement manuel d’une notification d'appel en cas de besoin.
  - Envoi de la notification au superviseur et à l’administrateur.

### Fonctionnalités pour les Superviseurs
- **Authentification** : Connexion sécurisée avec JWT (header Bearer).
- **Gestion des cohortes** : Visualisation des cohortes dont il est responsable.
- **Alerte d'appel** : 
  - Visualisation des alertes d’appel déclenchées par les étudiants.
  - Option pour marquer une alerte comme "gérée".
- **Notifications** : Réception de notifications par email lors de déclenchements d'alertes.

### Fonctionnalités pour les Administrateurs
- **Authentification** : Connexion sécurisée avec JWT (header Bearer).
- **Gestion des utilisateurs** :
  - Création, modification et suppression d’utilisateurs (étudiants, superviseurs, administrateurs).
  - Attribution des rôles (étudiant, superviseur ou administrateur).
- **Gestion des cohortes** :
  - Création et suppression de cohortes.
  - Assignation des utilisateurs aux cohortes.
- **Blacklist** : Gestion d'une liste noire pour empêcher l’inscription d’étudiants spécifiques à certaines cohortes.
- **Historique des humeurs** : Consultation des historiques de changement d’humeur des étudiants.
- **Gestion des alertes** : Possibilité de marquer les alertes comme "gérées".


## Architecture Technique

### Technologies Utilisées
- **Back-end** : Node.js avec MySQL.
- **Front-end** : HTML, CSS, JavaScript.
- **Authentification** : Système JWT (header Bearer) pour sécuriser les actions des utilisateurs.

### Base de Données
- **Stockage des données** :
  - Informations des utilisateurs (étudiants, superviseurs, administrateurs).
  - Scores émotionnels des étudiants.
  - Alertes d’appel.
  - Cohortes et assignations.
  - Historique des changements d’humeur.

---

## Installation et Lancement

### Prérequis
- Node.js et npm installés sur votre machine.
- MySQL configuré et accessible.

### Étapes d'installation
1. **Cloner le projet** :
   ```bash
   git clone https://github.com/CynthiaStephan/MyMood.app.git
   ```

2. **Configurer le Back-end** :
   - Installer les dépendances :
     ```bash
     cd backend
     npm install
     ```
   - Configurer la base de données MySQL dans le fichier `.env`.
   - Installer les dépendances :
     ```bash
     npm install
     ```

3. **Configurer le Front-end** :
   - Accéder au dossier client :
     ```bash
     cd client
     ```
   - Lancer l'application avec un serveur local ou directement ouvrir les fichiers HTML dans un navigateur.
  
4. **Lancer les conteneurs Docker** :
    - Build des conteneurs Docker :
        ```bash
        docker-compose build
        ```
    - Lancement des conteneurs Docker : 
        ```bash
        docker-compose up -d
        ```
## Auteur

Développé par l’équipe de projet dans le cadre d’un exercice pratique.
