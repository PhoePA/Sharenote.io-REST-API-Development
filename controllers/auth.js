const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");
const { Error } = require("mongoose");

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

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed!",
        errorMessages: errors.array(),
      });
    }
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(401).json({
        message: "Email Does Not Exist!",
      });
    }
    const isMatch = bcrypt.compareSync(password, userDoc.password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong User credential!",
      });
    }
    const token = jwt.sign(
      { email: userDoc.email, userId: userDoc._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, userId: userDoc._id, user_mail: userDoc.email });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};

exports.checkStatus = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "User is not Authenticated!" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const tokenMatch = jwt.verify(token, process.env.JWT_KEY);
    if (!tokenMatch) {
      return res.status(401).json({ message: "User is not Authenticated!" });
    }
    req.userId = tokenMatch.userId;
    res.json("OK");
    next();
  } catch (err) {
    return res.status(401).json({ message: "User is not Authenticated!" });
  }
};
