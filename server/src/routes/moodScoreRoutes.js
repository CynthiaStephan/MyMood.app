const { Router } = require('express');
const moodScoreController = require('../controllers/moodScoreController');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Mood Score
 *   description: Gestion des scores d'humeur des utilisateurs
 */

/**
 * @openapi
 * /mood/{id}:
 *   get:
 *     summary: Récupérer le dernier score d'humeur d'un utilisateur
 *     description: Retourne le dernier score d'humeur enregistré pour un utilisateur donné, basé sur l'ID de l'utilisateur.
 *     tags:
 *       - Mood Score
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID unique de l'utilisateur pour lequel on veut récupérer le score d'humeur.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le dernier score d'humeur a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score_id:
 *                   type: integer
 *                   description: L'ID unique du score d'humeur.
 *                 score:
 *                   type: integer
 *                   description: Le score d'humeur de l'utilisateur (de 0 à 100).
 *                 user_id:
 *                   type: integer
 *                   description: L'ID de l'utilisateur auquel le score d'humeur est associé.
 *       404:
 *         description: Aucun score d'humeur n'a été trouvé pour cet utilisateur
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @openapi
 * /mood/new/{id}:
 *   post:
 *     summary: Ajouter ou mettre à jour le score d'humeur d'un utilisateur
 *     description: Ajoute un nouveau score d'humeur ou met à jour le score existant pour un utilisateur spécifique. Si un score a déjà été enregistré le même jour, il sera mis à jour. Sinon, un nouveau score sera ajouté.
 *     tags:
 *       - Mood Score
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID unique de l'utilisateur pour lequel on veut ajouter ou mettre à jour le score d'humeur.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: Le score d'humeur de l'utilisateur, exprimé en nombre entier (de 0 à 100).
 *                 example: 75
 *     responses:
 *       200:
 *         description: Le score d'humeur a été ajouté ou mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score_id:
 *                   type: integer
 *                   description: L'ID unique du score d'humeur.
 *                 score:
 *                   type: integer
 *                   description: Le score d'humeur de l'utilisateur.
 *                 user_id:
 *                   type: integer
 *                   description: L'ID de l'utilisateur auquel ce score d'humeur appartient.
 *       400:
 *         description: Les données fournies sont invalides ou le score n'a pas pu être ajouté
 *       500:
 *         description: Erreur serveur interne
 */

router.get('/:id', moodScoreController.getCurrentMoodByUserId);

/**
 * @openapi
 * /mood/new/{id}:
 *   post:
 *     summary: Ajouter un score d'humeur pour un utilisateur
 *     description: Enregistre un nouveau score d'humeur pour un utilisateur spécifique.
 *     tags:
 *       - Mood Score
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur auquel on ajoute un score d'humeur.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: Score d'humeur de l'utilisateur (ex: de 1 à 100).
 *     responses:
 *       201:
 *         description: Score d'humeur ajouté avec succès
 *       400:
 *         description: Données invalides fournies
 */
router.post('/new/:id', moodScoreController.addMoodScoreToUser);

module.exports = router