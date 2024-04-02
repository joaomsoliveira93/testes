const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./user');

class Profile extends Model {}

Profile.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Profile',
  },
);
Profile.belongsTo(User, { foreignKey: 'addedBy' });
Profile.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Profile;
