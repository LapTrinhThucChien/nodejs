const Sequelize = require('sequelize');
const config = require('./../config.json');

const { host, user, password, database } = config.database

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    dialect: 'mysql',
    host
  }
)

module.exports = sequelize;