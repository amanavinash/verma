const memeber_list = document.getElementById("member");
const group_creating_btn = document.getElementById("group_creating_btn");

//logout
const logout_button = document.getElementById("logout_button");
logout_button.addEventListener("click", () => {
  localStorage.removeItem("jwtKey");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_email");
  window.location = "../index.html";
});

group_creating_btn.addEventListener("click", () => {
  console.log(memeber_list.value);
});

//group info
const group_info_obj = {};

//crete group form div in fixed
const create_group_button = document.getElementById("Create-New-Group");
create_group_button.addEventListener("click", async () => {
  const html_body = document.getElementById("body");
  html_body.style.position = "relative";

  //////////////creating a new oter div\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const new_outer_div = document.createElement("div");
  html_body.appendChild(new_outer_div);
  new_outer_div.id = "new_outer_div";

  // new_outer_div.style.backgroundColor="white";
  // new_outer_div.style.position="fixed";
  // new_outer_div.style.position="absolute";
  // new_outer_div.style.top="20%";
  // new_outer_div.style.left="20%";
  // new_outer_div.style.padding="10px"
  // new_outer_div.style.boxShadow="rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px";

  //////////////creating a new oter div close button \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const new_outer_div_close_btn = document.createElement("button");
  new_outer_div_close_btn.id = "new_outer_div_close_btn";
  new_outer_div_close_btn.innerText = "X";
  new_outer_div_close_btn.style.textAlign = "center";
  new_outer_div_close_btn.addEventListener("click", () => {
    new_outer_div.remove();
  });
  new_outer_div_close_btn;
  new_outer_div.appendChild(new_outer_div_close_btn);

  //////////////creating a input part which  group name \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const input_div_group_name = document.createElement("div");
  const input = document.createElement("input");
  input.id = "input_group_name";
  input.placeholder = "group Name";
  input_div_group_name.appendChild(input);
  new_outer_div.appendChild(input_div_group_name);

  //////////////creating select member  outer div part \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const select_member_outer_div = document.createElement("div");

  select_member_outer_div.id = "select_member_outer_div";
  new_outer_div.appendChild(select_member_outer_div);

  //////////////creating select member part \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const select_member = document.createElement("div");
  select_member_outer_div.appendChild(select_member);
  select_member.id = "select_member";

  //api alling all user list
  const jwtKey = localStorage.getItem("jwtKey");
  const resp = await axios.get("http://localhost:4000/user/All_user_list", {
    headers: {
      Authorization: jwtKey,
    },
  });
  console.log("user list", resp);

  const data_array = resp.data.data;
  let x = 0;
  //creating user_group in object
  const super_admin_user_email= localStorage.getItem("user_email");
  const user_group_object = {};
  const inpu_value = document.getElementById("input_group_name");
  user_group_object.super_Admin =super_admin_user_email
  user_group_object.name = inpu_value.value;
  user_group_object.members = {};
  const members = user_group_object.members;

  data_array.map((data) => {
//hinding the user who creating the group from adding member list
if(super_admin_user_email==data.email){
  // alert("same user exist also in the list");
  
return;
}

    const outer_div = document.createElement("div");

    const text = document.createElement("span");
    const add_button = document.createElement("button");

    text.innerText = "" +data.name+" "+data.email+" "+ data.mobile;
    add_button.innerText = "add";

    outer_div.appendChild(text);
    outer_div.appendChild(add_button);

    select_member.appendChild(outer_div);

    add_button.addEventListener("click", () => {
      add_button.style.display = "none";
      const admin_button = document.createElement("button");
      admin_button.innerText = "make admin";
      outer_div.appendChild(admin_button);

      let x = 1;

      const delete_button = document.createElement("button");
      delete_button.innerText = "delete";
      outer_div.appendChild(delete_button);

      admin_button.addEventListener("click", () => {
        if (x == 1) {
          members[id].admin = "true";
          admin_button.innerText = "delete from admin";
          x = 0;
        }
        //delete from admin
        else {
          members[id].admin = "false";
          admin_button.innerText = "make admin";
          x = 1;
        }
      });

      delete_button.addEventListener("click", () => {
        members[id].adding = "false";
        add_button.style.display = "inline";
        delete_button.remove();
        admin_button.remove();
        console.log(user_group_object);
        members[id].admin = "false";
      });

      const id = data.id;
      members[id] = { id: id, admin: false, adding: true };
      console.log(user_group_object);
      // console.log(members,x)
    });
  });

  /////////////////////// save button  \\\\\\\\\\\\\\\\\\\\\\\\\\
  const save = document.createElement("button");
  new_outer_div.appendChild(save);
  save.innerText = "save";
  save.addEventListener("click", async () => {
    const group_name = document.getElementById("input_group_name");



    user_group_object.name = group_name.value;
    console.log(user_group_object);


//alert if not any memeber is selected in creating group
if(Object.keys(user_group_object).length==0){
  alert("group object is empty")

  return;
}
else if(user_group_object.name==""){
  alert("group name is empty");
  return;
}
else if(Object.keys(user_group_object.members).length==0){
  alert("member is not added so please add atleast two or more member");
  return;
}

    const resp = await axios.post(
      "http://localhost:4000/group/group_create",
      { 
        group_data: user_group_object,
      },
      {
        headers: {
          Authorization: jwtKey,
        },
      }
    );
console.log(Object.keys(user_group_object.members),"group object keys")
    console.log(resp)
    alert(resp.data.message)
  });

  //////////////creating selected member part \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const selected_member = document.createElement("div");
  // select_member_outer_div.appendChild(selected_member);
  selected_member.id = "selected_member";
});
