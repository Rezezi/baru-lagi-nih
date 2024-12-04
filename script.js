const questions = [
  // Soal Mudah
  {
    question: "Apa singkatan dari HTML?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlink Text Markup Language",
      "Hyper Transfer Markup Language",
    ],
    correctAnswer: 0, // Jawaban benar: HyperText Markup Language
  },
  {
    question: "Apa nama simbol yang digunakan untuk membuat komentar dalam JavaScript?",
    options: ["//", "#", "<!-- -->", "/* */"],
    correctAnswer: 0, // Jawaban benar: //
  },
  {
    question: "Bahasa pemrograman manakah yang digunakan untuk membuat halaman web dinamis?",
    options: ["HTML", "CSS", "JavaScript", "C++"],
    correctAnswer: 2, // Jawaban benar: JavaScript
  },
  {
    question: "Apa yang digunakan untuk menentukan warna dalam CSS?",
    options: ["RGB", "HTML", "JavaScript", "HTTP"],
    correctAnswer: 0, // Jawaban benar: RGB
  },
  {
    question: "Apa fungsi utama dari 'console.log' dalam JavaScript?",
    options: [
      "Membuat variable baru",
      "Menampilkan data di konsol",
      "Menjalankan aplikasi",
      "Menghapus error",
    ],
    correctAnswer: 1, // Jawaban benar: Menampilkan data di konsol
  },

  // Soal Sulit
  {
    question: "Apa kompleksitas waktu terbaik dari algoritma QuickSort?",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
    correctAnswer: 1, // Jawaban benar: O(n log n)
  },
  {
    question: "Siapa pencipta bahasa pemrograman Python?",
    options: [
      "Dennis Ritchie",
      "Guido van Rossum",
      "James Gosling",
      "Brendan Eich",
    ],
    correctAnswer: 1, // Jawaban benar: Guido van Rossum
  },
  {
    question: "Apa yang dimaksud dengan 'closure' dalam JavaScript?",
    options: [
      "Fungsi dalam fungsi yang mengakses variabel luar",
      "Metode untuk mengulang data",
      "Struktur data berbasis pohon",
      "Kompilasi fungsi secara otomatis",
    ],
    correctAnswer: 0, // Jawaban benar: Fungsi dalam fungsi yang mengakses variabel luar
  },
  {
    question: "Apa yang dimaksud dengan 'asynchronous programming'?",
    options: [
      "Kode yang dieksekusi secara langsung",
      "Kode yang menunggu proses selesai sebelum lanjut",
      "Kode yang berjalan tanpa menunggu operasi lainnya selesai",
      "Kode yang berjalan di browser",
    ],
    correctAnswer: 2, // Jawaban benar: Kode yang berjalan tanpa menunggu operasi lainnya selesai
  },
  {
    question: "Bahasa pemrograman apa yang digunakan untuk membangun backend dengan Node.js?",
    options: ["JavaScript", "Ruby", "PHP", "C#"],
    correctAnswer: 0, // Jawaban benar: JavaScript
  },
];

// Fungsi untuk mengacak urutan soal
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mengacak soal
shuffle(questions);
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

shuffleQuestions();

let currentQuestionIndex = 0;
let score = 0;

// Elemen DOM
const quizContent = document.getElementById("quiz-content");
const startButton = document.getElementById("start-button");

// Memulai kuis
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  showQuestion(questions[currentQuestionIndex]);
}

// Menampilkan soal
function showQuestion(question) {
  quizContent.innerHTML = ""; // Hapus konten sebelumnya

  // Tampilkan pertanyaan
  const questionText = document.createElement("div");
  questionText.classList.add("question");
  questionText.textContent = question.question;
  quizContent.appendChild(questionText);

  // Tampilkan opsi jawaban
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");
  quizContent.appendChild(optionsContainer);

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.innerHTML = `<span></span>${option}`;
    optionElement.addEventListener("click", () => handleAnswer(index));
    optionsContainer.appendChild(optionElement);
  });
}

// Menangani jawaban
function handleAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const options = document.querySelectorAll(".option");

  options.forEach((option, index) => {
    const span = option.querySelector("span");
    if (index === question.correctAnswer) {
      option.classList.add("correct");
      span.textContent = "✓"; // Tanda centang untuk jawaban benar
    } else if (index === selectedIndex) {
      option.classList.add("incorrect");
      span.textContent = "✗"; // Tanda silang untuk jawaban salah
    }

    option.style.pointerEvents = "none"; // Nonaktifkan klik setelah jawaban
  });

  if (selectedIndex === question.correctAnswer) {
    score++;
  }

  // Beri waktu beberapa detik untuk menampilkan hasil sebelum lanjut ke soal berikutnya
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      showResult();
    }
  }, 1500);
}

// Menampilkan hasil akhir
function showResult() {
  quizContent.innerHTML = `<h2>Skor Anda: ${score} / ${questions.length}</h2>`;
  const restartButton = document.createElement("button");
  restartButton.textContent = "Mulai Lagi";
  restartButton.addEventListener("click", restartQuiz);
  quizContent.appendChild(restartButton);
}

// Memulai ulang kuis
function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  shuffleQuestions();
  showQuestion(questions[currentQuestionIndex]);
}
