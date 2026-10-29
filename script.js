const trivia_api = 'https://opentdb.com/api.php?amount=10'

async function loadData() {
            try {
                // 1. Request the JSON file or API endpoint
                const response = await fetch(trivia_api);

                // 2. Parse the response into a JavaScript object/array
                const data = await response.json();

                // 3. Select the HTML container
                const listElement = document.getElementById('container-main');

                // 4. Loop through the data and create HTML elements
                data.results.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.question; // Replace 'name' with your JSON key
                    listElement.appendChild(li);
                });
            } catch (error) {
                console.error('Error fetching JSON:', error);
            }
        }

        // Run the function when the page loads
        loadData();