const jwt = require("jsonwebtoken");

module.exports.authenticate_user = (req, res, next) => {

  try {
    const token = req.header("Authorization");
    const tokendata = jwt.verify(token, "aman");
    console.log("tokendata-> email -", tokendata);
    req.user = tokendata;
    next();
  } catch (error) {
    res
      .status(200)
      .json({
        messge:
          "backend err",
      });
    
  }
};
