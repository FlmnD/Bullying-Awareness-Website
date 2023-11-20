// Function to start the quiz
function startQuiz() {
    // Hide the "Start Quiz" button
    document.getElementById('start-quiz-button').style.display = 'none';

    // Show the quiz container
    document.getElementById('quiz-container').style.display = 'flex';

    // Show the "Submit Quiz" button
    document.getElementById('submit-quiz').style.display = 'block';
}

// Function to restart the quiz
function restartQuiz() {
    // Show the "Start Quiz" button
    document.getElementById('start-quiz-button').style.display = 'block';

    // Hide the quiz container
    document.getElementById('quiz-container').style.display = 'none';

    // Hide the "Submit Quiz" button
    document.getElementById('submit-quiz').style.display = 'none';

    // Hide the restart button
    document.getElementById('restart-quiz-button').style.display = 'none';

    // Clear previous quiz results
    document.getElementById('quiz-results').innerHTML = '';

    // Scroll to the top of the page (optional)
    window.scrollTo(0, 850);
}

// Even listener to manage quiz state
document.addEventListener('DOMContentLoaded', function () {
    // Define the quiz questions and answers
    const quizData = [
        {
            question: 'What is the most common type of bullying?',
            options: ['Physical', 'Cyber', 'Relational', 'Verbal'],
            correctAnswer: 'Verbal'
        },
        {
            question: 'Who should children talk to about bullying?',
            options: ['Their friend', 'A trusted adult', 'Their pet', 'No one'],
            correctAnswer: 'A trusted adult'
        },
        {
            question: 'What classifies as bullying?',
            options: ['Helping someone', 'Only actions that are repeated', 'Only physical actions such as punching', 'Any behavior that happens at least once where there is a power imbalance'],
            correctAnswer: 'Any behavior that happens at least once where there is a power imbalance'
        },
        {
            question: 'How many people under the age of 25 have experienced bullying?',
            options: ['30%', '50%', '63%', '12%'],
            correctAnswer: '50%'
        },
        {
            question: 'What are the negative effects of bullying',
            options: ['Can cause suicidal thoughts or actions', 'Can cause depression and other mental health diseases', 'Can cause poor grades in school', 'All of the above'],
            correctAnswer: 'All of the above'
        },
    ];

    // Event listener for the "Restart Quiz" button
    document.getElementById('restart-quiz-button').addEventListener('click', restartQuiz);

    // Event listener for the "Start Quiz" button
    document.getElementById('start-quiz-button').addEventListener('click', function () {
        // Show the restart button when starting the quiz
        document.getElementById('restart-quiz-button').style.display = 'inline-block';
        startQuiz();
    });

    const quizHeader = document.querySelector('.quiz-header');
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('quiz-results');

    // Function to hide the quiz section initially
    function hideQuiz() {
        document.getElementById('start-quiz-button').addEventListener('click', startQuiz);

        // Event listener for the "Submit Quiz" button
        submitButton.addEventListener('click', calculateResults);
        document.getElementById('quiz-container').style.display = 'none'; // Hide the quiz container
        document.getElementById('submit-quiz').style.display = 'none'; // Hide the "Submit Quiz" button initially
        quizHeader.textContent = 'Quiz'; // Set or update the quiz header text
        quizContainer.innerHTML = ''; // Clear previous quiz content
    }

    // Function to display quiz questions
    function displayQuiz() {
        hideQuiz(); // Hide the "Submit Quiz" button

        quizData.forEach((questionData, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <p>${index + 1}. ${questionData.question}</p>
                <ul>
                    ${questionData.options.map(option => `<li><input type="radio" name="q${index}" value="${option}">${option}</li>`).join('')}
                </ul>
            `;
            quizContainer.appendChild(questionElement);
        });
    }

    // Function to calculate quiz results
    function calculateResults() {
        const selectedAnswers = [];
        const questions = document.querySelectorAll('.question');

        numCorrect = 0;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input:checked');
            selectedAnswers.push({
                question: index + 1,
                selectedAnswer: selectedOption ? selectedOption.value : 'No answer'
            });
        });

        resultsContainer.innerHTML = '<h3>Quiz Results:</h3>';
        selectedAnswers.forEach(answer => {
            resultsContainer.innerHTML += `<p>Question ${answer.question}: ${quizData[answer.question - 1].correctAnswer == answer.selectedAnswer ? 'Correct!' : 'Incorrect'}</p>`;
            if (quizData[answer.question - 1].correctAnswer == answer.selectedAnswer) {
                numCorrect++;
            }
        });

        score = numCorrect / quizData.length * 100;

        resultsContainer.innerHTML += `<p>Final score: ${score}%</p>`;

        if (score != 100) {
            resultsContainer.innerHTML += `<p>Try again for a better score!</p>`;
        }
        
    }

    // Event listener for the "Start Quiz" button
    document.getElementById('start-quiz-button').addEventListener('click', function () {
        startQuiz(); // Start the quiz and hide the "Start Quiz" button
        displayQuiz(); // Display the quiz section
    });

    // Event listener for the "Submit Quiz" button
    submitButton.addEventListener('click', function () {
        calculateResults(); // Calculate and display quiz results
    });

    // Hide the quiz section initially
    hideQuiz();
});
