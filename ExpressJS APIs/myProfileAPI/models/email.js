const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class Email extends Model {}

Email.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Email',
  },
);

Email.belongsTo(Profile, { foreignKey: 'profileId' });
Email.belongsTo(User, { foreignKey: 'addedBy' });
Email.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Email;
