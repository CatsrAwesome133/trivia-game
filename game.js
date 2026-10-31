var score = 0;
var currentIndex = 0;
var correctAnswers = 0;


async function loadQuestions() {
    // Request and parse JSON
    try {
        const response = await fetch(trivia_api);
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Save the array of results to our global state variable
        questions = data.results; 
        
        // Run the display logic now that data exists
        newQuestion();

    } catch (error) {
        console.error("Failed to load questions:", error);
    }
}


function newQuestion() {
    // Ends the game if all questions have been answered
    if (currentIndex >= questions.length) {
        showEndScreen();
        return;
    }

    // Select and reset the HTML container
    const questionContainer = document.getElementById('container-q');
    const answerContainer = document.getElementById('container-ans');

    questionContainer.innerHTML = 'Loading...';
    questionContainer.setAttribute("style", "color: var(--mid-light); border-color: var(--bg)");
    answerContainer.innerHTML = '';

    const currentQuestion = questions[currentIndex];

    // Load the question
    const q = document.createElement('div');
    q.textContent = currentQuestion.question;
    
    // Load the correct answer
    const ans = document.createElement('div');
    ans.setAttribute("id", "correct");
    ans.setAttribute("onclick", "correctAns()");
    ans.textContent = currentQuestion.correct_answer;

    // Load the incorrect answers
    currentQuestion.incorrect_answers.forEach(wrongAnswer => {
        const wrong = document.createElement('div');
        wrong.setAttribute("onclick", "wrongAns()");
        wrong.innerHTML = wrongAnswer;
        answerContainer.appendChild(wrong);
    });

    // Place all elements onto the page
    questionContainer.innerHTML = '';
    questionContainer.setAttribute("style", "");
    questionContainer.appendChild(q);
    answerContainer.appendChild(ans);
}


// For correct answers
function correctAns() {
    const score_element = document.getElementById('score');
    score = score + 2;
    correctAnswers++;
    score_element.innerHTML = score.toString(); 
    choseAnswer();
}

// For incorrect answers
function wrongAns() {    
    const score_element = document.getElementById('score');
    score = score - 1;
    if (!negativeScore) {
        if (score < 0) {
            score = 0
        }
    }

    score_element.innerHTML = score.toString();
    choseAnswer();
}

// For every answer chosen
function choseAnswer() {
    currentIndex++;
    newQuestion();
}


// End screen
function showEndScreen() {
    document.getElementById('container-main').setAttribute("style", "display: none");
    document.getElementById('container-end').setAttribute("style", "");
    
    document.getElementById('total-correct').innerHTML = String(parseInt(correctAnswers, 10));
    document.getElementById('total').innerHTML = currentIndex.toString();
    document.getElementById('percent').innerHTML = String(Math.round((correctAnswers/currentIndex)*100));
    document.getElementById('score-end').innerHTML = score.toString();
}


// Fetching data from settings
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    questionNo = urlParams.get('qNo'); 
    negativeScore = urlParams.get('goNegative');
  
    console.log("Number of questions: ", questionNo);
    console.log("Negative scores: ", negativeScore);

    trivia_api = `https://opentdb.com/api.php?amount=${Number.parseInt(questionNo)}`;

    loadQuestions();
});