const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs (étudiants, superviseurs, administrateurs)
 */

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       404:
 *         description: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération des utilisateurs
 */
router.get('/', userController.getUsers);

/**
 * @openapi
 * /user/trainees:
 *   get:
 *     summary: Récupérer les utilisateurs ayant le rôle de "trainee"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs trainees récupérée avec succès
 *       404:
 *         description: Aucun utilisateur trainee trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération des utilisateurs trainees
 */
router.get('/trainees', userController.getUsersWhenRoleTrainee);

/**
 * @openapi
 * /user/admin/user-info:
 *   get:
 *     summary: Récupérer les utilisateurs ayant le rôle de "trainee" et affiche ses info + les cohorts associées
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs trainees récupérée avec succès
 *       404:
 *         description: Aucun utilisateurs trainee trouvés
 *       500:
 *         description: Erreur serveur lors de la récupération des utilisateurs trainees
 */
router.get('/admin/user-info', userController.getAllUsersInfoAndCohorts);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID unique de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération de l'utilisateur
 */
router.get('/:id', userController.getUserById);

/**
 * @openapi
 * /user/new:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [trainee, supervisor, admin]
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Mauvais format de demande ou données invalides
 *       500:
 *         description: Erreur serveur lors de la création de l'utilisateur
 */
router.post('/new', userController.createUser);

/**
 * @openapi
 * /user/update/{id}:
 *   put:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID unique de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informations mises à jour avec succès
 *       400:
 *         description: Données incorrectes
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de la mise à jour de l'utilisateur
 */
router.put('/update/:id', userController.updateUserInfo);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID unique de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de la suppression de l'utilisateur
 */
router.delete('/delete/:id', userController.deleteUserById);

/**
 * @openapi
 * /user/activate-alert/{id}:
 *   put:
 *     summary: Activer une alerte pour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID unique de l'utilisateur
 *     responses:
 *       200:
 *         description: Alerte activée avec succès
 *       400:
 *         description: L'utilisateur a déjà une alerte activée
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de l'activation de l'alerte
 */
router.put('/activate-alert/:id', userController.activateUserAlert);

/**
 * @openapi
 * /user/deactivate-alert/{id}:
 *   put:
 *     summary: Désactiver une alerte pour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID unique de l'utilisateur
 *     responses:
 *       200:
 *         description: Alerte désactivée avec succès
 *       400:
 *         description: L'utilisateur n'a pas d'alerte activée
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de la désactivation de l'alerte
 */
router.put('/deactivate-alert/:id', userController.deactivateUserAlert);

module.exports = router;
