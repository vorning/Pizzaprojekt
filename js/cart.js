// Opret en variabel til at holde styr på produkterne i kurven
let cart = [];

// Tilføj event listener til at sikre, at koden kun kører, når DOM'en er klar
document.addEventListener('DOMContentLoaded', function() {
    // Kald funktionen til at indlæse kurven fra localStorage når siden indlæses
    loadCartFromStorage();

    // Kald funktionen til at opdatere visningen af kurven på ordresiden
    updateCartViewOnOrderPage();
});

// Funktion til at indlæse kurven fra localStorage
function loadCartFromStorage() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Funktion til at opdatere visningen af kurven på menu-siden
function updateCartView() {
    let cartCount = document.getElementById('cart-count');
    let cartTotal = document.getElementById('cart-total');
    let totalCount = 0;
    let totalCost = 0;

    // Loop gennem hvert produkt i kurven for at opdatere antallet og den samlede pris
    cart.forEach(product => {
        totalCount += product.quantity;
        totalCost += product.totalPrice;
    });

    // Opdater HTML-elementer med oplysninger om kurven
    cartCount.textContent = totalCount;
    cartTotal.textContent = totalCost;
}

// Funktion til at tilføje produkt til kurven
function addToCart(name, price) {
    let existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        // Hvis produktet allerede findes, opdater antallet og den samlede pris
        existingProduct.quantity++;
        existingProduct.totalPrice += price;
    } else {
        // Hvis produktet ikke findes, tilføj det til kurven
        cart.push({
            name: name,
            price: price,
            quantity: 1,
            totalPrice: price
        });
    }

    // Gem kurven i localStorage og opdater visningen af kurven på menu-siden
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartView();
}

// Kald funktionen til at indlæse kurven fra localStorage når siden indlæses
loadCartFromStorage();

// Funktion til at opdatere visningen af kurven på ordresiden
function updateCartViewOnOrderPage() {
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotalElement = document.getElementById('cart-total');
    let cartTotal = 0;

    // Ryd tidligere kurvens indhold
    cartItemsContainer.innerHTML = '';

    // Loop gennem hvert produkt i kurven for at opdatere visningen
    cart.forEach(product => {
        let itemElement = document.createElement('li');
        itemElement.textContent = `${product.name} - Antal: ${product.quantity} - Pris: ${product.totalPrice} kr.`;

        // Opret knapper til at fjerne og tilføje flere af produktet
        let removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => removeOneFromCart(product.name)); // Tilføj event listener til fjern-knappen
        itemElement.appendChild(removeButton);

        let addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => addOneToCart(product.name)); // Tilføj event listener til tilføj-knappen
        itemElement.appendChild(addButton);

        cartItemsContainer.appendChild(itemElement);

        // Opdater den samlede pris
        cartTotal += product.totalPrice;
    });

    // Opdater den samlede pris på siden
    cartTotalElement.textContent = cartTotal;
}

// Kald funktionen til at opdatere visningen af kurven på ordresiden
updateCartViewOnOrderPage();

// Funktion til at fjerne et styk af det valgte produkt fra kurven
function removeOneFromCart(name) {
    let productIndex = cart.findIndex(product => product.name === name);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity === 1) {
            cart.splice(productIndex, 1); // Fjern produktet fra kurven, hvis der kun er én tilbage
        } else {
            cart[productIndex].quantity--; // Reducér antallet af produktet med én
            cart[productIndex].totalPrice -= cart[productIndex].price; // Opdater den totale pris
        }

        // Gem kurven i localStorage og opdater visningen af kurven
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartView();
    }
}


// Funktion til at tilføje et styk af det valgte produkt til kurven
function addOneToCart(name) {
    let productIndex = cart.findIndex(product => product.name === name);

    if (productIndex !== -1) {
        cart[productIndex].quantity++; // Tilføj én til antallet af produktet
        cart[productIndex].totalPrice += cart[productIndex].price; // Opdater den totale pris

        // Gem kurven i localStorage og opdater visningen af kurven
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartView();
    }
}
