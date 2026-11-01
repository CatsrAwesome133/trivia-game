const trivia_api = 'https://opentdb.com/api_category.php'


async function loadCategories() {
    // Request and parse JSON
    try {
        const response = await fetch(trivia_api);
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const categories = data.trivia_categories;

        const selector = document.getElementById('category');
    
        // Fetch and place categories
        categories.forEach(c => {
            const newOpt = document.createElement('option');
            newOpt.innerHTML = c.name;
            newOpt.setAttribute("value", c.name);
            selector.appendChild(newOpt);
        });

    } catch (error) {
        console.error("Failed to load questions:", error);
    }
}


loadCategories();

// On page load
document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById('category');
    
    // Fetch and place categories
    categories.forEach(c => {
        const newOpt = document.createElement('option');
        newOpt.innerHTML = c.name;
        newOpt.setAttribute("value", c.name);
        selector.appendChild(newOpt);
    });
});