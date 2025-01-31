const BlacklistModel = require('../models/blacklistModel');
const UserModel = require('../models/userModel');

module.exports = {
    // Ajouter un étudiant à la blacklist
    async addToBlacklist(req, res) {
        try {
        const { supervisor_id, trainee_id } = req.body;
        
        // Vérifier si l'entrée existe déjà
        const exists = await BlacklistModel.findOne({ where: { supervisor_id, trainee_id } });
        if (exists) {
            return res.status(400).json({ message: 'Cet étudiant est déjà dans la blacklist.' });
        }

        // Ajouter à la blacklist

        const newEntry = await BlacklistModel.create({ supervisor_id, trainee_id });
        res.status(201).json({ message: 'Étudiant ajouté à la blacklist.', blacklist: newEntry });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout à la blacklist.' });
        }
    },

    async addMultipleUsersToBlacklist(req, res) {

        const { supervisor_id, trainee_ids } = req.body;

        try {
            // trainee_id is an array
            const existingEntries = await BlacklistModel.findAll({
                where: {
                    supervisor_id: supervisor_id,
                    trainee_id: trainee_ids,
                }
            });

            const existingIds = existingEntries.map(entry => entry.trainee_id);
            const newTrainees = trainee_ids.filter(id => !existingIds.includes(id));
    
            if (newTrainees.length === 0) {
                return res.status(400).json({ message: 'Selected trainees are already blacklisted' });
            }
            // map for to insert an array of ids
            const newEntries = await BlacklistModel.bulkCreate(
                newTrainees.map(trainee_id => ({ supervisor_id, trainee_id }))
            );
            
            res.status(201).json({
                blacklist: newEntries
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer un étudiant de la blacklist
    async removeFromBlacklist(req, res) {
        try {
        const { supervisor_id, trainee_id } = req.body;

        const deleted = await BlacklistModel.destroy({ where: { supervisor_id, trainee_id } });
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

        const entries = await BlacklistModel.findAll();
        res.status(200).json(entries);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la blacklist.' });
        }
    },

    async getBlacklistBySupervisorId(req, res) {
        try {

        const entries = await BlacklistModel.findAll();
        res.status(200).json(entries);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la blacklist.' });
        }
    },

    async getBlacklistedUsersBySupervisorId(req, res) {
        const { id } = req.params;
    
        try {
            const supervisor = await UserModel.findByPk(id, {
                include: [{
                    model: UserModel,
                    as: 'Trainees',
                    attributes: ['user_id', 'first_name', 'last_name'],
                    through: { attributes: [] }
                }]
            });
    
            if (!supervisor) {
                return res.status(404).json({ message: 'Supervisor not found' });
            }
    
            if (!supervisor.Trainees || supervisor.Trainees.length === 0) {
                return res.status(404).json({ message: 'No blacklisted trainees by this supervisor' });
            }
    
            res.status(200).json(supervisor.Trainees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};
