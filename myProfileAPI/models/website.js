const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Profile = require('./profile');
const User = require('./user');

class WebSite extends Model {}

WebSite.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'WebSite',
  },
);

WebSite.belongsTo(Profile, { foreignKey: 'profileId' });
WebSite.belongsTo(User, { foreignKey: 'addedBy' });
WebSite.belongsTo(User, { foreignKey: 'updatedBy' });

module.exports = WebSite;
