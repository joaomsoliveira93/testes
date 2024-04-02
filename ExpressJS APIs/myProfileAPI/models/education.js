const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class Education extends Model {}

Education.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
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
    modelName: 'Education',
  },
);

Education.belongsTo(Profile, { foreignKey: 'profileId' });
Education.belongsTo(User, { foreignKey: 'addedBy' });
Education.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Education;
