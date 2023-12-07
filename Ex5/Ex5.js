const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const correctAnswersContainer = document.getElementById("correct-answers");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const questionFrame = document.getElementById("question-frame");
const answerFrame = document.getElementById("answer-frame");
const resultFrame = document.getElementById("result-frame");

const quizData = [
  {
    question: "CSS là viết tắt của?",
    options: [
      "A. Creative Style Sheets",
      "B. Computer Style Sheets",
      "C. Cascading Style Sheets",
      "D. Colorful Style Sheets",
    ],
    correctAnswer: 2,
  },
  {
    question: "Thuộc tính nào thay đổi kích cỡ chữ?",
    options: ["A. font-style", "B. font-size", "C. text-style", "D. text-size"],
    correctAnswer: 1,
  },
  {
    question: "1+1=?",
    options: ["A. 1", "B. 2", "C. 3", "D. 4"],
    correctAnswer: 1,
  },
  {
    question: "2+2=?",
    options: ["A. 1", "B. 2", "C. 3", "D. 4"],
    correctAnswer: 3,
  },
];

let currentQuestion = 0;
let score = 0;
let countdownTime = 60;
let countdownInterval;
let submitted = false;
let selectedAnswer = null;
let selectedAnswers = [];

function startQuiz() {
  loadQuestion();
  countdownInterval = setInterval(updateCountdown, 1000);
  loadSelectedAnswers();
}

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionNumber.innerText = `Câu hỏi ${currentQuestion + 1}:`;
  questionText.innerText = currentQuizData.question;

  optionsContainer.innerHTML = "";
  currentQuizData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => selectOption(index));

    if (index === selectedAnswers[currentQuestion]) {
      button.classList.add("selected");
    }

    optionsContainer.appendChild(button);
  });

  updateNavigationButtons();
}

function selectOption(selectedIndex) {
  const currentQuizData = quizData[currentQuestion];

  const optionButtons = optionsContainer.querySelectorAll("button");
  optionButtons.forEach((button) => button.classList.remove("selected"));

  optionButtons[selectedIndex].classList.add("selected");
  selectedAnswers[currentQuestion] = selectedIndex;

  if (selectedIndex === currentQuizData.correctAnswer) {
    score++;
  }
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    if (submitted) {
      showResult();
    }
  }

  saveSelectedAnswers();
}

function showResult() {
  clearInterval(countdownInterval);

  resultContainer.innerText = `Kết quả: ${score} điểm`;
  showCorrectAnswers();
  resultFrame.style.display = "block";
}

function showCorrectAnswers() {
  correctAnswersContainer.innerHTML = "<h3>Đáp Án Đúng:</h3>";
  quizData.forEach((data, index) => {
    const correctAnswerText = String.fromCharCode(65 + data.correctAnswer);
    const answerItem = document.createElement("p");
    answerItem.innerText = `Câu hỏi ${index + 1}: ${correctAnswerText}`;
    correctAnswersContainer.appendChild(answerItem);
  });

  answerFrame.style.display = "block";
}

function updateNavigationButtons() {
  prevButton.disabled = currentQuestion === 0;
  nextButton.disabled = currentQuestion === quizData.length - 1;

  const optionButtons = optionsContainer.querySelectorAll("button");
  optionButtons.forEach((button, index) => {
    if (
      selectedAnswers[currentQuestion] !== undefined &&
      index === selectedAnswers[currentQuestion]
    ) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}

function updateCountdown() {
  countdownTime--;
  document.getElementById("countdown").innerText = `${countdownTime}s`;

  if (countdownTime <= 0) {
    clearInterval(countdownInterval);
    showResult();
  }
}

prevButton.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

nextButton.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    if (submitted) {
      showResult();
    }
  }
});

submitButton.addEventListener("click", () => {
  submitted = true;
  showResult();
});

startQuiz();

window.onload = function () {
  const storedTime = localStorage.getItem("countdownTime");
  if (storedTime > 0) {
    countdownTime = parseInt(storedTime);
  }
  loadSelectedAnswers();
  countdown();
};

window.onbeforeunload = function () {
  localStorage.setItem("countdownTime", countdownTime);
  saveSelectedAnswers();
};

function saveSelectedAnswers() {
  const selectedAnswersString = JSON.stringify(selectedAnswers);
  localStorage.setItem("selectedAnswers", selectedAnswersString);
}

function loadSelectedAnswers() {
  const selectedAnswersString = localStorage.getItem("selectedAnswers");

  if (selectedAnswersString) {
    selectedAnswers = JSON.parse(selectedAnswersString);
    updateNavigationButtons();
  }
}
