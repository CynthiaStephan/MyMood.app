const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Authentification
 *   description: Gestion de l'authentification des utilisateurs
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Authentifie un utilisateur avec ses identifiants (email et mot de passe) et retourne un token JWT pour la gestion des sessions.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur, utilisé pour l'identification.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mot de passe de l'utilisateur, nécessaire pour vérifier son identité.
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne le token JWT pour l'authentification future.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: L'ID de l'utilisateur.
 *                 role:
 *                   type: string
 *                   description: Le rôle de l'utilisateur (trainee, supervisor, admin).
 *       400:
 *         description: Les données fournies (email ou mot de passe) sont manquantes ou invalides.
 *       401:
 *         description: Identifiants incorrects (email ou mot de passe ne correspondent pas).
 *       500:
 *         description: Erreur serveur lors de la tentative de connexion.
 */
router.post('/login', authController.login);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     description: Déconnecte l'utilisateur en supprimant son token d'authentification, ce qui met fin à la session active.
 *     tags:
 *       - Authentification
 *     responses:
 *       200:
 *         description: Déconnexion réussie, le token a été supprimé et la session est terminée.
 *       400:
 *         description: Aucune session active détectée, l'utilisateur est déjà déconnecté.
 *       401:
 *         description: L'utilisateur n'est pas authentifié, impossible de se déconnecter.
 *       500:
 *         description: Erreur serveur lors de la tentative de déconnexion.
 */
router.post('/logout', authController.logout);

module.exports = router