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

### 2. Gestion des cohortes

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

### 3. Gestion des blacklistes

#### Ajouter un étudiant à la blacklist
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

#### Supprimer un étudiant de la blacklist
- **URL** : `/blacklist/remove`
- **Méthode** : DELETE
- **Description** : Supprime un étudiant de la blacklist.
- **Corps de la requête** :
  ```json
  {
      "supervisor_id": 1,
      "trainee_id": 2
  }
  ```

#### Récupérer la blacklist
- **URL** : `/blacklist/`
- **Méthode** : GET
- **Description** : Récupère la liste complète des entrées de la blacklist.




## Codes d'erreur

| Code | Description                                   |
|------|-----------------------------------------------|
| 200  | Succès                                        |
| 400  | Requête invalide                              |
| 401  | Non authentifié                               |
| 403  | Non autorisé                                  |
| 404  | Ressource non trouvée                         |
| 500  | Erreur serveur                                |

