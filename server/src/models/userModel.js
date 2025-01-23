const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(),
        values: ['trainee', 'supervisor', 'admin'],
        defaultValue: 'stagiere',
        allowNull: false,
    },
    has_alert: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }, 
}, {
    // Disable automatic timestamps (createdAt and updatedAt)
    timestamps: false,
});

module.exports = User;

