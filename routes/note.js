const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const noteController = require("../controllers/note");

const authMiddleware = require("../middlewares/is-auth");
//GET method
router.get("/notes", noteController.getNotes);

// POST method
router.post(
  "/create-notes",
  authMiddleware,
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must have at least 3 characters!")
    .isLength({ max: 100 })
    .withMessage("Title is too long, please don't exceed 100 characters!"),
  body("content")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Content must have at least 2 characters!")
    .isLength({ max: 5000 })
    .withMessage("Content is too long, please don't exceed 5000 characters!"),
  noteController.createNotes
);

// GET / notes/ :id
router.get("/notes/:id", noteController.getNote);

// delete note
router.delete("/delete/:id", authMiddleware, noteController.deleteNote);

// GET / edit / :id
router.get("/edit/:id",  noteController.getOldNote);

// POST / edit
router.put("/edit", authMiddleware, noteController.updateNote);
module.exports = router;
