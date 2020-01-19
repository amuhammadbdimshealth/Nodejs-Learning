// const Sequelize = require('sequelize');
const Sequelize = require("sequelize/index");

const sequelize = new Sequelize("node-complete", "root", "8352739", {
  dialect: "mysql",
  host: 'localhost'
});

module.exports = sequelize;