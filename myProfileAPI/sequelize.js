const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.mssql.database, config.mssql.user, config.mssql.password, {
  host: config.mssql.server,
  dialect: 'mysql', 
});

module.exports = sequelize;