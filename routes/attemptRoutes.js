const express = require("express");

const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Attempts route is working",
  });
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      user: req.userId,
    })
      .populate("quiz", "title")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    console.error("Fetch attempts error:", error);

    res.status(500).json({
      message: "Failed to fetch attempts",
    });
  }
});

// CREATE QUIZ ATTEMPT

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers) {
      return res.status(400).json({
        message: "Quiz ID and answers are required",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    let score = 0;

    const processedAnswers = quiz.questions.map((question, index) => {
      const selectedAnswer = answers[index];

      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      }

      return {
        questionIndex: index,
        selectedAnswer: selectedAnswer || "",
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;

    const percentage =
      totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    const attempt = await QuizAttempt.create({
      user: req.userId,
      quiz: quizId,
      score,
      totalQuestions,
      percentage,
      answers: processedAnswers,
    });

    res.status(201).json({
      message: "Quiz attempt saved successfully",
      attempt,
    });
  } catch (error) {
    console.error("Quiz attempt error:", error);

    res.status(500).json({
      message: "Failed to save quiz attempt",
    });
  }
});

// GET USER'S QUIZ ATTEMPTS

router.get("/my-attempts", authMiddleware, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      user: req.userId,
    })
      .populate("quiz", "title")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quiz attempts",
    });
  }
});

module.exports = router;
