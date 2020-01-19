/**
 * orderId
 * prodId
 * userId
 * qty
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
})

module.exports = OrderItem;