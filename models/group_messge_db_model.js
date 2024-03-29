const { Sequelize } = require("sequelize");
const db_connection = require("../database/db.js");
const group_members = db_connection.define("groups_messages", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  message: { type: Sequelize.STRING, allowNull: false },

});
module.exports=group_members;