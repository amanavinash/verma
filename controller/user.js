const db_user=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
module.exports.sign_up=async (req,res)=>{
const name=req.body.user_name
const email=req.body.user_email
const password=req.body.user_password;
const mobile=req.body.user_mobile
try {
// const user=await db_user.findAll({where:{email:email}})s
const salt=10
const encrypted_password= await bcrypt.hash(password,salt)
const db_resp=await db_user.create({name:name,password:encrypted_password,email:email,mobile:mobile})
res.json({status:true,message:"user signup sucessfull"})
} catch (err) {
    res.json({error:err,status:false})
    console.log(err)
}
}
module.exports.login=async(req,res)=>{
    const email=req.body.user_email
    const password=req.body.user_password;
  if(!email || !password) {
    res.json({message:"please fill email and password ",staus:false})
  }
    try {
        const user=await db_user.findAll({where:{email:email}})
        if(user.length==0)
        { res.json({message:"please singup ",staus:false})
            return; 
        }
        else{
     //compare
            const user_id=user[0].dataValues.id
            const encrypted_password_db=user[0].dataValues.password;
            const user_name=user[0].dataValues.name;
            const user_email=user[0].dataValues.email;
     bcrypt.compare(password,encrypted_password_db,(err,resp)=>{
if(resp){
    //  generate jwt token
  
  //generate secret key
    const secretKey="aman"
const token=jwt.sign({id:user_id,email:email},secretKey)
    res.json({message:"user login sucessful",status:true,jwtKey:token,user_name:user_name,user_id:user_id,user_email:user_email})
}
else{
    res.json({message:"password not match",staus:false})

}
     })  }
    } catch (err) {
        res.json({error:err,status:false})
        console.log(err)
    }
}
module.exports.all_user_list=async (req,res)=>{
    try{
        const get_data=await db_user.findAll({attributes:["id","name","mobile","email"]} )
        res.status(200).json({message:"ok",status:true,data:get_data})
    } catch (error) {
        console.log(error)
        res.status(200).json({message:"error in backend",error:error,status:false})
    }
    
    }