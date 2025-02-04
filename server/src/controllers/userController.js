const UserModel = require('../models/userModel');
const CohortModel = require('../models/cohortModel');
const CohortUserModel = require('../models/cohortUserModel');
const BlacklistModel = require('../models/blacklistModel');
const MoodScoreModel = require('../models/moodScoreModel');

const bcrypt = require('bcrypt');

class UserController {

    async getUsers(req, res){
        try {
            const users = await UserModel.findAll({
                attributes: { exclude: ['password', 'has_alert'] },
            });
            if(!users || users.length === 0){
                return res.status(404).json({ error : 'Users not found'});
            }
            res.status(200).json(users)
            
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async getUsersWhenRoleTrainee(req, res){
        try {
            const users = await UserModel.findAll({
                attributes: { exclude: ['password'] },
                where: { role: 'trainee' },
            });
            if(!users || users.length === 0){
                return res.status(404).json({ error : 'Users not found'});
            }
            res.status(200).json(users)
            
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async getUserById(req, res){
        const { id } = req.params;

        try {
            const user = await UserModel.findByPk(id, {
                attributes: { exclude: ['password'] },
            })
            if(!user || user.length === 0){
                return res.status(404).json({ error : 'User not found'});
            }
            
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async getAllUsersInfoAndCohorts(req,res){
        try {
            const users = await UserModel.findAll({
                attributes: { exclude: ['password', 'has_alert'] },
                include: [{
                    model: CohortModel,
                    attributes: ['cohort_id', 'name'],
                    through: { attributes: [] }
                }]
            });
    
            console.log("Résultat Sequelize :", JSON.stringify(users, null, 2));

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async createUser(req, res){
        const { first_name, last_name, email, password, role  } = req.body;

        try {
            const saltRounds = 10;

            let hashedPassword = "";
            if (password) {
                hashedPassword = await bcrypt.hash(password, saltRounds);
            }

            const newUser = await UserModel.create({ 
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                },
            );
            let newuserData = {
                user_id: newUser.dataValues.user_id,
                first_name: newUser.dataValues.first_name,
                last_name: newUser.dataValues.last_name,
                email: newUser.dataValues.email,
                role: newUser.dataValues.role

            }
            res.status(201).json(newuserData)

        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async updateUserInfo(req, res){
        const { id } = req.params;
        const { first_name, last_name, email, password, role } = req.body;

        try {
            let hashedPassword = null;
            if (password) {
                hashedPassword = await bcrypt.hash(password, this.saltRounds);
            }

            // Prepare subject for changes, include only received fields
            const updatedData = {};
            if (first_name) updatedData.first_name = first_name;
            if (last_name) updatedData.last_name = last_name;
            if (email) updatedData.email = email;
            if (password) updatedData.password = hashedPassword;
            if (role) updatedData.role = role;


            const updatedUser = await UserModel.update(updatedData,{ where: {user_id: id} });

            if(updatedUser === 0){
                return res.status(404).json({ error : 'User not found'});
            }
            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async deleteUserById(req, res){
        const { id } = req.params;

        try {

            const deletedUser = await UserModel.destroy({ where: {user_id: id} });

            if(deletedUser === 0){
                return res.status(404).json({ error : 'User not found'});
            }
            res.status(200).json(deletedUser)

        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }
    // TODO : Ajouter le service d'envoie de mails
    async activateUserAlert(req, res){
        const { id } = req.params;

        try{
            const user = await UserModel.findOne({ where: {user_id: id} });
            if(user.dataValues.has_alert === false){
                const newAlert = await UserModel.update(
                    { has_alert: 1 },
                    {
                        where: {
                            user_id: id
                        },
                    },
                )

                if( newAlert === 0){
                    return res.status(404).json({ message: 'User not found' })
                }
                res.status(200).json(newAlert);
            } else {
                res.status(400).json({ message: 'The user as already an alert' })
            }

        } catch(error){
            res.status(500).json({ error : error.message });
        }
    }

    async deactivateUserAlert(req, res){
        const { id } = req.params;

        try{
            const user = await UserModel.findOne({ where: {user_id: id} });
            if(user.dataValues.has_alert === true){
                const newAlert = await UserModel.update(
                    { has_alert: 0 },
                    {
                        where: {
                            user_id: id
                        },
                    },
                )
                if( newAlert === 0){
                    return res.status(404).json({ message: 'User not found' })
                }
                res.status(200).json(newAlert);
            } else {
                res.status(400).json({ message: 'The user as not alert' })
            }

        } catch(error){
            res.status(500).json({ error : error.message });
        }
    }
    
    async deleteCascadUserById(req, res) {     
        const { id } = req.params;
        
        const transaction = await sequelize.transaction();

        try {
            // Vérifier si l'utilisateur existe
            const user = await UserModel.findByPk(id, { transaction });
            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ error: 'User not found' });
            }

            // Récupérer les cohortes associées à l'utilisateur
            const userCohorts = await CohortModel.findAll({
                include: [{ model: UserModel, where: { user_id: id }, through: { attributes: [] } }],
                transaction
            });

            // Vérifier et supprimer les entrées dans la Blacklist
            const blacklistEntry = await BlacklistModel.findAll({ where: { user_id: id }, transaction });
            if (blacklistEntry) {
                const deletedBlacklist = await BlacklistModel.destroy({ where: { user_id: id }, transaction });
                if (deletedBlacklist === 0) {
                    await transaction.rollback();
                    return res.status(500).json({ error: 'Failed to delete Blacklist entry' });
                }
            }

            // Vérifier et supprimer les scores d'humeur
            const moodScores = await MoodScoreModel.findAll({ where: { user_id: id }, transaction });
            if (moodScores.length > 0) {
                const deletedMoodScores = await MoodScoreModel.destroy({ where: { user_id: id }, transaction });
                if (deletedMoodScores === 0) {
                    await transaction.rollback();
                    return res.status(500).json({ error: 'Failed to delete MoodScores' });
                }
            }

            // Vérifier et supprimer les liens user-cohorte
            const cohortUserLinks = await CohortUserModel.findAll({ where: { user_id: id }, transaction });
            if (cohortUserLinks.length > 0) {
                const deletedCohortUserLinks = await CohortUserModel.destroy({ where: { user_id: id }, transaction });
                if (deletedCohortUserLinks === 0) {
                    await transaction.rollback();
                    return res.status(500).json({ error: 'Failed to delete CohortUser links' });
                }
            }
           
            // Supprimer l'utilisateur
            const deletedUser = await UserModel.destroy({ where: { user_id: id }, transaction });
            
            if (deletedUser === 0) {
                await transaction.rollback();
                return res.status(404).json({ error: 'User could not be deleted' });
            }

            // Valider la transaction
            await transaction.commit();

            res.status(200).json({ message: 'User successfully deleted' });
        } catch (error) {
            await transaction.rollback(); // Annuler toutes les suppressions en cas d'erreur
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();

