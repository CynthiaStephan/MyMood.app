const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');

const Blacklist = sequelize.define('Blacklist', {
  blacklist_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  trainee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'  // Assurez-vous que 'id' est bien la clé primaire de la table 'users'
    }
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'blacklist',
  timestamps: false
});

// 🔥 Relations Many-to-Many entre les utilisateurs (User)
User.belongsToMany(User, {
  through: Blacklist,
  as: 'SupervisedTrainees',  // Un superviseur a plusieurs étudiants
  foreignKey: 'supervisor_id',
  otherKey: 'trainee_id'
});

User.belongsToMany(User, {
  through: Blacklist,
  as: 'Supervisors',   // Un étudiant peut avoir plusieurs superviseurs
  foreignKey: 'trainee_id',
  otherKey: 'supervisor_id'
});

// 🚀 Export des modèles
module.exports = { Blacklist, User };
