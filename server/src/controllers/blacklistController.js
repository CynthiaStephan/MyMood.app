// controllers/blacklistController.js
const BlacklistModel = require('../models/blacklist');

module.exports = {
  // Ajouter un étudiant à la blacklist
  async addToBlacklist(req, res) {
    try {
      const { supervisorId, traineeId } = req.body;

      // Vérifier si l'entrée existe déjà
      const exists = await BlacklistModel.findOne({ where: { supervisorId, traineeId } });
      if (exists) {
        return res.status(400).json({ message: 'Cet étudiant est déjà dans la blacklist.' });
      }

      // Ajouter à la blacklist
      const newEntry = await BlacklistModel.create({ supervisorId, traineeId });
      res.status(201).json({ message: 'Etudiant ajouté à la blacklist.', newEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout à la blacklist.' });
    }
  },

  // Supprimer un étudiant de la blacklist
  async removeFromBlacklist(req, res) {
    try {
      const { supervisorId, traineeId } = req.body;

      const deleted = await BlacklistModel.destroy({ where: { supervisorId, traineeId } });
      if (!deleted) {
        return res.status(404).json({ message: 'Aucune entrée correspondante trouvée.' });
      }

      res.status(200).json({ message: 'Etudiant retiré de la blacklist.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la blacklist.' });
    }
  },

  // Récupérer la liste des étudiants blacklistés
  async getBlacklist(req, res) {
    try {
      const { adminId } = req.params;

      const entries = await BlacklistModel.findAll({ where: { adminId } });
      res.status(200).json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la blacklist.' });
    }
  },
};