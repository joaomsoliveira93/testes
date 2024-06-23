const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class Experience extends Model {}

Experience.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company:{
        type: DataTypes.STRING,
      allowNull: false,
    },
    city:{
        type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    started: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ended: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Experience',
  },
);

Experience.belongsTo(Profile, { foreignKey: 'profileId' });
Experience.belongsTo(User, { foreignKey: 'addedBy' });
Experience.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Experience;