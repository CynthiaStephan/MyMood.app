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
        defaultValue: 'trainee',
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

// Associations
User.associate = () => {
    // User ↔ Cohort (Many-to-Many via CohortUser)
    User.belongsToMany(Cohort, { through: CohortUser, foreignKey: 'id_user' });

    // User ↔ MoodScore (One-to-Many)
    User.hasMany(MoodScore, { foreignKey: 'id_user' });

    // User ↔ User (Blacklist Many-to-Many via Blacklist)
    User.belongsToMany(User, { as: 'Blocked', through: Blacklist, foreignKey: 'id_user', otherKey: 'id_user' });
};

module.exports = User;

