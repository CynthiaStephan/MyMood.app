const User = require('./userModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

<<<<<<< Updated upstream
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
=======
const Blacklist = sequelize.define('blacklist', {
  blacklist_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  trainee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Blacklist;

>>>>>>> Stashed changes
