const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: null
  }
}, {
  defaultScope: {
    attributes: {
      exclude: ['hash']
    }
  },
  scopes: {
    withHash: {
      attributes: {}
    }
  }
});

module.exports = User;