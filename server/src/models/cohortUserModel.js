const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CohortUser = sequelize.define('cohortuser', {
    id_cohort_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    timestamps: false,
});

module.exports = CohortUser;
