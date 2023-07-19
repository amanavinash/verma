const jwt = localStorage.getItem("jwtKey");
if (!jwt) {
  const respose = confirm(
    "user logout"
  );
  if (respose) {
    window.location = "../index.html";
  }
} 