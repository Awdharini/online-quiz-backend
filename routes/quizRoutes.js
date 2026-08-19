const express = require("express");

const Quiz = require("../models/Quiz");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL QUIZZES

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("creator", "name")
      .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quizzes",
    });
  }
});

// GET SINGLE QUIZ

router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("creator", "name");

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quiz",
    });
  }
});

// CREATE QUIZ

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({
        message: "Title and questions are required",
      });
    }

    const quiz = await Quiz.create({
      title,

      description,

      creator: req.userId,

      questions,
    });

    res.status(201).json({
      message: "Quiz created successfully",

      quiz,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create quiz",
    });
  }
});

module.exports = router;
