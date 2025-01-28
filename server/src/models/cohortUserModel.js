const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');
const Cohort = require('./cohortModel');

const CohortUser = sequelize.define('CohortUser', {
}, {
  tableName: 'cohort_user',
  timestamps: false
});

User.belongsToMany(Cohort, { 
  through: CohortUser,
  foreignKey: 'user_id',     // Spécifie le nom de la colonne pour user_id
  otherKey: 'cohort_id'      // Spécifie le nom de la colonne pour cohort_id
});

Cohort.belongsToMany(User, { 
  through: CohortUser,
  foreignKey: 'cohort_id',   // Spécifie le nom de la colonne pour cohort_id
  otherKey: 'user_id'        // Spécifie le nom de la colonne pour user_id
});

module.exports = CohortUser;