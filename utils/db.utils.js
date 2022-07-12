const { DataTypes, Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 941026,
  port: 5432,
  logging: false,
  database: 'mealsProyect',
});

module.exports = { DataTypes, db };
