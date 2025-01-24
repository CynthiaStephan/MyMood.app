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

// Associations
Cohort.associate = () => {
    // Cohort ↔ User (Many-to-Many via CohortUser)
    Cohort.belongsToMany(User, { through: CohortUser, foreignKey: 'id_cohort' });
};

module.exports = Cohort;