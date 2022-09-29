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
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
            )
            .join("");
        }
        // console.log(data);
      });
  } else {
    alert("Please enter a search term");
  }
  // Clear Search Text
  searchInputEl.value = "";
}

// Fetch Meal By Id
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
      console.log(data);
    });
}

// Add Meal To DOM
function addMealToDom(meal) {
  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);

  // Update UI
  singleMealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      <p>${meal.strCategory}</p>
      <p>${meal.strArea}</p>
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
}

// Event Listeners
formSubmitEl.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }

  console.log(mealInfo);
});
