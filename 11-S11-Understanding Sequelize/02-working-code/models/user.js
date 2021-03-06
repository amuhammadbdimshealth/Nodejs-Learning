//id, name, email
const Sequelize = require('sequelize/index');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true    
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;