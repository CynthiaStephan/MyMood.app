const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cohort = sequelize.define('Cohort', {
  cohort_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'cohort',
  timestamps: false
});

module.exports = Cohort;