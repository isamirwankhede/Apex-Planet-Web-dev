// Quiz questions
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correct: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correct: 3,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz() {
  document.getElementById("startContainer").classList.remove("active");
  document.getElementById("quizContainer").classList.add("active");
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  selectedAnswer = null;

  // Update question number and progress
  document.getElementById("currentQuestion").textContent =
    currentQuestionIndex + 1;
  document.getElementById("totalQuestions").textContent = quizData.length;

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  // Display question
  document.getElementById("question").textContent = currentQuestion.question;

  // Display options
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.className = "option";
    li.textContent = option;
    li.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(li);
  });

  // Disable next button
  document.getElementById("nextBtn").disabled = true;
}

function selectAnswer(index) {
  if (selectedAnswer !== null) return; // Prevent changing answer

  selectedAnswer = index;
  const currentQuestion = quizData[currentQuestionIndex];
  const options = document.querySelectorAll(".option");

  // Show correct/wrong answers
  options.forEach((option, i) => {
    if (i === currentQuestion.correct) {
      option.classList.add("correct");
    } else if (i === selectedAnswer) {
      option.classList.add("wrong");
    }
  });

  // Update score
  if (selectedAnswer === currentQuestion.correct) {
    score++;
  }

  // Enable next button
  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quizContainer").classList.remove("active");
  document.getElementById("resultContainer").classList.add("active");

  document.getElementById("finalScore").textContent = score;
  document.getElementById("totalScore").textContent = quizData.length;

  const percentage = (score / quizData.length) * 100;

  let emoji, message;
  if (percentage === 100) {
    emoji = "🏆";
    message = "Perfect Score!";
  } else if (percentage >= 80) {
    emoji = "🎉";
    message = "Excellent!";
  } else if (percentage >= 60) {
    emoji = "😊";
    message = "Good Job!";
  } else if (percentage >= 40) {
    emoji = "😐";
    message = "Not Bad!";
  } else {
    emoji = "😅";
    message = "Keep Practicing!";
  }

  document.getElementById("resultEmoji").textContent = emoji;
  document.getElementById("resultMessage").textContent = message;
}

function restartQuiz() {
  document.getElementById("resultContainer").classList.remove("active");
  document.getElementById("startContainer").classList.add("active");
}
