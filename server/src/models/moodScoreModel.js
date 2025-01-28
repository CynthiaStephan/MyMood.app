const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');

const MoodScore = sequelize.define('MoodScore', {
  score_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'mood_score',
  timestamps: false
});

MoodScore.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(MoodScore, { foreignKey: 'user_id' });

module.exports = MoodScore;
