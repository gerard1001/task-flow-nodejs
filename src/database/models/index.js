"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../../config/database.config.js`)[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, {
    dialect: "postgres",
  });
} else {
  sequelize = new Sequelize(config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY! 🚀🚀🚀");
  })
  .catch((err) => {
    console.error("DATABASE  FAILED TO CONNECT! 🚨🚨🚨", err);
  });

module.exports = db;
