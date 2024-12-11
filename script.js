const quizData = {
  easy: [
    { question: "Apa itu PPLG?", options: ["Pengembangan Perangkat Lunak dan Gim", "Pemrograman Lanjutan Generasi", "Pemrograman Lengkap dan Gimifikasi", "Pemecahan Masalah Logika"], answer: 0 },
    { question: "HTML adalah?", options: ["Bahasa backend", "Bahasa markup", "Framework", "Database"], answer: 1 },
    { question: "CSS digunakan untuk?", options: ["otentikasi", "Logika backend", "Keamanan data", "Membuat tampilan"], answer: 3 },
    { question: "Apa itu Tailwind CSS?", options: ["Framework Database", "Bahasa backend", "Framework CSS", "Bahasa Pemrograman"], answer: 2 },
    { question: "Bahasa Java digunakan untuk?", options: ["Semua di atas", "Frontend", "Android", "Pemrograman game"], answer: 0 },
  ],
  medium: [
    { question: "Apa itu OOP?", options: ["Optimasi parsing", "Optimasi Online Programming", "Object Output Processing", "Object-Oriented Programming"], answer: 3 },
    { question: "Apa itu IDE?", options: ["Interactive Debug Editor", "Integrated Debugging Entry", "Integrated Development Environment", "Interactive Development Event"], answer: 2 },
    { question: "React digunakan untuk?", options: ["Backend", "Membuat UI", "Database", "Keamanan"], answer: 1 },
    { question: "API adalah?", options: ["Abstract Parsing Index", "Artificial Intelligence Program", "Automation Programming Integration", "Application Programming Interface"], answer: 3 },
    { question: "Apa itu REST?", options: ["Representational State Transfer", "Relational State Transfer", "Remote Event System", "Runtime Environment State"], answer: 0 },
  ],
  hard: [
    { question: "Apa itu Big-O?", options: ["Optimasi Kode ", "Analisis kompleksitas algoritma", "Bahasa pemrograman", "Framework"], answer: 1 },
    { question: "Jenis sorting tercepat adalah?", options: ["Insertion Sort", "Bubble Sort", "Quick Sort", "Merge Sort"], answer: 2 },
    { question: "Apa itu ORM?", options: ["Object-Relational Mapping", "Output Resource Management", "Optimized Relational Model", "Output Routing Mapping"], answer: 0 },
    { question: "Docker digunakan untuk?", options: ["Containerization", "Framework Database", "Frontend Development", "Keamanan API"], answer: 0 },
    { question: "Apa itu Machine Learning?", options: ["Bahasa Pemrograman", "Framework", "Pembelajaran otomatis", "Database"], answer: 2 },
  ],
};

let level = "easy";
let score = 0;
let currentQuestionIndex = 0;

const levels = ["easy", "medium", "hard"];
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedbackContainer = document.getElementById("feedback");
const levelContainer = document.getElementById("level");
const scoreContainer = document.getElementById("score");

function loadQuestion() {
  const data = quizData[level][currentQuestionIndex];
  questionContainer.innerText = data.question;
  optionsContainer.innerHTML = "";

  data.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.className = "bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded";
    button.addEventListener("click", () => checkAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const data = quizData[level][currentQuestionIndex];
  if (selectedIndex === data.answer) {
    feedbackContainer.innerText = "Benar!";
    feedbackContainer.className = "text-green-500 font-bold mt-4";
    score += 10;
    scoreContainer.innerText = `Score: ${score}`;
  } else {
    feedbackContainer.innerText = "Salah!";
    feedbackContainer.className = "text-red-500 font-bold mt-4";
    endGame(false);
    return;
  }

  feedbackContainer.classList.remove("hidden");

  // Lanjut ke pertanyaan berikutnya
  currentQuestionIndex++;

  if (currentQuestionIndex >= quizData[level].length) {
    const nextLevelIndex = levels.indexOf(level) + 1;

    if (nextLevelIndex < levels.length) {
      // Pindah ke level berikutnya
      currentQuestionIndex = 0;
      level = levels[nextLevelIndex];
      levelContainer.innerText = `Level: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
      showLevelUpAnimation();
    } else {
      // Menang!
      endGame(true);
      return;
    }
  }

  setTimeout(() => {
    feedbackContainer.classList.add("hidden");
    loadQuestion();
  }, 1000);
}

function showLevelUpAnimation() {
  const levelUpAnimation = document.getElementById("level-up-animation");
  levelUpAnimation.classList.remove("hidden");
  setTimeout(() => {
    levelUpAnimation.classList.add("hidden");
  }, 2000);
}

function endGame(isWin) {
  if (isWin) {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("win-scene").classList.remove("hidden");
  } else {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("gameover-scene").classList.remove("hidden");
    document.getElementById("final-score").innerText = `Skor Anda: ${score}`;
  }
}

function restartGame() {
  level = "easy";
  score = 0;
  currentQuestionIndex = 0;

  scoreContainer.innerText = `Score: ${score}`;
  levelContainer.innerText = `Level: Easy`;

  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("win-scene").classList.add("hidden");
  document.getElementById("gameover-scene").classList.add("hidden");

  loadQuestion();
}

// Memulai permainan
loadQuestion();
