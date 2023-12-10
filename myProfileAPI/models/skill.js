const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class Skill extends Model {}

Skill.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Skill',
  }
);

Skill.belongsTo(Profile, { foreignKey: 'profileId' });
Skill.belongsTo(User, { foreignKey: 'addedBy' });
Skill.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Skill;