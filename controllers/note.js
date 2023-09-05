const { validationResult } = require("express-validator");

exports.getNotes = (req, res, next) => {};

exports.createNotes = (req, res, next) => {
  const { title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }
  res.status(201).json({
    message: "A New Note Was Created",
    data: {
      title,
      content
    }
  })
};
