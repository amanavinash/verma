const jwt = localStorage.getItem("jwtKey");
const user_name = localStorage.getItem("user_name");
const user_id = localStorage.getItem("user_id");
const user_email = localStorage.getItem("user_email");

//checking is user logout or bot
if (!jwt) {
  const respose = confirm(
    "user logout since jwtKey not in loaclstorage ,would you like to login or signup"
  );
  if (respose) {
    window.location = "../index.html";
  }
  //   return;
} else {
  const submit_btn = document.getElementById("send_button");
  submit_btn.addEventListener("click", async () => {
    saveChat();
    async function saveChat() {
      console.log("chat send button clicked");
      try {
        const jwtKey = localStorage.getItem("jwtKey");
        if (jwtKey == null) {
          alert("user is logged out");
          return;
        }

        //save the message of user
        const message = document.getElementById("chat_input1");
        const resp = await axios.post(
          "http://localhost:4000/chat/chatSave",
          {
            message: message.value,
          },
          {
            headers: {
              Authorization: jwtKey,
            },
          }
        );
        console.log(resp);

        //display chat send by user in div
        const display_chat = document.getElementById("display_chat_div");
        // display_chat.scrollTop = display_chat.scrollHeight;
        // display_chat.scrollTop=display_chat.scrollHeight


        const new_Div = document.createElement("div");
        new_Div.innerHTML =  `<div><span>${message.value}</span></div>`;
        new_Div.className="main_user"
        display_chat.appendChild(new_Div);
        message.value ="";
      } catch (error) {
        console.log(error);
      }
    }
  });


//load chat data


const div=document.getElementById("display_chat_div");
div.innerText="chat"
window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    load_chat()
    async function load_chat() {
        try {
            const jwtKey = localStorage.getItem("jwtKey");

          const resp = await axios.post("http://localhost:4000/chat/chatData",{},{headers: {Authorization: jwtKey,},});
    
          console.log("chat data=", resp);
          // setChats(resp.data.data)
         const data_array=resp.data.data
         
         data_array.map((a)=>{
            const div=document.getElementById("display_chat_div");
         
 const newDiv=document.createElement("div")
newDiv.innerHTML=`<div><span>${a.message}</span></div>
<div><span>${a.user_email}</span></div>`
      
newDiv.scrollTop=newDiv.scrollHeight

const main_user_email=localStorage.getItem("user_email")
if(main_user_email==a.user_email){
    newDiv.className="main_user" 
}
else{
    newDiv.className="other_user" 
}




div.appendChild(newDiv)

})



        } catch (error) {
          alert("frontend error ,see in console");
          console.log(error);
        }
      };
  });
}

