const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");
exports.register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed!",
      errorMessages: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  // console.log(username, email, password);
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // console.log("Password has hashed", hashedPassword);
      return User.create({
        username,
        email,
        password: hashedPassword,
      });
    })
    .then((result) => {
      res.status(201).json({
        message: "User was created!",
        userId: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: "Something Went Worng!",
      });
    });
};
