const group_model=require ("../models/group_db");
const group_and_user_junction=require("../models/grup_user_juntion");
const group_messages=require("../models/group_messge_db_model");
const users=require("../models/user");
const { compareSync } = require("bcrypt");
module.exports.group_create=async (req,res)=>{
const obj=req.body.group_data
const group_name=obj.name;
const super_admin_email=obj.super_Admin;
const member=obj.members;
try {
const user_details=await users.findAll({where:{email:super_admin_email}})
const user_data_obj=user_details[0].dataValues
const user_id=user_data_obj.id
const group_create=await group_model.create({
    name:group_name,
    logo:"image link",
    user_super_admin:user_id,
    super_admin_email:super_admin_email
})
const id_of_created_group=group_create.id

const add_member_in_group=async(group_id,user_id,is_admin,super_admin)=>{
return group_and_user_junction.create({
    groupId:group_id,
    userId:user_id,
    admin:is_admin,
    super_admin:super_admin // the person who ceated group
})
}
const add_super_admin=await add_member_in_group(id_of_created_group,user_id,true,true)
for (const property in member) {
   const member_obj=member[property];
   const member_id=member_obj.id
   const admin=member_obj.admin;
   const add_member=member_obj.adding
   console.log('add_member', add_member) ;

if(add_member){ const resp_add_member=await add_member_in_group(id_of_created_group,member_id,admin,false)
}
}
res.json({data:obj,message:"members is added",status:true})
} catch (error) {
    console.log(error);
    res.json({message:"error in backendend",status:false})
}
}

module.exports.group_data=async (req,res)=>{
try {
const query_obj=req.query.x
 const resp=await group_model.findAll({where:{id:query_obj},include:users})
console.log("*******************************************",resp)
res.json({data:resp})
} catch (error) {
    // console.log("from group_data in")
    res.json({data:error,message:"error in backend"})
console.log(error)
}
}

module.exports.users_related_group=async (req,res)=>{

    try {
const data=req.body.data;     
const user_id=data.user_id 
const resp=await users.findAll({where:{id:user_id},include:group_model,attributes:["name","email","id"]})
    res.json({data:resp,message:"user releted group is recived",status:true})
    } catch (error) {
        res.json({data:error,message:"error in backend",status:false})
    console.log(error)
    }
     }



module.exports.save_group_chat=async (req,res)=>{

try {
    
    const {group_id,message,sender_user_id}=req.body.data
const resp=await group_messages.create({
    message:message,
    groupId:group_id,
    userId:sender_user_id,
   
})

    res.json({message:"ok",data:resp,status:true})
} catch (error) {
    res.json({message:"backend error"})   
}

}


module.exports.group_chat_data=async (req,res)=>{

    try {
        const group_id=req.body.group_id
    const resp=await group_messages.findAll({where:{groupId:group_id}})
    
        res.json({message:"ok",data:resp,status:true})
    } catch (error) {
        res.json({message:"backend error"})   
    }
    
    }
  

module.exports.group_member_delete=async (req,res)=>{

    try {
const data_obj=req.body.data
const member_id=data_obj.member_id 
console.log(member_id);
const resp=await group_and_user_junction.destroy(
    {where:{id:member_id}})
res.json({message:"user removed ",data:resp,status:true})
    } catch (error) {
        console.log(error)
    res.json({message:"user not removed,may be backend error",data:error,status:false})

    }
}







