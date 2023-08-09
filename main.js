//append login or signupp using respective button
const display_div = document.getElementById("display_login");
const login_template = document.querySelector("#login_template");
const signup_template = document.getElementById("signup_template");

const login_button = document.getElementById("login_button");
const signup_button = document.getElementById("signup_button");

//login submit fubction functionality

login_button.addEventListener("click", () => {
  console.log(login_template);
  display_div.innerHTML = login_template.innerHTML;

  const login_btn = document.getElementById("login_submit_button");
  login_btn.addEventListener("click", () => {
    console.log("clicked on login submit button");
    const email_input = document.getElementById("login-email-input");
    const password_input = document.getElementById("login-password-input");
    console.log(email_input.value, password_input.value);

    //pre value that help in testing
    // email_input.value="a@b.c";
    // password_input.value="123";

    const email = email_input.value;
    const password = password_input.value;
    SubmitFun();
    async function SubmitFun() {
      //if input fild is empty then alerting
      if (!email || !password) {
        alert("input value is empty");
      }

      try {
        // callong login api
        const resp2 = await axios.post("http://localhost:4000/user/login", {
          user_email: email,
          user_password: password,
        });
        console.log(resp2);
        alert(resp2.data.message);


        const respObject = resp2.data;
        //setting jwt key in
        const jwtKey = respObject.jwtKey;
        localStorage.setItem("jwtKey", jwtKey);
        //saving user info in loaclstorage
        localStorage.setItem("user_name", respObject.user_name);
        localStorage.setItem("user_id", respObject.user_id);
        localStorage.setItem("user_email", respObject.user_email);

        console.log(respObject);
        console.log(jwtKey);

        if (resp2.data.status) {
        //   alert("go to dashboard");
        
        //redirect to dashobard page
        window.location="./dashboard/index.html"
        }
      } catch (error) {
        alert("front end error ,see in console");
        console.log("errot i login-", error);
      }
    }
  });
});

//
signup_button.addEventListener("click", () => {
  console.log("signup");

  display_div.innerHTML = signup_template.innerHTML;

  const signup_btn = document.getElementById("signup_submit_button");
  signup_btn.addEventListener("click", () => {
    console.log("clicked on sign submit button");

    // note - i have copy login input in signupup so dont confuse
    //these input target signup input
    const name = document.getElementById("login-name-input").value;
    const mobile = document.getElementById("login-number-input").value;
    const email = document.getElementById("login-email-input").value;
    const password = document.getElementById("login-password-input").value;
    /////////////////
    // function started
    SubmitFun();
    async function SubmitFun() {
      const resp2 = await axios.post("http://localhost:4000/user/signup", {
        user_name: name,
        user_email: email,
        user_password: password,
        user_mobile: mobile,
      });
      console.log(resp2);
      alert(resp2.data.message);
    }
  });
});
// display_div.innerHTML=login_template.innerHTML
// display_div.appendChild(login_template)
console.log(login_template.innerHTML);
