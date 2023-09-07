const { validationResult } = require("express-validator");

const Note = require("../models/note");

exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong!",
      });
    });
};

exports.createNotes = (req, res, next) => {
  const { title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }

  Note.create({
    title,
    content,
  })
    .then((_) => {
      return res.status(201).json({
        message: "A New Note Was Created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something Went Wrong!",
      });
    });
};

exports.getNote = (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something Went Wrong!",
      });
    });
};

exports.deleteNote = (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(() => {
      return res.status(204).json({
        message: "Note was deleted successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something Went Wrong!",
      });
    });
};

exports.getOldNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something Went Wrong!",
      });
    });
};

exports.updateNote = (req, res, next) => {
  const { note_id, title, content } = req.body;

  Note.findById(note_id)
    .then((note) => {
      note.title = title;
      note.content = content;
      return note.save();
    })
    .then(() => {
      return res.status(200).json({
        message: "Note has been updated!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something Went Wrong!",
      });
    });
};
