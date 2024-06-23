const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class Phone extends Model {}

Phone.init(
  {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Phone',
  }
);

Phone.belongsTo(Profile, { foreignKey: 'profileId' });
Phone.belongsTo(User, { foreignKey: 'addedBy' });
Phone.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = Phone;