const questions = [
  // Soal Mudah
  
    // Soal Mudah
    {
      question: "Apa singkatan dari CSS?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Simple Sheets",
      ],
      correctAnswer: 0, // Jawaban benar: Cascading Style Sheets
    },
    {
      question: "Apa fungsi utama dari HTML?",
      options: [
        "Mendesain tata letak halaman",
        "Membuat struktur halaman web",
        "Mengatur warna teks",
        "Menjalankan kode program",
      ],
      correctAnswer: 1, // Jawaban benar: Membuat struktur halaman web
    },
    {
      question: "Bahasa pemrograman manakah yang paling sering digunakan untuk mengatur tampilan web?",
      options: ["JavaScript", "CSS", "HTML", "C++"],
      correctAnswer: 1, // Jawaban benar: CSS
    },
    {
      question: "Apa simbol yang digunakan untuk membuat array di JavaScript?",
      options: ["{}", "[]", "<>", "%%"],
      correctAnswer: 1, // Jawaban benar: []
    },
    {
      question: "Manakah yang termasuk alat pengembangan web browser?",
      options: ["Photoshop", "DevTools", "Visual Studio", "Android Studio"],
      correctAnswer: 1, // Jawaban benar: DevTools
    },
  
    // Soal Sulit
    {
      question: "Apa fungsi utama dari 'StatefulWidget' dalam Flutter?",
      options: [
        "Membuat aplikasi yang hanya memiliki satu halaman",
        "Mengelola dan mempertahankan status antar widget",
        "Mengubah tampilan aplikasi secara otomatis",
        "Mengatur tata letak aplikasi",
      ],
      correctAnswer: 1, // Jawaban benar: Mengelola dan mempertahankan status antar widget
    },
    {
      question: "Apa perbedaan utama antara 'Hot Reload' dan 'Hot Restart' di Flutter?",
      options: [
        "Hot Reload memperbarui aplikasi tanpa kehilangan status, sedangkan Hot Restart memulai ulang aplikasi sepenuhnya",
        "Hot Reload memulai ulang aplikasi, sedangkan Hot Restart memperbarui aplikasi",
        "Hot Reload digunakan untuk aplikasi iOS, dan Hot Restart untuk Android",
        "Tidak ada perbedaan, keduanya sama",
      ],
      correctAnswer: 0, // Jawaban benar: Hot Reload memperbarui aplikasi tanpa kehilangan status, sedangkan Hot Restart memulai ulang aplikasi sepenuhnya
    },
    {
      question: "Apa yang dimaksud dengan 'Middleware' dalam pengembangan backend?",
      options: [
        "Perangkat lunak untuk membuat front-end",
        "Fungsi yang mengelola permintaan sebelum mencapai server atau handler",
        "Framework untuk mengelola database",
        "Kode yang hanya berjalan di sisi klien",
      ],
      correctAnswer: 1, // Jawaban benar: Fungsi yang mengelola permintaan sebelum mencapai server atau handler
    },
    {
      question: "Manakah dari berikut ini yang merupakan bagian dari arsitektur Redux?",
      options: ["Store, Reducers, Actions", "Node, State, Components", "Data, Logic, UI", "Controllers, Models, Views"],
      correctAnswer: 0, // Jawaban benar: Store, Reducers, Actions
    },
    {
      question: "Apa keuntungan utama menggunakan provider state management di Flutter dibandingkan setState?",
      options: [
        "Provider lebih mudah digunakan untuk aplikasi kecil",
        "Provider memungkinkan manajemen state secara global dan lebih terorganisir",
        "Provider hanya mendukung aplikasi Android",
        "Provider hanya digunakan untuk pengaturan database",
      ],
      correctAnswer: 1, // Jawaban benar: Provider memungkinkan manajemen state secara global dan lebih terorganisir
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
