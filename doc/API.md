# Documentation API

## Base URL
Toutes les requêtes sont relatives à la base URL suivante :
```
http://localhost:3650/
```

---

## Endpoints

### 1. Gestion des utilisateurs

#### Obtenir tous les utilisateurs
- **URL** : `/user/`
- **Méthode** : GET
- **Description** : Récupère la liste de tous les utilisateurs.
- **Réponse** : 
    ```json
    [
        {
            "user_id": 1,
            "first_name": "Eddy",
            "last_name": "Reind",
            "email": "suzy@email.com",
            "role": "trainee"
        },
        {
            "user_id": 2,
            "first_name": "Cédric",
            "last_name": "Jeuno",
            "email": "cedric@email.com",
            "role": "supervisor"
        }
    ]
    ```

#### Obtenir tous les utilisateurs avec rôle stagiaire
- **URL** : `/user/trainee-users`
- **Méthode** : GET
- **Description** : Récupère la liste de tous les utilisateurs.
- **Réponse** : 
    ```json
    [
        {
            "user_id": 1,
            "first_name": "Eddy",
            "last_name": "Reind",
            "email": "suzy@email.com",
            "role": "trainee"
        }
    ]
    ```

#### Obtenir un utilisateur par ID
- **URL** : `/user/:user_id`
- **Méthode** : GET
- **Description** : Récupère les détails d'un utilisateur par son ID.
- **Réponse** : 
    ```json
    [
        {
            "user_id": 1,
            "first_name": "Eddy",
            "last_name": "Reind",
            "email": "suzy@email.com",
            "role": "trainee"
        }
    ]
    ```

#### Créer un nouvel utilisateur
- **URL** : `/user/new`
- **Méthode** : POST
- **Description** : Crée un nouvel utilisateur.
- **Corps de la requête** :
  ```json
  {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "password": "securepassword",
      "role": "trainee" // facultatif
  }
  ```
- **Réponse** : 
  ```json
  {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "role": "trainee"
  }
  ```

#### Mettre à jour un utilisateur
- **URL** : `/user/update/:user_id`
- **Méthode** : PUT
- **Description** : Met à jour les informations d'un utilisateur.
- **Corps de la requête** :
  ```json
  {
    // Dois continir au moins une modification 

      "first_name": "Jane", // facultatif
      "last_name": "Doe", // facultatif
      "email": "jane.doe@example.com", // facultatif
      "password": "newpassword" // falcutatif
  }
  ```

#### Supprimer un utilisateur
- **URL** : `/user/delete/:user_id`
- **Méthode** : DELETE
- **Description** : Supprime un utilisateur par son ID.

---

### 2. Gestion des utilisateurs

#### Afficher dernier score
- **URL** : `/mood/:user_id`
- **Méthode** : GET
- **Description** : Affiche le dernier score d'un stagiaire
- **Réponse** : 
  ```json
  {
      "score_id": 5,
      "score": 22,
      "user_id": 1
  }
  ```
  #### Ajouter un nouveau score
- **URL** : `/user/new`
- **Méthode** : POST
- **Description** : Ajouter un nouveau score, si la date du dernier score = date actuel, on modifie le score enregistré, sinon crée un nouveau.
- **Corps de la requête** :
  ```json
  {
      "score": 22
  }
  ```
- **Réponse** : 
  ```json
  {
      "score_id": 7,
      "user_id": "1",
      "score": 22,
      "created_at": "2025-01-30T15:07:53.984Z"
  }
  ```
  Ou 
  ```json
  [
    1
  ]
  ```


### 3. Gestion des cohortes

#### Obtenir toutes les cohortes
- **URL** : `/cohort/`
- **Méthode** : GET
- **Description** : Récupère la liste de toutes les cohortes.
- **Réponse** :
  ```json
  [
      {
          "cohort_id": 1,
          "name": "Cohorte 1"
      }
  ]
  ```

#### Obtenir une cohorte par ID
- **URL** : `/cohort/:cohort_id`
- **Méthode** : GET
- **Description** : Récupère les détails d'une cohorte par son ID.
- **Réponse** :
  ```json
  [
      {
          "name": "Cohorte 1"
      }
  ]

#### Créer une nouvelle cohorte
- **URL** : `/cohort/new`
- **Méthode** : POST
- **Description** : Crée une nouvelle cohorte.
- **Corps de la requête** :
  ```json
  {
      "name": "Cohorte 1"
  }
  ```

#### Mettre à jour une cohorte
- **URL** : `/cohort/update/:user_id`
- **Méthode** : PUT
- **Description** : Met à jour les informations d'une cohorte.
- **Corps de la requête** :
  ```json
  {
      "name": "Nouvelle cohorte"
  }
  ```

#### Supprimer une cohorte
- **URL** : `/cohort/delete/:user_id`
- **Méthode** : DELETE
- **Description** : Supprime une cohorte par son ID.

#### Assigner un utilisateur à une cohorte
- **URL** : `/cohort/asign-user`
- **Méthode** : POST
- **Description** : Assigne un utilisateur à une cohorte.
- **Corps de la requête** :
  ```json
  {
      "user_id": 1,
      "cohort_id": 2
  }
  ```

#### Retirer un utilisateur d'une cohorte
- **URL** : `/cohort/unasign-user`
- **Méthode** : DELETE
- **Description** : Retire un utilisateur d'une cohorte.
- **Corps de la requête** :
  ```json
  {
      "user_id": 1,
      "cohort_id": 2
  }
  ```

---

### 4. Gestion des blacklistes

#### Afficher la blacklist
- **URL** : `/blacklist/`
- **Méthode** : GET
- **Description** : Récupère la liste complète des entrées de la blacklist.

#### Afficher les stagiaires blacklistés
- **URL** : `/blacklist/users/:supervisor_id`
- **Méthode** : GET
- **Description** : Affiche les informations des stagiaires.
- **Réponse** : 
  ```json
  [
    {
        "user_id": 2,
        "first_name": "Benita ",
        "last_name": "AndrKellerde"
    },
    {
        "user_id": 5,
        "first_name": "Douglas",
        "last_name": "Warren"
    },
  ]
  ```

#### Ajouter un stagiaire à la blacklist
- **URL** : `/blacklist/add`
- **Méthode** : POST
- **Description** : Ajoute un étudiant à la blacklist.
- **Corps de la requête** :
  ```json
  {
      "supervisor_id": 1,
      "trainee_id": 2
  }
  ```

#### Ajouter plusieurs stagiaires à la blacklist
- **URL** : `/blacklist/add-many`
- **Méthode** : POST
- **Description** : Ajoute plusieurs stagiaires à la blacklist.
- **Corps de la requête** :
  ```json
  {
      "supervisor_id": 1,
      "trainee_id": [2, 3]
  }
  ```
- **Réponse** : 
  ```json
  {
    "blacklist": [
        {
            "blacklist_id": 5,
            "supervisor_id": 6,
            "trainee_id": 4
        }
    ]
  }
  ```

#### Supprimer un stagiaire de la blacklist
- **URL** : `/blacklist/remove`
- **Méthode** : DELETE
- **Description** : Supprime un ou plusieurs stagiaires de la blacklist.
- **Corps de la requête** :
  ```json
  {
      "supervisor_id": 1,
      "trainee_id": 2 ou [2, 3]
  }
  ```

## Codes d'erreur

| Code | Description |
|---:|---|
| 200  | Succès                                        |
| 201  | Crée                                          |
| 400  | Requête invalide                              |
| 401  | Non authentifié                               |
| 403  | Non autorisé                                  |
| 404  | Ressource non trouvée                         |
| 500  | Erreur serveur                                |
