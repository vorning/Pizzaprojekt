let quantities = {}; // Et objekt til at gemme antallet af pizzaer

function increaseQuantity(id) {
    let input = document.getElementById("quantity" + id);
    let quantity = parseInt(input.value) + 1;
    input.value = quantity;
    quantities[id] = quantity;
}

function decreaseQuantity(id) {
    let input = document.getElementById("quantity" + id);
    let quantity = parseInt(input.value) - 1;
    if (quantity < 0) quantity = 0;
    input.value = quantity;
    quantities[id] = quantity;
}

function placeOrder() {
    // Send ordren med antallet af pizzaer (quantities objektet)
    console.log(quantities);
}
