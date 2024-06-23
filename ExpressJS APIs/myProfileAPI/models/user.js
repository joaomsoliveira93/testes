const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addedBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  updatedBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = User;