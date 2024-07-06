fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin")
           .then(response => response.json())
           .then(data => {
    const cocktailsDiv = document.getElementById("cocktails");
    data.drinks.forEach(drink => {
        const drinkDiv = document.createElement("div");
        const drinkThumb = document.createElement("img");
        drinkThumb.src = drink.strDrinkThumb;
        drinkThumb.alt = drink.strDrink;
        drinkThumb.addEventListener("click", function() {
            displayCocktailInfo(drink.idDrink);
        });
        const drinkName = document.createElement("h2");
        drinkName.textContent = drink.strDrink;
        drinkDiv.appendChild(drinkThumb);
        drinkDiv.appendChild(drinkName);
        cocktailsDiv.appendChild(drinkDiv);
    });
})
.catch(error => console.error(error));
  

function displayCocktailInfo(id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            const cocktailInfoDiv = document.createElement("div");
            cocktailInfoDiv.innerHTML = `<h2>${data.drinks[0].strDrink}</h2><p>${data.drinks[0].strInstructions}</p><h3>Ingredients:</h3><ul>`;
            for (let i = 1; i <= 15; i++) {
                if (data.drinks[0][`strIngredient${i}`]) {
                    cocktailInfoDiv.innerHTML += `<li>${data.drinks[0][`strIngredient${i}`]}</li>`;
                }
            }
            cocktailInfoDiv.innerHTML += "</ul>";
  
          
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then(response => response.json())
                .then(data => {
                    const cocktail = data.drinks[0];
                    const cocktailImage = document.createElement("img");
                    cocktailImage.src = cocktail.strDrinkThumb;
                    cocktailImage.alt = cocktail.strDrink;
                    cocktailInfoDiv.appendChild(cocktailImage);
                });
  
            const newWindow = window.open("", "_self");
            newWindow.document.body.innerHTML = cocktailInfoDiv.innerHTML;
        });
  }

  

   


  