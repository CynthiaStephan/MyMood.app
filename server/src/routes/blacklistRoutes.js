
const { Router } = require('express'); // Assurez-vous que Router est bien importé
const { addToBlacklist, removeFromBlacklist, getBlacklist } = require('../controllers/blacklistController');

const router = Router();

// Ajouter un étudiant à la blacklist
router.post('/add', addToBlacklist);

// Supprimer un étudiant de la blacklist
router.delete('/remove', removeFromBlacklist);

// Récupérer la liste des étudiants blacklistés
router.get('/', getBlacklist);

module.exports = router; // Export de l'instance du routeur
