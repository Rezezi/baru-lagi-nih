// Data soal kuis (lebih sulit)
const questions = [
    {
      question: "Siapa yang dikenal sebagai bapak pemrograman komputer?",
      options: [
        "Alan Turing",
        "Charles Babbage",
        "Ada Lovelace",
        "John von Neumann",
      ],
      correctAnswer: 1, // Jawaban benar: Charles Babbage
    },
    {
      question: "Apa nama algoritma pengurutan yang memiliki kompleksitas waktu terbaik O(n log n)?",
      options: ["QuickSort", "MergeSort", "BubbleSort", "InsertionSort"],
      correctAnswer: 1, // Jawaban benar: MergeSort
    },
    {
      question: "Bahasa pemrograman manakah yang pertama kali digunakan untuk pengembangan aplikasi web?",
      options: ["C", "Perl", "JavaScript", "PHP"],
      correctAnswer: 2, // Jawaban benar: JavaScript
    },
    {
      question: "Apa itu REST dalam pengembangan perangkat lunak?",
      options: [
        "Representational State Transfer",
        "Relational Software Engineering Technique",
        "Resilient System Technology",
        "Responsive Structured Text",
      ],
      correctAnswer: 0, // Jawaban benar: Representational State Transfer
    },
    {
      question: "Apa kepanjangan dari 'SQL' dalam basis data?",
      options: [
        "Structured Query Language",
        "Standard Query Language",
        "Structured Quality Language",
        "Simple Query Language",
      ],
      correctAnswer: 0, // Jawaban benar: Structured Query Language
    },
    {
      question: "Apa tujuan utama dari 'Docker' dalam pengembangan perangkat lunak?",
      options: [
        "Menyimpan data dalam format terstruktur",
        "Membuat aplikasi terisolasi dalam container",
        "Menjalankan kode di cloud",
        "Mengoptimalkan pengolahan data besar",
      ],
      correctAnswer: 1, // Jawaban benar: Membuat aplikasi terisolasi dalam container
    },
    {
      question: "Apa yang dimaksud dengan teknik memoization dalam pemrograman?",
      options: [
        "Menyimpan hasil perhitungan untuk digunakan kembali",
        "Mengoptimalkan penggunaan memori",
        "Menghapus data sementara secara otomatis",
        "Menyusun data ke dalam struktur pohon",
      ],
      correctAnswer: 0, // Jawaban benar: Menyimpan hasil perhitungan untuk digunakan kembali
    },
    {
      question: "Siapa pencipta Linux?",
      options: [
        "Bill Gates",
        "Linus Torvalds",
        "Steve Jobs",
        "Dennis Ritchie",
      ],
      correctAnswer: 1, // Jawaban benar: Linus Torvalds
    },
    {
      question: "Apa singkatan dari 'JSON'?",
      options: [
        "JavaScript Object Notation",
        "JavaScript Online Network",
        "Java System Object Namespace",
        "JavaScript Open Network",
      ],
      correctAnswer: 0, // Jawaban benar: JavaScript Object Notation
    },
    {
      question: "Apa kegunaan utama dari GraphQL?",
      options: [
        "Menyediakan query API untuk mendapatkan data secara efisien",
        "Mengelola database relasional",
        "Menyediakan antarmuka untuk pengembangan grafis",
        "Mengoptimalkan komunikasi real-time",
      ],
      correctAnswer: 0, // Jawaban benar: Menyediakan query API untuk mendapatkan data secara efisien
    },
  ];
  
  // Fungsi untuk mengacak soal dan pilihan jawaban
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Mengacak urutan soal dan pilihan jawaban
  shuffle(questions);
  questions.forEach((q) => shuffle(q.options));
  
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
    shuffle(questions);
    questions.forEach((q) => shuffle(q.options));
    showQuestion(questions[currentQuestionIndex]);
  }
  