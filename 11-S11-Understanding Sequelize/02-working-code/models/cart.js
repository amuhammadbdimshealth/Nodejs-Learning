// Cart - Product n:m
// Cart - User 1:1

const Sequelize = require('sequelize/index');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

module.exports = Cart;