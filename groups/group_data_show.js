const group_list_menu_div = document.getElementById("group-list-div");
// const group_creating_btn = document.getElementById("group_creating_btn");

//load group which is member of that group
const user_id1 = localStorage.getItem("user_id");
const user_email1 = localStorage.getItem("user_email");
const jwtKey1 = localStorage.getItem("jwtKey");

// //load chat data

const div = document.getElementById("display_chat_div");
// div.innerText = "hello";
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  //# load user related data
  load_user_related_group();
  async function load_user_related_group() {
    const resp = await axios.post(
      "http://localhost:4000/group/users_group",
      {
        data: {
          user_id: user_id1,
          user_email: user_email1,
        },
      },
      {
        headers: {
          Authorization: jwtKey1,
        },
      }
    );

    console.log("group details", resp);
    const group_list = resp.data.data[0].groups;
    console.log("group_list", group_list);
    //# showing all group using map loop

    group_list.map((d) => {
      //# checking data is releted to user or to group
      //why-so now i have decided to show user individual message and group will show in same list
      //logic-so individual user does note have super_admin relate key so i can identify
      if (d.super_admin_email != "" || d.super_admin_email) {
        // alert("this is group");
      } else {
        return;
      }

      //setting for group

      const div1 = document.createElement("div");
      const btn1 = document.createElement("button");
      div1.appendChild(btn1);
      group_list_menu_div.appendChild(div1);

      btn1.id = `group_btn${d.id}`;

      //button part
      btn1.innerText = d.name;
      btn1.addEventListener("click", () => {
        //# save group id in loacal host
        localStorage.setItem("group_id", d.id);

        const group_id_from_localstorage = localStorage.getItem("group_id");

        //# group name display
        const display_outer_chat_div1 = document.getElementById("display_name");
        display_outer_chat_div1.innerText = "";

        const group_name_div = document.createElement("div");
        display_outer_chat_div1.appendChild(group_name_div);

        group_name_div.innerText = d.name;
        group_name_div.style.textAlign = "center";

        // # setting for group ,it apperar with the group s clicked
        const group_functions_div = document.createElement("div");
        display_outer_chat_div1.appendChild(group_functions_div);

        const member_div = document.createElement("button");
        const setting = document.createElement("button");

        group_functions_div.appendChild(member_div);
        group_functions_div.appendChild(setting);

        //////////////////// GROUP member list PART  START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        member_div.className = "group_member_list_class";
        member_div.innerText = "member list";
        member_div.addEventListener("click", async () => {
          const display_outer_chat_div1 =
            document.getElementById("display_name");
          const member_list_display_div = document.createElement("div");
          display_outer_chat_div1.appendChild(member_list_display_div);
          // display_outer_chat_div1.innerText="hfgh"

          //css part
          display_outer_chat_div1.style.position = "relative";
          member_list_display_div.style.position = "absolute";
          member_list_display_div.style.top = "50px";
          member_list_display_div.style.top = "50px";

          //css part can be remove
          member_list_display_div.style.backgroundColor = "white";
          member_list_display_div.style.width = "250px";
          member_list_display_div.style.minHeight = "300px";
          member_list_display_div.style.borderRadius = "10px";

          member_list_display_div.style.right = "55px";

          //working div is member_list_display_div
          //why this->so i can user it again other place whewr i doesnot have to change all but just change working div value
          const working_div = member_list_display_div;
          working_div.style.padding = "10px";
          //close button
          const close_button_div = document.createElement("div");
          const close_button = document.createElement("button");
          close_button.innerText = "X";
          close_button_div.appendChild(close_button);
          close_button_div.style.display = "flex";
          close_button_div.style.justifyContent = "end";

          working_div.appendChild(close_button_div);
          close_button.addEventListener("click", () => {
            working_div.remove();
          });

          //# fetch group member list
          const group_id = localStorage.getItem("group_id");

          const resp = await axios.post(
            `http://localhost:4000/group/group_data?x=${group_id}`,
            {
              data: {
                user_id: user_id1,
                user_email: user_email1,
              },
            },
            {
              headers: {
                Authorization: jwtKey1,
              },
            }
          );

          console.log("member_list", resp);
          const data_arry = resp.data.data[0].users;
          console.log(data_arry);
          data_arry.map((data) => {
            const display_div = document.createElement("div");

            console.log(data.email, localStorage.getItem("user_email"));

            if (localStorage.getItem("user_email") == data.email) {
              if (data.groups_and_members_jn.admin == true) {
                display_div.innerText =
                  "you" + " " + data.email + " " + "admin";
              } else {
                display_div.innerText = "You" + " " + data.email;
              }
            } else if (data.groups_and_members_jn.admin == true) {
              display_div.innerText =
                data.name + " " + data.email + " " + "admin";
            } else {
              display_div.innerText = data.name + " " + data.email;
            }
            working_div.appendChild(display_div);
          });

          // end
        });

        //////////////////// GROUP member list PART  END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        //////////////////// GROUP SETTING PART  START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        setting.innerText = "setting";
        setting.className = "group_setting_class";
        setting.addEventListener("click", async () => {
          const display_outer_chat_div1 =
            document.getElementById("display_name");
          const setting_display_div = document.createElement("div");
          display_outer_chat_div1.appendChild(setting_display_div);
          // display_outer_chat_div1.innerText="hfgh"

          //css part
          display_outer_chat_div1.style.position = "relative";
          setting_display_div.style.position = "absolute";
          setting_display_div.style.top = "50px";

          //css part can be remove
          setting_display_div.style.backgroundColor = "white";
          setting_display_div.style.minWidth = "400px";
          setting_display_div.style.minHeight = "300px";
          setting_display_div.style.borderRadius = "10px";
          setting_display_div.style.right = "55px";

          //working div is member_list_display_div
          //why this->so i can user it again other place whewr i doesnot have to change all but just change working div value
          const working_div = setting_display_div;
          working_div.style.padding = "10px";
          //close button
          const close_button_div = document.createElement("div");
          const close_button = document.createElement("button");
          close_button.innerText = "X";
          close_button_div.appendChild(close_button);
          close_button_div.style.display = "flex";
          close_button_div.style.justifyContent = "end";

          working_div.appendChild(close_button_div);
          close_button.addEventListener("click", async () => {
            working_div.remove();
          });

          async function delete_group() {
            const delete_group_btn = document.createElement("button");
            delete_group_btn.innerText = "delete group";
            working_div.appendChild(delete_group_btn);
          }

          function check_user_is_member_or_not(data_obj) {
            //logic- so the api request has respose where user detais object array also in respond, so check that the user is admin
            //or not by passing the user_data object passing as argument
            let x = false;
            if (localStorage.getItem("user_email") == data_obj.email) {
              if (data_obj.groups_and_members_jn.admin == true) {
                x = true;
                console.log(data_obj, "if");
              }
            }

            console.log(data_obj, "not if");
            return x;
          }

          //permission area

          const group_id = localStorage.getItem("group_id");

          const resp = await axios.post(
            `http://localhost:4000/group/group_data?x=${group_id}`,
            {
              data: {
                user_id: user_id1,
                user_email: user_email1,
              },
            },
            {
              headers: {
                Authorization: jwtKey1,
              },
            }
          );

          console.log("member_list", resp);
          const data_arry = resp.data.data[0].users;
          // console.log(data_arry);
          data_arry.map(async (data) => {
            if (check_user_is_member_or_not(data) == true) {
              delete_group();

              const resp = await axios.post(
                `http://localhost:4000/group/group_data?x=${group_id}`,
                {
                  data: {
                    user_id: user_id1,
                    user_email: user_email1,
                  },
                },
                {
                  headers: {
                    Authorization: jwtKey1,
                  },
                }
              );

              const data_arry = resp.data.data[0].users;
              console.log(data_arry);
              data_arry.map((data) => {
                const display_div = document.createElement("div");

                console.log(data.email, localStorage.getItem("user_email"));

               
                  working_div.appendChild(display_div);
                  // if (data.groups_and_members_jn.admin == true) {
                  //   display_div.innerText =
                  //     "you" + " " + data.email + " " + "admin";
                  // } else {
                  //   display_div.innerText = "You" + " " + data.email;
                  // }


                 

                  //show name
                  const name_span_div = document.createElement("span");
                  display_div.appendChild(name_span_div);


                  if (localStorage.getItem("user_email") == data.email) {
                    name_span_div.innerText =
                    "you" + " | " + data.email + " ";
                  }
                  else{
                    name_span_div.innerText =
                    data.name + " | " + data.email + " ";
                  }
                

                  const remove_member_from_group =
                    document.createElement("button");

                  //id of junction of user and member
                  remove_member_from_group.id =
                    "btn" + data.groups_and_members_jn.id;

                  display_div.appendChild(remove_member_from_group);
   
            //custom remove button for logeed user
                  if (localStorage.getItem("user_email") == data.email) {
                    remove_member_from_group.innerText = "exit from this group";

                  }
                  else{
                    remove_member_from_group.innerText = "remove from group";

                  }

                  const new_line = document.createElement("br");
                  display_div.appendChild(new_line);

                  remove_member_from_group.addEventListener(
                    "click",
                    async (e) => {
                      
                    const member_id=e.target.id
                    const final_member_id=member_id.slice(3)
// alert(final_member_id)
// console.log(final_member_id)

                      const resp = await axios.post(
                        `http://localhost:4000/group/group_member_delete?x=${group_id}`,
                        {
                          data: {
                            user_id: user_id1,
                            group_id: group_id,
                            member_id:final_member_id,
                          },
                        },
                        {
                          headers: {
                            Authorization: jwtKey1,
                          },
                        }
                      );



// console.log(resp)
console.log("member removing from group",resp)
if(resp.data.status==true){
alert(resp.data.message);
console.log("member removing from group",resp.data.message)

}
else{
  alert(resp.data.message);
console.log("member removing from group",resp.data.message)
}



                    }
                  );
                }
              );
            }
          });
        });

        //////////////////// GROUP SETTING PART  END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        //#load all data when user swith to any group then load chat data of that group
        //first clear the div then load (if not do this then it also show prvious froup chat also)
        const div = document.getElementById("display_chat_div");
        div.innerHTML = "";
        load_chat(group_id_from_localstorage);

        //# sending group message to sever/backend in object
      });
    });
  }

  //LOAD CHAT DATA
  // load_chat(localStorage.getItem("group_id"));
  async function load_chat(group_id_param) {
    try {
      const jwtKey = localStorage.getItem("jwtKey");

      const resp = await axios.post(
        "http://localhost:4000/group/group_chat_data",
        {
          group_id: group_id_param,
          status: false,
        },
        { headers: { Authorization: jwtKey } }
      );

      console.log("group chat data fetch sucessfully=", resp);
      // setChats(resp.data.data)
      const data_array = resp.data.data;
      //#render/show group chat data
      data_array.map((a) => {
        console.log("param of map loop", a);
        const div = document.getElementById("display_chat_div");
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `<div><span>${a.message}</span></div>
                          <div><span>${a.userId}</span></div>`;

        const main_user_email = localStorage.getItem("user_email");
        const main_user_id = localStorage.getItem("user_id");

        if (main_user_id == a.userId) {
          newDiv.className = "main_user";
        } else {
          newDiv.className = "other_user";
        }

        div.appendChild(newDiv);
      });
    } catch (error) {
      alert("frontend error ,see in console");
      console.log(error);
    }
  }
});

const submit_btn = document.getElementById("send_button");
submit_btn.addEventListener("click", async () => {
  alert("ok");
  saveChat();
  console.log("data is send");
  async function saveChat() {
    const group_message_save_data = {};
    group_message_save_data.group_id = localStorage.getItem("group_id");
    console.log("chat send button clicked");
    try {
      const jwtKey = localStorage.getItem("jwtKey");
      if (jwtKey == null) {
        alert("user is logged out");
        return;
      }

      //save the message of user
      const message = document.getElementById("chat_input1");
      if (message.value == "") {
        alert("input field is empty");
        return;
      }

      group_message_save_data.message = message.value;
      group_message_save_data.sender_user_id = localStorage.getItem("user_id");

      console.log("final data id=", group_message_save_data);

      const resp = await axios.post(
        "http://localhost:4000/group/save_group_chat",
        {
          data: group_message_save_data,
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
      new_Div.innerHTML = `<div><span>${message.value}</span></div>`;
      new_Div.className = "main_user";
      display_chat.appendChild(new_Div);
      message.value = "";
    } catch (error) {
      console.log(error);
      alert("error in front side see the error in console");
    }
  }
});
