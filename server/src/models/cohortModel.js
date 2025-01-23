const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cohort = sequelize.define('cohort', {
    id_cohort: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Cohort;