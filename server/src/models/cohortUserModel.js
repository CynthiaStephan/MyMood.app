const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');
const Cohort = require('./cohortModel');

const CohortUser = sequelize.define('CohortUser', {
}, {
  tableName: 'cohort_user',
  timestamps: false
});

User.belongsToMany(Cohort, { through: CohortUser });
Cohort.belongsToMany(User, { through: CohortUser });

module.exports = CohortUser;