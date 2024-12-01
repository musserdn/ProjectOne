// variables get from localStorage and DOM
let ingredientsList = JSON.parse(localStorage.getItem('ingredientsList')) || [];
const recipesContainer = document.getElementById('RecipesContainer');
const ingredientsContainer = document.getElementById('ingredientsContainer');
let ingredientInfo = {
    recipeId: "",
    ingredients: [],
    title: "",
};

// Display recipes

function displayRecipes() {
    // Checks if the array is missing or empty, if so, displays no recipes added
    if (!ingredientsList || ingredientsList.length === 0) {
        const li = document.createElement('li');
        li.className = 'item';
        li.textContent = "No recipes added";
        recipesContainer.appendChild(li);
    }
    // Create elements for each recipe
    else {
        ingredientsList.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'item';
            li.textContent = recipe.title;
            recipesContainer.appendChild(li);
        });
    }
}


// Display ingredients
function displayIngredients() {
    // Checks if the array is missing or empty, if so, displays no recipes added
    if (!ingredientsList || ingredientsList.length === 0) {
        const li = document.createElement('li');
        li.className = 'item';
        li.textContent = "Select a recipe to get started";
        ingredientsContainer.appendChild(li);
    } else {
        // Loop through each recipe's ingredients
        ingredientsList.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.className = 'item';
                li.textContent = ingredient;
                ingredientsContainer.appendChild(li);
            });
        })
    }
}

// Clear Button
function clearRecipes() {
    ingredientsList = [];
    localStorage.setItem('ingredientsList', JSON.stringify(ingredientsList));
    recipesContainer.innerHTML = '';
    ingredientsContainer.innerHTML = '';
    displayIngredients();
    displayRecipes();
}

// Run functions on load
displayRecipes(ingredientsList, recipesContainer);
displayIngredients(ingredientsList, ingredientsContainer);

