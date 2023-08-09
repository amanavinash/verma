require("dotenv").config()
const cors=require("cors")
const express =require("express")
const db=require("./database/db.js")
const user=require("./models/user.js")
const chat1_module=require("./models/chat1.js")
const userRoute=require("./routes/user.js")
const chat1Route=require("./routes/chat1.js")
const group=require("./routes/group_route.js")
const app=express()
const PORT=process.env.PORT||4200;
app.use(cors()) ;
app.use(express.json())
app.use("/user",userRoute)
app.use("/chat",chat1Route)
app.use("/group",group)
const group_db=require("./models/group_db.js")
const group_user_junction=require("./models/grup_user_juntion.js")
const group_messages=require("./models/group_messge_db_model.js") 
user.hasMany(group_db,{foreignKey:"user_super_admin"})
group_db.belongsToMany(user,{through:group_user_junction})
group_db.belongsTo(user,{foreignKey:"user_super_admin"})
user.belongsToMany(group_db,{through:group_user_junction})
user.hasMany(group_messages);
group_messages.belongsTo(user);
group_db.hasMany(group_messages);
group_messages.belongsTo(group_db);
chat1_module.hasMany(user);
user.belongsTo(chat1_module)
db.sync()
.then((data)=>{
console.log("data connected sucessful")
app.listen(PORT,()=>{
    
    console.log('listen')
})

})
.catch((err)=>{
    console.log(err)
})



