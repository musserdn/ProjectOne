// Event listeners for all modal buttons
document.querySelectorAll('[id^="CF"]').forEach(element => {
    element.addEventListener('click', function () {
        const modalNumber = this.id.replace('CF', '');
        $(`#CFM${modalNumber}`).modal('show');
    });
});
// pull ingredientsList Object from local storage if it exists, else create an empty array
let ingredientsList = JSON.parse(localStorage.getItem('ingredientsList')) || [];
let ingredientInfo = {
    recipeId: "",
    ingredients: [],
    title: "",
};

// This listens to button click for the any Add button in the modal
document.querySelectorAll('.ui.long.large.modal .plus').forEach(addButton => {
    addButton.addEventListener('click', function () {
        // Create new object for each click to prevent overwriting prior clicked recipes
        const newIngredientInfo = {
            recipeId: '',
            title: '',
            ingredients: []
        };

        // Get recipe details
        newIngredientInfo.recipeId = this.closest('.ui.long.large.modal').id;
        // Traverse the DOM to get the recipe title
        newIngredientInfo.title = this.parentElement.parentElement.parentElement.children[1].innerText;

        // Check if recipe already exists, will return true if recipe is found
        const recipeExists = ingredientsList.some(recipe => recipe.recipeId === newIngredientInfo.recipeId);

        if (!recipeExists) {
            // Extract ingredients if recipeExists is false
            document.querySelectorAll(`#${newIngredientInfo.recipeId} .description ul li`).forEach((li) => {
                const span = li.querySelector('.ing');
                const trimmedText = li.textContent.replace(span.textContent, '').trim();

                if (!newIngredientInfo.ingredients.includes(trimmedText)) {
                    newIngredientInfo.ingredients.push(trimmedText);
                }
            });

            // Add to list and update storage
            ingredientsList.push(newIngredientInfo);
            localStorage.setItem('ingredientsList', JSON.stringify(ingredientsList));
            console.log('Added new recipe:', newIngredientInfo);
            // Hides modal after click if new recipe is added
            $(`#${newIngredientInfo.recipeId}`).modal('hide');
        } else {
            // Log message if recipe already exists, modal does not hide
            console.log('Recipe already exists');
        }
    });
});

// Add event listener to minus buttons
document.querySelectorAll('.ui.long.large.modal .minus').forEach(minusbutton => {
    minusbutton.addEventListener('click', function () {
        // Get recipe ID from modal
        const recipeId = this.closest('.ui.long.large.modal').id;

        // Find index of recipe to remove
        const recipeIndex = ingredientsList.findIndex(recipe => recipe.recipeId === recipeId);

        // Remove recipe if found
        if (recipeIndex !== -1) {
            ingredientsList.splice(recipeIndex, 1);
            localStorage.setItem('ingredientsList', JSON.stringify(ingredientsList))
            console.log(`Removed recipe with ID: ${recipeId}`);
            console.log('Updated ingredientsList:', ingredientsList);
            $(`#${recipeId}`).modal('hide');
        }
    });
});

console.log(ingredientsList);

// Button click event listener for Done button
document.getElementById('done').addEventListener('click', function () {
    localStorage.setItem('ingredientsList', JSON.stringify(ingredientsList));
    window.location.href = 'shopping.html';
});