const User = require("../Model/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber
    const password = req.body.password;
    const salt = 10;
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(err);
      const newUser = await User.create({ name, email, phonenumber, password: hash });
      res.status(200).json({ data: newUser });  
    });
  } catch (err) {
   console.log("err:", err);
   return res.status(400).json({
    success: false,
    message: "already user exist",
    error: err,
  });
      
  }
};
// const generateAccessToken = (id, name) => {
//   return jwt.sign({ userId: id, name: name,  },'aman' );
// };
// exports.login = async (req, res, next) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const Founduser = await User.findAll({
//       where: {  email },
//     });
//     if (Founduser === null) {
//       return res.status(404).json({ msg: "User does  not exist" });
//     } else {
//       console.log( Founduser[0].password);
//       bcrypt.compare(password, Founduser[0].password, (err, response) => {
//         if (err) {
//           return res.json({ success: false, message: "Something Went Wrong" });
//         }
//         if (response) {
//           Founduser[0].id,
//             res.status(200).json({ success: true,message: Founduser,token: generateAccessToken( Founduser[0].id, Founduser[0].name, Founduser[0].ispremiumuser),
//             });
//         }
//       });
//     }
//   } catch (err) {
//     console.log("err:", err);
//   }
// };