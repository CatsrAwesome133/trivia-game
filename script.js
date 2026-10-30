const trivia_api = 'https://opentdb.com/api.php?amount=1'

async function newQuestion() {
    try {
        // 1. Request the JSON file or API endpoint
        const response = await fetch(trivia_api);

        // 2. Parse the response into a JavaScript object/array
        const data = await response.json();

        // 3. Select the HTML container
        const question = document.getElementById('container-q');
        const answer = document.getElementById('container-ans');

        question.innerHTML = '';
        answer.innerHTML = '';

        // 4. Loop through the data and create HTML elements
        data.results.forEach(item => {
            const q = document.createElement('div');
            q.textContent = item.question;

            const ans = document.createElement('div');
            ans.setAttribute("id", "correct");
            ans.setAttribute("onclick", "correctAns()");
            ans.textContent = item.correct_answer;

            item.incorrect_answers.forEach(wrongAnswer => {
                const wrong = document.createElement('div');
                wrong.setAttribute("onclick", "wrongAns()");
                wrong.innerHTML = wrongAnswer;
                answer.appendChild(wrong);
            });

            question.appendChild(q);
            answer.appendChild(ans);
        });
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}


function correctAns() {
    const correct = document.createElement('div');
    correct.innerHTML = 'Correct Answer';
    document.getElementById('container-main').appendChild(correct);
    choseAnswer();
}

function wrongAns() {
    const correct = document.createElement('div');
    correct.innerHTML = 'Incorrect Answer';
    document.getElementById('container-main').appendChild(correct);
    choseAnswer();
}

function choseAnswer() {
    newQuestion();
}

// Run the function when the page loads
newQuestion();