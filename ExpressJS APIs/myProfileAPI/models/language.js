const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class Language extends Model {}

Language.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listening: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    production: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Language',
  },
);

Language.belongsTo(Profile, { foreignKey: 'profileId' });
Language.belongsTo(User, { foreignKey: 'addedBy' });
Language.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Language;
