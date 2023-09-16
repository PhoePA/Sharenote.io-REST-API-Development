const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// mongoose db connectior
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();
const multer = require("multer");

const noteRoutes = require("./routes/note");
const authRoutes = require("./routes/auth");

const app = express();

const storageConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "_" + file.originalname);
  },
});
const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(
  multer({ storage: storageConfigure, fileFilter: filterConfigure }).single(
    "cover_image"
  )
);
app.use(cors());

app.use(noteRoutes);
app.use(authRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    app.listen(8888);
    console.log("Connected to MongoDB and running on port:8888");
  })
  .catch((err) => {
    console.log(err);
  });
