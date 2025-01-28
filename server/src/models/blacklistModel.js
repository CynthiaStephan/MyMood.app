const User = require('./userModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');

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

const Blacklist = sequelize.define('Blacklist', {
  blacklist_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: 'blacklist',
  timestamps: false
});

User.belongsToMany(User, {
  through: Blacklist,
  as: 'Supervisors',
  foreignKey: 'trainee_id',
  otherKey: 'supervisor_id'
});

User.belongsToMany(User, {
  through: Blacklist,
  as: 'Trainees',
  foreignKey: 'supervisor_id',
  otherKey: 'trainee_id'
});

module.exports = Blacklist;

