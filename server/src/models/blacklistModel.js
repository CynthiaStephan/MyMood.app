const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Blacklist = sequelize.define('blacklist', {
    id_blacklist: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    timestamps: false,
});

module.exports = Blacklist;
