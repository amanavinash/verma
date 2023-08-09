
const jwt=localStorage.getItem("jwtKey")
const user_name=localStorage.getItem("user_name")
const user_id=localStorage.getItem("user_id")
const user_email=localStorage.getItem("user_email")

//checking is user logout or bot
if(!jwt){
  const respose=  confirm("user logout since jwtKey not in loaclstorage ,would you like to login or signup")
  if(respose){window.location="../index.html"}
//   return;
}
else{
    //user info show on dashboard
    alert(`welcome to chatApp ${user_name}`)
    const display_user_name=document.getElementById("display_user_name");
    display_user_name.innerText=user_name
}

const logout_button=document.getElementById("logout_button");
logout_button.addEventListener("click",()=>{
    
localStorage.removeItem("jwtKey")
localStorage.removeItem("user_name")
localStorage.removeItem("user_id")
localStorage.removeItem("user_email") 
window.location="../index.html"

})