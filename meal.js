// meal data ui show
const mealDb = (search) => {
  if (search.length === 0) {
    alert("no!!");
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => mealItems(data.meals));
  }
};
const mealItems = (items) => {
  if (!items) {
    alert("data nai!!");
  } else {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.innerHTML = "";
    items.forEach((item) => {
      const newElement = document.createElement("div");
      newElement.innerHTML = `
              <div class="card">
                <img src="${item.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.strMeal}</h5>
                  <p class="card-text">${item.strInstructions.slice(0, 300)}</p>
                  <button type="button" class="btn btn-warning" onclick="detailsMealDb(${
                    item.idMeal
                  })">Details</button>
      
                </div>
              </div>
              `;
      newElement.classList.add("col");
      mealContainer.appendChild(newElement);
    });
  }
};

// meal details ui show
const detailsMealDb = (key) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => detailsContent(data.meals[0]));
};

const detailsContent = (data) => {
  const mealDetails = document.getElementById("meal-details");
  mealDetails.innerHTML = "";
  const newElement = document.createElement("div");
  newElement.innerHTML = `
                   <div class="card mb-3 container mx-auto">
                    <div class="row g-0 ">
                      <div class="col-md-4">
                        <img src="${data.strMealThumb}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${data.strMeal}</h5>
                          <p class="card-text">${data.strInstructions}</p>
                          <a class="btn btn-warning" target="blank" href="${data.strYoutube}">play video</a>
                        </div>
                      </div>
                    </div>
                   </div> 
    `;
  mealDetails.appendChild(newElement);
};

// input value
document.getElementById("btn1").addEventListener("click", function search() {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  inputField.value = "";
  mealDb(inputValue);
});
