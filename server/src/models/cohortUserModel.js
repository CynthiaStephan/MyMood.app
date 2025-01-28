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
  uniqueKey: "user_id"
});
Cohort.belongsToMany(User, { 
  through: CohortUser,
  uniqueKey: "cohort_id"
});

module.exports = CohortUser;