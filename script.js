const trivia_api = 'https://opentdb.com/api.php?amount=1';

var score = 0;

async function newQuestion() {
    try {
        // 1. Request the JSON file or API endpoint
        const response = await fetch(trivia_api);

        // 2. Parse the response into a JavaScript object/array
        const data = await response.json();

        // 3. Select and reset the HTML container
        const question = document.getElementById('container-q');
        const answer = document.getElementById('container-ans');

        question.innerHTML = 'Loading...';
        question.setAttribute("style", "color: var(--mid-light); border-color: var(--bg)");
        answer.innerHTML = '';

        // 4. Loop through the data and create HTML elements
        data.results.forEach(item => {
            // Load the question
            const q = document.createElement('div');
            q.textContent = item.question;
            
            // Load the correct answer
            const ans = document.createElement('div');
            ans.setAttribute("id", "correct");
            ans.setAttribute("onclick", "correctAns()");
            ans.textContent = item.correct_answer;

            // Load the incorrect answers
            item.incorrect_answers.forEach(wrongAnswer => {
                const wrong = document.createElement('div');
                wrong.setAttribute("onclick", "wrongAns()");
                wrong.innerHTML = wrongAnswer;
                answer.appendChild(wrong);
            });

            // Place all elements onto the page
            question.innerHTML = '';
            question.setAttribute("style", "");
            question.appendChild(q);
            answer.appendChild(ans);
        });
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}


// For correct answers
function correctAns() {
    const score_element = document.getElementById('score');
    score = score + 2;
    score_element.innerHTML = score.toString();
    choseAnswer();
}

// For incorrect answers
function wrongAns() {    
    const score_element = document.getElementById('score');
    score = score - 1;
    score_element.innerHTML = score.toString();
    choseAnswer();
}

// For every answer chosen
function choseAnswer() {
    newQuestion();
}

// Load a new question when the page loads
newQuestion();