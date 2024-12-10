const quizData = {
  easy: [
    { question: "Apa itu PPLG?", options: ["Pengembangan Perangkat Lunak dan Gim", "Pemrograman Lanjutan Generasi", "Pemrograman Lengkap dan Gimifikasi", "Pemecahan Masalah Logika"], answer: 0 },
    { question: "HTML adalah?", options: ["Bahasa Markup", "Bahasa Backend", "Framework", "Database"], answer: 0 },
    { question: "CSS digunakan untuk?", options: ["Membuat tampilan", "Logika backend", "Keamanan data", "Otentikasi"], answer: 0 },
    { question: "Apa itu Tailwind CSS?", options: ["Framework CSS", "Bahasa backend", "Framework Database", "Bahasa Pemrograman"], answer: 0 },
    { question: "Bahasa Java digunakan untuk?", options: ["Semua di atas", "Frontend", "Android", "Pemrograman game"], answer: 0 },
  ],
  medium: [
    { question: "Apa itu OOP?", options: ["Object-Oriented Programming", "Optimasi Online Programming", "Object Output Processing", "Optimasi Parsing"], answer: 0 },
    { question: "Apa itu IDE?", options: ["Integrated Development Environment", "Integrated Debugging Entry", "Interactive Debug Editor", "Interactive Development Event"], answer: 0 },
    { question: "React digunakan untuk?", options: ["Membuat UI", "Backend", "Database", "Keamanan"], answer: 0 },
    { question: "API adalah?", options: ["Application Programming Interface", "Artificial Intelligence Program", "Automation Programming Integration", "Abstract Parsing Index"], answer: 0 },
    { question: "Apa itu REST?", options: ["Representational State Transfer", "Relational State Transfer", "Remote Event System", "Runtime Environment State"], answer: 0 },
  ],
  hard: [
    { question: "Apa itu Big-O?", options: ["Analisis kompleksitas algoritma", "Optimasi kode", "Bahasa pemrograman", "Framework"], answer: 0 },
    { question: "Jenis sorting tercepat adalah?", options: ["Quick Sort", "Bubble Sort", "Insertion Sort", "Merge Sort"], answer: 0 },
    { question: "Apa itu ORM?", options: ["Object-Relational Mapping", "Output Resource Management", "Optimized Relational Model", "Output Routing Mapping"], answer: 0 },
    { question: "Docker digunakan untuk?", options: ["Containerization", "Framework Database", "Frontend Development", "Keamanan API"], answer: 0 },
    { question: "Apa itu Machine Learning?", options: ["Pembelajaran otomatis", "Framework", "Bahasa pemrograman", "Database"], answer: 0 },
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
