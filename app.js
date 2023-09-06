const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// mongoose db connectior
const mongoose = require("mongoose");

require("dotenv").config();

const noteRoutes = require("./routes/note");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(noteRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    app.listen(8888);
    console.log("Connected to MongoDB and running on port:8888");
  })
  .catch((err) => {
    console.log(err);
  });
