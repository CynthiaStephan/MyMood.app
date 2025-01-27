const { Router } = require('express');
const blacklistController = require('../controllers/blacklistController');

const router = Router();

// Ajouter un étudiant à la blacklist
router.post('/blacklist', blacklistController.addToBlacklist);

// Supprimer un étudiant de la blacklist
router.delete('/blacklist', blacklistController.removeFromBlacklist);

// Récupérer la blacklist d'un admin
router.get('/blacklist/:adminId', blacklistController.getBlacklist);

module.exports = router