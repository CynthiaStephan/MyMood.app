
const { Router } = require('express'); // Assurez-vous que Router est bien importé
const { addToBlacklist, removeFromBlacklist, getBlacklist, getBlacklistedUsersBySupervisorId, addMultipleUsersToBlacklist } = require('../controllers/blacklistController');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Blacklist
 *   description: Gestion des utilisateurs blacklistés
 */

// Ajouter un étudiant à la blacklist
/**
 * @openapi
 * /blacklist/add:
 *   post:
 *     summary: Ajouter un étudiant à la blacklist
 *     description: Ajoute un étudiant à la blacklist d'un superviseur spécifique.
 *     tags: [Blacklist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supervisor_id:
 *                 type: integer
 *                 description: ID du superviseur
 *               trainee_id:
 *                 type: integer
 *                 description: ID de l'étudiant à ajouter à la blacklist
 *     responses:
 *       201:
 *         description: Étudiant ajouté à la blacklist avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Étudiant ajouté à la blacklist."
 *                 blacklist:
 *                   type: object
 *                   properties:
 *                     blacklist_id:
 *                       type: integer
 *                     supervisor_id:
 *                       type: integer
 *                     trainee_id:
 *                       type: integer
 *       400:
 *         description: Étudiant déjà dans la blacklist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cet étudiant est déjà dans la blacklist."
 *       500:
 *         description: Erreur serveur
 */

router.post('/add', addToBlacklist);

/**
 * @openapi
 * /blacklist/add-many:
 *   post:
 *     summary: Ajouter plusieurs étudiants à la blacklist
 *     description: Ajoute plusieurs étudiants à la blacklist d'un superviseur. Vérifie d'abord les étudiants déjà présents dans la blacklist.
 *     tags: [Blacklist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supervisor_id:
 *                 type: integer
 *                 description: ID du superviseur
 *               trainee_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Liste des IDs des étudiants à ajouter à la blacklist
 *     responses:
 *       201:
 *         description: Étudiants ajoutés à la blacklist avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blacklist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blacklist_id:
 *                         type: integer
 *                       supervisor_id:
 *                         type: integer
 *                       trainee_id:
 *                         type: integer
 *       400:
 *         description: Aucun étudiant à ajouter, tous les étudiants sont déjà dans la blacklist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Les étudiants sélectionnés sont déjà blacklistés."
 *       500:
 *         description: Erreur serveur
 */

router.post('/add-many', addMultipleUsersToBlacklist);

/**
 * @openapi
 * /blacklist/remove:
 *   delete:
 *     summary: Supprimer un étudiant de la blacklist
 *     description: Retire un étudiant de la blacklist d'un superviseur spécifique.
 *     tags: [Blacklist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supervisor_id:
 *                 type: integer
 *                 description: ID du superviseur
 *               trainee_id:
 *                 type: integer
 *                 description: ID de l'étudiant à retirer de la blacklist
 *     responses:
 *       200:
 *         description: Étudiant retiré de la blacklist avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Étudiant retiré de la blacklist."
 *       404:
 *         description: Aucune entrée correspondante trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune entrée correspondante trouvée."
 *       500:
 *         description: Erreur serveur
 */

router.delete('/remove', removeFromBlacklist);

// Récupérer la liste des étudiants blacklistés
/**
 * @openapi
 * /blacklist:
 *   get:
 *     summary: Récupérer la liste des utilisateurs blacklistés
 *     description: Retourne tous les utilisateurs blacklistés dans l'application.
 *     tags: [Blacklist]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs blacklistés récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blacklist_id:
 *                     type: integer
 *                   supervisor_id:
 *                     type: integer
 *                   trainee_id:
 *                     type: integer
 *       500:
 *         description: Erreur serveur
 */

router.get('/', getBlacklist);

/**
 * @openapi
 * /blacklist/users/{id}:
 *   get:
 *     summary: Récupérer les étudiants blacklistés par le superviseur
 *     description: Retourne la liste des étudiants blacklistés par un superviseur spécifique.
 *     tags: [Blacklist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du superviseur
 *     responses:
 *       200:
 *         description: Liste des utilisateurs blacklistés par ce superviseur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *       404:
 *         description: Aucun étudiant blacklisté trouvé pour ce superviseur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucun étudiant blacklisté trouvé pour ce superviseur."
 *       500:
 *         description: Erreur serveur
 */

router.get('/users/:id', getBlacklistedUsersBySupervisorId)

module.exports = router; // Export de l'instance du routeur
