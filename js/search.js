const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const allPizzas = document.querySelectorAll(".pizza");

// Lyt efter inputbegivenheden på søge-inputfeltet
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();
  filterPizzas(searchTerm);
});

// Lyt efter klik på søgeknappen
searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();
  filterPizzas(searchTerm);
});

// Funktion til filtrering af pizzaer baseret på søgning
function filterPizzas(searchTerm) {
  allPizzas.forEach(function (pizza) {
    const pizzaName = pizza.querySelector("h2").innerText.toLowerCase();
    const pizzaBox = pizza.closest(".pizza-box");

    if (pizzaName.includes(searchTerm)) {
      pizza.style.visibility = "visible";
      pizzaBox.style.visibility = "visible";
    } else {
      pizza.style.visibility = "hidden";
      pizzaBox.style.visibility = "hidden";
    }
  });
}

function searchPizza() {
  var input, filter, pizzas, pizzaName, i;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  pizzas = document.getElementsByClassName("pizza");

  for (i = 0; i < pizzas.length; i++) {
    pizzaName = pizzas[i].getElementsByTagName("h2")[0];
    if (pizzaName.innerText.toUpperCase().indexOf(filter) > -1) {
      pizzas[i].style.display = "";
    } else {
      pizzas[i].style.display = "none";
    }
  }
}
