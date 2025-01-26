## 🚧 En cours de définition
### Routes `/auth`

| **Route**                | **Méthode** | **Description**               | **Entrée (query/body)**                                                                                                     | **Sortie**                                                                 |
|--------------------------|-------------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `/auth/register`         | POST        | Inscription d’un utilisateur  | `body`: `{ first_name, last_name, email, password, role }`                                                                 | `{ message: 'Utilisateur inscrit avec succès.' }` ou `{ error: 'Email déjà utilisé.' }`   |
| `/auth/login`            | POST        | Connexion d’un utilisateur    | `body`: `{ email, password }`                                                                                              | `{ token: 'JWT_TOKEN' }` ou `{ error: 'Email ou mot de passe incorrect.' }`              |
| `/auth/logout`           | POST        | Déconnexion                   | `headers`: `Authorization: Bearer JWT_TOKEN`                                                                               | `{ message: 'Déconnexion réussie.' }`                                       |
| `/auth/forgot-password`  | POST        | Réinitialisation mot de passe | `body`: `{ email }`                                                                                                       | `{ message: 'Email envoyé avec un lien de réinitialisation.' }`            |
| `/auth/reset-password`   | POST        | Modifier mot de passe oublié  | `body`: `{ token, new_password }`                                                                                          | `{ message: 'Mot de passe mis à jour.' }` ou `{ error: 'Token invalide ou expiré.' }`    |

---

### Routes `/users`

| **Route**        | **Méthode** | **Description**              | **Entrée (query/body)**                                                      | **Sortie**                                                               |
|------------------|-------------|------------------------------|------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| `/users`         | GET         | Liste de tous les utilisateurs | `query`: `?role=trainee|supervisor|admin` (optionnel)                        | `[{ id_user, first_name, last_name, email, role, has_alert }]`            |
| `/users/:id`     | GET         | Détails d’un utilisateur     | `params`: `id`                                                              | `{ id_user, first_name, last_name, email, role, has_alert }` ou erreur    |
| `/users/:id`     | PUT         | Mise à jour d’un utilisateur | `params`: `id`, `body`: `{ first_name, last_name, email, password, role }`   | `{ message: 'Utilisateur mis à jour.' }` ou `{ error: 'Email déjà utilisé.' }` |
| `/users/:id`     | DELETE      | Suppression d’un utilisateur | `params`: `id`                                                              | `{ message: 'Utilisateur supprimé.' }` ou `{ error: 'Utilisateur introuvable.' }` |

---

### Routes `/cohorts`

| **Route**                | **Méthode** | **Description**                      | **Entrée (query/body)**                                                  | **Sortie**                                                                 |
|--------------------------|-------------|--------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `/cohorts`               | GET         | Liste des cohortes                   | Aucune                                                                    | `[{ id_cohort, name }]`                                                    |
| `/cohorts/:id`           | GET         | Détails d’une cohorte                | `params`: `id`                                                            | `{ id_cohort, name, users: [{ id_user, first_name, last_name, email }] }`  |
| `/cohorts`               | POST        | Création d’une cohorte               | `body`: `{ name }`                                                        | `{ message: 'Cohorte créée avec succès.', id_cohort }`                     |
| `/cohorts/:id`           | PUT         | Mise à jour d’une cohorte            | `params`: `id`, `body`: `{ name }`                                        | `{ message: 'Cohorte mise à jour avec succès.' }`                          |
| `/cohorts/:id`           | DELETE      | Suppression d’une cohorte            | `params`: `id`                                                            | `{ message: 'Cohorte supprimée.' }`                                        |
| `/cohorts/:id/users`     | POST        | Ajout d’un utilisateur à une cohorte | `params`: `id`, `body`: `{ user_id }`                                     | `{ message: 'Utilisateur ajouté à la cohorte.' }` ou erreur               |
| `/cohorts/:id/users/:id` | DELETE      | Suppression d’un utilisateur         | `params`: `id` (id_cohort et id_user)                                     | `{ message: 'Utilisateur supprimé de la cohorte.' }` ou erreur            |

---

### Routes `/blacklist`

| **Route**      | **Méthode** | **Description**             | **Entrée (query/body)**        | **Sortie**                                                              |
|----------------|-------------|-----------------------------|--------------------------------|-------------------------------------------------------------------------|
| `/blacklist`   | POST        | Ajout d’un token à la liste noire | `body`: `{ token }`            | `{ message: 'Token ajouté à la blacklist.' }`                          |
| `/blacklist`   | GET         | Vérification d’un token     | `query`: `?token=...`          | `{ valid: false }` si blacklisté, `{ valid: true }` sinon              |

---

### Routes `/scores`

| **Route**              | **Méthode** | **Description**                         | **Entrée (query/body)**                                                                | **Sortie**                                                                |
|------------------------|-------------|-----------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `/scores`              | GET         | Liste de tous les scores d’humeur       | `query`: `?user_id=ID_USER` (optionnel, pour filtrer par utilisateur)                  | `[{ score_id, score, created_at, user_id }]`                              |
| `/scores/:id`          | GET         | Détails d’un score                      | `params`: `id`                                                                         | `{ score_id, score, created_at, user_id }` ou `{ error: 'Score introuvable.' }` |
| `/scores`              | POST        | Ajout d’un score pour un utilisateur    | `body`: `{ user_id, score }`                                                           | `{ message: 'Score ajouté avec succès.', score_id }`                      |
| `/scores/:id`          | PUT         | Mise à jour d’un score                  | `params`: `id`, `body`: `{ score }`                                                    | `{ message: 'Score mis à jour.' }` ou `{ error: 'Score introuvable.' }`   |
| `/scores/:id`          | DELETE      | Suppression d’un score                  | `params`: `id`                                                                         | `{ message: 'Score supprimé.' }` ou `{ error: 'Score introuvable.' }`     |
| `/scores/statistics`   | GET         | Statistiques globales ou par utilisateur| `query`: `?user_id=ID_USER` (optionnel)                                                | `{ average: 75, min: 50, max: 100, total: 10 }`                           |
