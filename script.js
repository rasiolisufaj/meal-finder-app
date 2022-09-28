const formSubmitEl = document.getElementById("submit");
const searchInputEl = document.getElementById("search");
const searchBtnEl = document.getElementsByClassName("search-btn");
const randomBtnEl = document.getElementById("random");
const resultHeadingEl = document.getElementById("result-heading");
const mealsEl = document.getElementById("meals");
const singleMealEl = document.getElementById("single-meal");

// Search Meal
function searchMeal(e) {
  e.preventDefault();

  // Clear Single Meal Element
  singleMealEl.innerHTML = "";
  // Get User Input
  const userInput = searchInputEl.value;
  // Check for empty
  if (userInput.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeadingEl.innerHTML = `<h2>Search results for '${userInput}':`;
        if (data.meals === null) {
          resultHeadingEl.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
            )
            .join("");
        }
        console.log(data);
      });
  } else {
    alert("Please enter a search term");
  }
}

// Event Listeners
formSubmitEl.addEventListener("submit", searchMeal);
