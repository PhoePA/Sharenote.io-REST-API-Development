const { model, schema, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema);

module.exports = userModel;
