// Quiz data - You can easily customize these questions
const quizData = [
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "Australia", "South Africa", "Brazil"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correct: 0
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let correctAnswers = 0;
let incorrectAnswers = 0;

// DOM elements
const questionCounter = document.getElementById('questionCounter');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentScoreEl = document.getElementById('currentScore');
const quizContent = document.getElementById('quizContent');
const resultsContent = document.getElementById('resultsContent');
const restartBtn = document.getElementById('restartBtn');

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    correctAnswers = 0;
    incorrectAnswers = 0;
    quizContent.classList.remove('hidden');
    resultsContent.classList.add('hidden');
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const question = quizData[currentQuestion];
    selectedAnswer = null;
    
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionText.textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Clear and load options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    nextBtn.disabled = true;
    currentScoreEl.textContent = score;
}

// Select an answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Already answered
    
    selectedAnswer = index;
    const question = quizData[currentQuestion];
    const options = optionsContainer.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Check if correct
    if (index === question.correct) {
        options[index].classList.add('correct');
        score += 10;
        correctAnswers++;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        incorrectAnswers++;
    }
    
    currentScoreEl.textContent = score;
    nextBtn.disabled = false;
}

// Go to next question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    quizContent.classList.add('hidden');
    resultsContent.classList.remove('hidden');
    
    const percentage = (correctAnswers / quizData.length) * 100;
    const finalScoreEl = document.getElementById('finalScore');
    const resultsMessageEl = document.getElementById('resultsMessage');
    const resultsDetailEl = document.getElementById('resultsDetail');
    
    // Update progress to 100%
    progressBar.style.width = '100%';
    
    // Display results
    finalScoreEl.textContent = `${percentage.toFixed(0)}%`;
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('incorrectCount').textContent = incorrectAnswers;
    resultsDetailEl.textContent = `You scored ${score} points out of ${quizData.length * 10} possible`;
    
    // Personalized message based on score
    if (percentage === 100) {
        resultsMessageEl.textContent = 'Perfect Score! 🎉';
    } else if (percentage >= 80) {
        resultsMessageEl.textContent = 'Excellent Work! 🌟';
    } else if (percentage >= 60) {
        resultsMessageEl.textContent = 'Good Job! 👍';
    } else if (percentage >= 40) {
        resultsMessageEl.textContent = 'Not Bad! 💪';
    } else {
        resultsMessageEl.textContent = 'Keep Practicing! 📚';
    }
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', initQuiz);

// Start the quiz
initQuiz();
