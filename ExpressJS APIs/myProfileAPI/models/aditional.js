const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile'); 
const User = require('./user'); 

class Aditional extends Model {}

Aditional.init(
  {
    title: {
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
    modelName: 'Aditional',
  },
);

Aditional.belongsTo(Profile, { foreignKey: 'profileId' });
Aditional.belongsTo(User, { foreignKey: 'addedBy' });
Aditional.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Aditional;
