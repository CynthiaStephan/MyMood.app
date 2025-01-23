
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const MoodScore = sequelize.define('mood_score', {
    score_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
            min: 0,
            max: 100,
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = MoodScore;