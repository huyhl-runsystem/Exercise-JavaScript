document.addEventListener("DOMContentLoaded", function () {
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
      options: [
        "A. font-style",
        "B. font-size",
        "C. text-style",
        "D. text-size",
      ],
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

  let currentQuestion = 0;
  let score = 0;
  let countdownTime = localStorage.getItem("countdownTime");
  countdownTime = countdownTime ? parseInt(countdownTime) : 60;
  let selectedOption = localStorage.getItem("selectedOption");

  let countdownInterval;
  let submitted = false; // Thêm biến để theo dõi đã nhấn submit hay chưa

  // Hàm bắt đầu bài trắc nghiệm
  function startQuiz() {
    loadQuestion();
    countdownInterval = setInterval(updateCountdown, 1000);
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

      // Tái tạo lớp selected cho đáp án đã chọn
      if (index === selectedAnswers[currentQuestion]) {
        button.classList.add("selected");
      }

      optionsContainer.appendChild(button);
    });

    updateNavigationButtons();
  }

  let selectedAnswer = null;
  let selectedAnswers = [];

  // Hàm chọn đáp án
  function selectOption(selectedIndex) {
    const currentQuizData = quizData[currentQuestion];

    // Xóa lớp selected cho tất cả các nút trong optionsContainer
    const optionButtons = optionsContainer.querySelectorAll("button");
    optionButtons.forEach((button) => button.classList.remove("selected"));

    // Thêm lớp selected cho nút được chọn
    optionButtons[selectedIndex].classList.add("selected");

    // Lưu trữ đáp án đã chọn
    selectedAnswers[currentQuestion] = selectedIndex;

    if (selectedIndex === currentQuizData.correctAnswer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      // Kiểm tra nếu đã nhấn submit thì mới hiển thị kết quả
      if (submitted) {
        showResult();
      }
    }
  }

  // Hàm hiển thị kết quả
  function showResult() {
    clearInterval(countdownInterval);

    resultContainer.innerText = `Kết quả: ${score} điểm`;
    showCorrectAnswers();

    // Hiển thị khung kết quả
    resultFrame.style.display = "block";
  }

  // Hàm hiển thị đáp án đúng cho từng câu hỏi
  function showCorrectAnswers() {
    correctAnswersContainer.innerHTML = "<h3>Đáp Án Đúng:</h3>";
    quizData.forEach((data, index) => {
      const correctAnswerText = String.fromCharCode(65 + data.correctAnswer);
      const answerItem = document.createElement("p");
      answerItem.innerText = `Câu hỏi ${index + 1}: ${correctAnswerText}`;
      correctAnswersContainer.appendChild(answerItem);
    });

    // Hiển thị khung đáp án
    answerFrame.style.display = "block";
  }

  // Hàm cập nhật các nút điều hướng
  function updateNavigationButtons() {
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = currentQuestion === quizData.length - 1;

    // Tái tạo lớp selected khi di chuyển giữa các câu hỏi
    const optionButtons = optionsContainer.querySelectorAll("button");
    optionButtons.forEach((button, index) => {
      if (index === selectedAnswers[currentQuestion]) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  // Hàm cập nhật thời gian countdown và lưu vào Local Storage
  function updateCountdown() {
    if (countdownTime > 0) {
      countdownTime--;
      document.getElementById("countdown").innerText = `${countdownTime}s`;
    }

    if (countdownTime === 0) {
      clearInterval(countdownInterval);
      showResult();
    }

    // Lưu giá trị countdown vào Local Storage
    localStorage.setItem("countdownTime", countdownTime);
  }

  // Hàm lưu đáp án đã chọn vào Local Storage
  function saveSelectedOption(selectedIndex) {
    localStorage.setItem("selectedOption", selectedIndex);
  }

  // Sự kiện khi nhấn nút Previous
  prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });

  // Sự kiện khi nhấn nút Next
  nextButton.addEventListener("click", () => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      // Kiểm tra nếu đã nhấn submit thì mới hiển thị kết quả
      if (submitted) {
        showResult();
      }
    }
  });

  // Sự kiện khi nhấn nút Submit
  submitButton.addEventListener("click", () => {
    submitted = true; // Đánh dấu là đã nhấn submit
    showResult();
  });

  // Bắt đầu bài trắc nghiệm khi tải xong trang
  startQuiz();
});
