const mysql=require("mysql2")
const { Sequelize } = require("sequelize")

//connecting to database
const sequelizeConnection=new Sequelize("chatapp","root","avinashaman9977@",{
    dialect:"mysql",
    host:"localHost"
})
// console.log(sequelizeConnection)

module.exports=sequelizeConnection


