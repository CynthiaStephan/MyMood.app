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
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'mood_score',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

MoodScore.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(MoodScore, { foreignKey: 'user_id' });

module.exports = MoodScore;
