const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/is-auth");
const User = require("../models/user");
// POST / register
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a Valid Email Address!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail is already exists!");
          }
        });
      }),

    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username is too Short!")
      .isLength({ max: 20 })
      .withMessage("Username is too Long!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username is already exists!");
          }
        });
      }),

    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password is too Short!")
      .isLength({ max: 25 })
      .withMessage("Password is too Long!"),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Plese Enter a Valid Email Address!"),
    /*  .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("Email does not exist!");
          }
        });
      }),*/
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password is Incorrect!"),
  ],
  authController.login
);

// GET / status
router.get("/status", authController.checkStatus);
module.exports = router;
