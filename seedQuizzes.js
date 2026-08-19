const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Quiz = require("./models/Quiz");

const quizzes = [
  // =========================================
  // WORLD QUIZ
  // =========================================

  {
    title: "🌍 World Explorer 2026",

    description:
      "Test your knowledge of countries, geography, technology and the world around us.",

    questions: [
      {
        questionText: "Which is the largest continent by area?",

        options: ["Africa", "Asia", "Europe", "North America"],

        correctAnswer: "Asia",
      },

      {
        questionText: "What is the capital city of Japan?",

        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],

        correctAnswer: "Tokyo",
      },

      {
        questionText: "Which ocean is the largest?",

        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],

        correctAnswer: "Pacific Ocean",
      },

      {
        questionText: "Which country is famous for the Great Barrier Reef?",

        options: ["Australia", "Brazil", "India", "Canada"],

        correctAnswer: "Australia",
      },

      {
        questionText: "Which planet is known as the Red Planet?",

        options: ["Venus", "Mars", "Jupiter", "Mercury"],

        correctAnswer: "Mars",
      },

      {
        questionText: "Which country has the largest population in the world?",

        options: ["United States", "India", "Brazil", "Russia"],

        correctAnswer: "India",
      },

      {
        questionText:
          "Which organization is headquartered in New York and works on international cooperation?",

        options: ["United Nations", "World Bank", "NATO", "OPEC"],

        correctAnswer: "United Nations",
      },

      {
        questionText:
          "Which technology is commonly associated with decentralized digital ledgers?",

        options: ["Blockchain", "Bluetooth", "HTML", "GPS"],

        correctAnswer: "Blockchain",
      },

      {
        questionText: "Which country is home to the ancient city of Petra?",

        options: ["Egypt", "Jordan", "Greece", "Turkey"],

        correctAnswer: "Jordan",
      },

      {
        questionText: "Which is the smallest continent by land area?",

        options: ["Europe", "Australia", "South America", "Antarctica"],

        correctAnswer: "Australia",
      },
    ],
  },

  // =========================================
  // SCIENCE QUIZ
  // =========================================

  {
    title: "🔬 Basic Science Challenge",

    description:
      "A beginner-friendly science quiz covering physics, chemistry, biology and Earth science.",

    questions: [
      {
        questionText: "What is the basic unit of life?",

        options: ["Atom", "Cell", "Tissue", "Organ"],

        correctAnswer: "Cell",
      },

      {
        questionText: "What gas do humans need for respiration?",

        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],

        correctAnswer: "Oxygen",
      },

      {
        questionText: "What is H₂O commonly known as?",

        options: ["Oxygen", "Hydrogen", "Water", "Salt"],

        correctAnswer: "Water",
      },

      {
        questionText: "What force pulls objects toward Earth?",

        options: ["Friction", "Gravity", "Magnetism", "Pressure"],

        correctAnswer: "Gravity",
      },

      {
        questionText: "Which organ pumps blood through the human body?",

        options: ["Brain", "Lungs", "Heart", "Kidney"],

        correctAnswer: "Heart",
      },

      {
        questionText: "What is the boiling point of water at sea level?",

        options: ["50°C", "75°C", "100°C", "150°C"],

        correctAnswer: "100°C",
      },

      {
        questionText:
          "Which part of a plant usually absorbs water from the soil?",

        options: ["Leaf", "Flower", "Root", "Fruit"],

        correctAnswer: "Root",
      },

      {
        questionText: "Which planet is closest to the Sun?",

        options: ["Earth", "Venus", "Mercury", "Mars"],

        correctAnswer: "Mercury",
      },

      {
        questionText: "What is the chemical symbol for gold?",

        options: ["Ag", "Au", "Fe", "Go"],

        correctAnswer: "Au",
      },

      {
        questionText: "Which instrument is used to measure temperature?",

        options: ["Barometer", "Thermometer", "Hygrometer", "Speedometer"],

        correctAnswer: "Thermometer",
      },
    ],
  },

  // =========================================
  // SOCIAL SCIENCE QUIZ
  // =========================================

  {
    title: "👥 Society & Social Science",

    description:
      "Explore basic concepts from society, economics, history, government and human interaction.",

    questions: [
      {
        questionText:
          "What is the study of society and social relationships called?",

        options: ["Biology", "Sociology", "Physics", "Geology"],

        correctAnswer: "Sociology",
      },

      {
        questionText: "What is the basic unit of society?",

        options: ["Family", "Company", "School", "Government"],

        correctAnswer: "Family",
      },

      {
        questionText:
          "Which branch of economics studies individual consumers and firms?",

        options: [
          "Macroeconomics",
          "Microeconomics",
          "Geography",
          "Anthropology",
        ],

        correctAnswer: "Microeconomics",
      },

      {
        questionText: "What is democracy primarily based on?",

        options: [
          "Rule by one person",
          "Rule by citizens",
          "Rule by the military",
          "Rule by inheritance",
        ],

        correctAnswer: "Rule by citizens",
      },

      {
        questionText: "Which institution generally makes laws in a democracy?",

        options: ["Legislature", "Hospital", "University", "Bank"],

        correctAnswer: "Legislature",
      },

      {
        questionText: "What does GDP stand for?",

        options: [
          "General Development Process",
          "Gross Domestic Product",
          "Global Development Plan",
          "Government Domestic Policy",
        ],

        correctAnswer: "Gross Domestic Product",
      },

      {
        questionText: "Which subject studies human cultures and societies?",

        options: ["Anthropology", "Astronomy", "Chemistry", "Botany"],

        correctAnswer: "Anthropology",
      },

      {
        questionText: "What is migration?",

        options: [
          "Movement of people from one place to another",
          "Growth of plants",
          "Production of goods",
          "Change in weather",
        ],

        correctAnswer: "Movement of people from one place to another",
      },

      {
        questionText: "Which is an example of a renewable resource?",

        options: ["Coal", "Petroleum", "Solar energy", "Natural gas"],

        correctAnswer: "Solar energy",
      },

      {
        questionText: "What does education primarily help develop?",

        options: [
          "Knowledge and skills",
          "Only physical strength",
          "Only wealth",
          "Only entertainment",
        ],

        correctAnswer: "Knowledge and skills",
      },
    ],
  },

  // =========================================
  // MATHEMATICS QUIZ
  // =========================================

  {
    title: "🧮 Mathematics Master",

    description:
      "Challenge yourself with basic arithmetic, algebra, geometry and logical mathematics.",

    questions: [
      {
        questionText: "What is 15 + 27?",

        options: ["32", "42", "52", "38"],

        correctAnswer: "42",
      },

      {
        questionText: "What is 12 × 8?",

        options: ["86", "96", "108", "112"],

        correctAnswer: "96",
      },

      {
        questionText: "What is 144 ÷ 12?",

        options: ["10", "11", "12", "14"],

        correctAnswer: "12",
      },

      {
        questionText: "What is the square root of 81?",

        options: ["7", "8", "9", "10"],

        correctAnswer: "9",
      },

      {
        questionText: "What is 25% of 200?",

        options: ["25", "40", "50", "75"],

        correctAnswer: "50",
      },

      {
        questionText: "If x + 5 = 12, what is x?",

        options: ["5", "6", "7", "8"],

        correctAnswer: "7",
      },

      {
        questionText: "How many degrees are in a right angle?",

        options: ["45°", "90°", "180°", "360°"],

        correctAnswer: "90°",
      },

      {
        questionText: "What is the perimeter of a square with side 5 cm?",

        options: ["10 cm", "15 cm", "20 cm", "25 cm"],

        correctAnswer: "20 cm",
      },

      {
        questionText: "What is 2³?",

        options: ["4", "6", "8", "12"],

        correctAnswer: "8",
      },

      {
        questionText: "What is the average of 10, 20 and 30?",

        options: ["15", "20", "25", "30"],

        correctAnswer: "20",
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    // Create sample creator account

    let creator = await User.findOne({
      email: "quizmaster@example.com",
    });

    if (!creator) {
      const hashedPassword = await bcrypt.hash("QuizMaster123", 10);

      creator = await User.create({
        name: "QuizMaster Admin",

        email: "quizmaster@example.com",

        password: hashedPassword,
      });

      console.log("Sample creator account created.");
    }

    // Remove previous sample quizzes

    await Quiz.deleteMany({
      creator: creator._id,
    });

    console.log("Old sample quizzes removed.");

    // Add creator ID to every quiz

    const quizzesWithCreator = quizzes.map((quiz) => ({
      ...quiz,

      creator: creator._id,
    }));

    // Insert quizzes

    await Quiz.insertMany(quizzesWithCreator);

    console.log("✅ 4 quizzes added successfully!");

    console.log("✅ 40 questions added successfully!");

    await mongoose.disconnect();

    console.log("Database connection closed.");
  } catch (error) {
    console.error("❌ Error:", error);

    process.exit(1);
  }
}

seedDatabase();
