const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    content: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 5000,
    },
    author: {
      type: String,
      default: "Anonymous",
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteSchema);
module.exports = noteModel;
