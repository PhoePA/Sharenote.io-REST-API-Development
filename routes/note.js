const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const noteController = require("../controllers/note");

//GET method
router.get("/notes", noteController.getNotes);

// POST method
router.post(
  "/create-notes",
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must have at least 3 characters!")
    .isLength({ max: 20 })
    .withMessage("Title is too long, please don't exceed 20 characters!"),
  body("content")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Content must have at least 2 characters!")
    .isLength({ max: 5000 })
    .withMessage("Content is too long, please don't exceed 5000 characters!"),
  noteController.createNotes
);

router.get("/notes/:id", noteController.getNote);
module.exports = router;