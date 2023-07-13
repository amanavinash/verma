let from = document.getElementById("signUp").addEventListener("submit", SignUp);

async function SignUp(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let password = e.target.password.value;
  let phonenumber = e.target.phonenumber.value;
  let obj = {
    name,
    email,
    password,
    phonenumber
  };
  try {
    const res = await axios.post("http://localhost:4000/user/sign", obj);
    
    alert("User Signed Up");
    window.location.reload();
    console.log(res);
  } catch (error) {
   alert("User alredy exist");
    


  }
}
