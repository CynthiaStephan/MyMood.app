const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Blacklist = sequelize.define(
  'blacklist',
  {
    id_blacklist: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    traineeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Blacklist;
