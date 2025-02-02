const { Router } = require('express');
const cohortController = require('../controllers/cohortController');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Cohortes
 *   description: Gestion des cohortes d'étudiants
 */

/**
 * @openapi
 * /cohort:
 *   get:
 *     summary: Récupérer toutes les cohortes
 *     description: Cette route retourne la liste complète des cohortes existantes dans la base de données.
 *     tags:
 *       - Cohortes
 *     responses:
 *       200:
 *         description: Liste des cohortes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cohort'
 *       404:
 *         description: Aucune cohorte trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', cohortController.getCohorts);

/**
 * @openapi
 * /cohort/{id}:
 *   get:
 *     summary: Récupérer une cohorte par son ID
 *     description: Cette route retourne une cohorte spécifique basée sur son ID unique.
 *     tags:
 *       - Cohortes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la cohorte à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cohorte récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 *       404:
 *         description: Cohorte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id', cohortController.getCohortById);

/**
 * @openapi
 * /cohort/new:
 *   post:
 *     summary: Créer une nouvelle cohorte
 *     description: Permet d'ajouter une nouvelle cohorte à la base de données en spécifiant son nom.
 *     tags:
 *       - Cohortes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom de la nouvelle cohorte.
 *     responses:
 *       201:
 *         description: Cohorte créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 *       400:
 *         description: Requête invalide, le nom de la cohorte est manquant
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/new', cohortController.createCohort);

/**
 * @openapi
 * /cohort/update/{id}:
 *   put:
 *     summary: Mettre à jour une cohorte existante
 *     description: Cette route permet de modifier les informations d'une cohorte existante, comme son nom, en fonction de l'ID.
 *     tags:
 *       - Cohortes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la cohorte à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom de la cohorte.
 *     responses:
 *       200:
 *         description: Cohorte mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 *       404:
 *         description: Cohorte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/update/:id', cohortController.updateCohort);

/**
 * @openapi
 * /cohort/delete/{id}:
 *   delete:
 *     summary: Supprimer une cohorte
 *     description: Cette route permet de supprimer une cohorte existante en fonction de son ID.
 *     tags:
 *       - Cohortes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la cohorte à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cohorte supprimée avec succès
 *       404:
 *         description: Cohorte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/delete/:id', cohortController.deleteCohort);

/**
 * @openapi
 * /cohort/asign-user:
 *   post:
 *     summary: Assigner un utilisateur à une cohorte
 *     description: Cette route permet d'assigner un utilisateur à une cohorte spécifique, en fournissant les IDs correspondants.
 *     tags:
 *       - Cohortes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID de l'utilisateur à assigner à la cohorte.
 *               cohortId:
 *                 type: integer
 *                 description: ID de la cohorte à laquelle l'utilisateur sera assigné.
 *     responses:
 *       201:
 *         description: Utilisateur assigné avec succès à la cohorte
 *       400:
 *         description: Erreur lors de l'assignation de l'utilisateur à la cohorte
 *       404:
 *         description: Utilisateur ou cohorte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/asign-user', cohortController.assignUserToCohort);

/**
 * @openapi
 * /cohort/unasign-user:
 *   delete:
 *     summary: Retirer un utilisateur d'une cohorte
 *     description: Cette route permet de retirer un utilisateur d'une cohorte en fonction des IDs fournis.
 *     tags:
 *       - Cohortes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID de l'utilisateur à retirer de la cohorte.
 *               cohortId:
 *                 type: integer
 *                 description: ID de la cohorte dont l'utilisateur sera retiré.
 *     responses:
 *       200:
 *         description: Utilisateur retiré avec succès de la cohorte
 *       400:
 *         description: Erreur lors de la suppression de l'utilisateur de la cohorte
 *       404:
 *         description: Utilisateur ou cohorte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/unasign-user', cohortController.deleteUserFromCohort);


module.exports = router