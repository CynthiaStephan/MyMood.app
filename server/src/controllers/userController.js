const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController {

    async getUsers(req, res){
        try {
            const users = await UserModel.findAll()
            if(!users || users.length === 0){
                return res.status(404).json({ error : 'User not found'});
            }
            res.status(200).json(users)
            
        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async getUserById(req, res){
        const { id } = req.params;

        try {
            const user = await UserModel.findByPk(id)
            if(!user || user.length === 0){
                return res.status(404).json({ error : 'User not found'});
            }
             res.status(200).json(user)
            
        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async createUser(req, res){
        const { id } = req.params;
        const { first_name, last_name, email, password, role  } = req.body;

        try {
            const saltRounds = 10;

            let hashedPassword = "";
            if (password) {
                hashedPassword = await bcrypt.hash(password, saltRounds);
            }

            const newUser = await UserModel.create(
                { 
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                 },
            );
            res.status(201).json(newUser)

        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async updateUserInfo(req, res){
        const { id } = req.params;
        const { first_name, last_name, email, password } = req.body;

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


            const updatedUser = await UserModel.update(updatedData,{ where: {id_user: id} });

            if(updatedUser === 0){
                return res.status(404).json({ error : 'User not found'});
            }
            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async deleteUserById(req, res){
        const { id } = req.params;

        try {

            const deletedUser = await UserModel.destroy({ where: {id_user: id} });

            if(deletedUser === 0){
                return res.status(404).json({ error : 'User not found'});
            }
            res.status(200).json(deletedUser)

        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }
}

module.exports = new UserController();

