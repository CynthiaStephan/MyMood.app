
const { Router } = require('express'); // Assurez-vous que Router est bien importé
const { addToBlacklist, removeFromBlacklist, getBlacklist, getUsersBySupervisorId } = require('../controllers/blacklistController');

const router = Router();

// Ajouter un étudiant à la blacklist
router.post('/add', addToBlacklist);

// Supprimer un étudiant de la blacklist
router.delete('/remove', removeFromBlacklist);

// Récupérer la liste des étudiants blacklistés
router.get('/', getBlacklist);

// Récupérer les user blacklistés par un superviseur
router.get('/supervisor/:supervisor_id/users', getUsersBySupervisorId);

module.exports = router; // Export de l'instance du routeur
