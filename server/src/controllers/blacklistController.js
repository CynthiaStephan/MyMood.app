<<<<<<< Updated upstream
// controllers/blacklistController.js
const BlacklistModel = require('../models/blacklist');
=======
const Blacklist = require('../models/blacklistModel');
>>>>>>> Stashed changes

module.exports = {
  // Ajouter un étudiant à la blacklist
  async addToBlacklist(req, res) {
    try {
      const { supervisor_id, trainee_id } = req.body;
      
      // Vérifier si l'entrée existe déjà
      const exists = await Blacklist.findOne({ where: { supervisor_id, trainee_id } });
      if (exists) {
        return res.status(400).json({ message: 'Cet étudiant est déjà dans la blacklist.' });
      }

      // Ajouter à la blacklist
      const newEntry = await Blacklist.create({ supervisor_id, trainee_id });
      res.status(201).json({ message: 'Étudiant ajouté à la blacklist.', blacklist: newEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout à la blacklist.' });
    }
  },

  // Supprimer un étudiant de la blacklist
  async removeFromBlacklist(req, res) {
    try {
      const { supervisor_id, trainee_id } = req.body;

      const deleted = await Blacklist.destroy({ where: { supervisor_id, trainee_id } });
      if (deleted === 0) {
        return res.status(404).json({ message: 'Aucune entrée correspondante trouvée.' });
      }

      res.status(200).json({ message: 'Étudiant retiré de la blacklist.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la blacklist.' });
    }
  },

  // Récupérer la liste des étudiants blacklistés pour un superviseur
  async getBlacklist(req, res) {
    try {

      const entries = await Blacklist.findAll();
      res.status(200).json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la blacklist.' });
    }
  },

  async getBlacklistBySupervisorId(req, res) {
    try {

      const entries = await Blacklist.findAll();
      res.status(200).json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la blacklist.' });
    }
  },
};
