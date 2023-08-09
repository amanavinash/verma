const chat=require("../models/chat1");
module.exports.saveMessage=async (req,res)=>{
const recivedMessage=req.body.message;
const user_email=req.user.email;
try {
    if(recivedMessage==null){
        
    res.status(200).json({message:"please send message",status:false});
    return;
    }
    const insert_data=await chat.create(
        {
        message:recivedMessage,
        user_email:user_email
        }
    )
    
    res.status(200).json({message:"ok",status:true})
} catch (error) {
    console.log(error)
    res.status(200).json({message:"error in backend",error:error,status:false})
}

}
module.exports.sendChatData=async (req,res)=>{

try {
    const getdata= await chat.findAll()
    res.status(200).json({data:getdata,message:"done",status:true})
    
      
} catch (error) {
    res.status(200).json({error:error,message:"error in backend",status:false})
}

}

