let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    updateCartView();
    document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
    updateFooterCartInfo(); // Tilføj denne linje

    // Event listeners for tilføjelse/fjernelse af produkter
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'), 10);
            addToCart(name, price);
        });
    });
});

// Funktion til at indlæse kurven fra localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartCount(); // Denne funktion bliver kaldt for at sikre, at antallet opdateres ved indlæsning
}

// Funktion til at gemme den aktuelle kurv til localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateFooterCartInfo(); // Opdaterer info i footeren hver gang kurven ændres
}

// Funktion til at opdatere visningen af kurven
function updateCartView() {
    cleanCart(); // Rens kurven for eventuelle ugyldige produkter
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let totalCost = 0;

    // Ryd eksisterende indhold
    cartItemsContainer.innerHTML = '';

    // Genopret kurvens indhold
    cart.forEach(product => {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
            ${product.name} - Pris: ${product.price} kr. 
            <button class="remove-button" data-name="${product.name}">-</button>
            <span class="quantity" data-name="${product.name}">${product.quantity}</span>
            <button class="add-button" data-name="${product.name}" data-price="${product.price}">+</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalCost += product.price * product.quantity;
    });

    // Opdater den samlede pris
    cartTotalElement.textContent = `${totalCost} kr.`;
}

function updateCartCount() {
    // Denne funktion er god til at opdatere antallet af varer i kurven på alle sider
    const totalCount = cart.reduce((total, product) => total + product.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => element.textContent = totalCount);
}

function updateFooterCartInfo() {
    // Ny funktion til at opdatere kurvens info i footeren
    updateCartCount(); // Opdaterer det samlede antal varer i kurven
    const totalCost = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    const cartTotalElements = document.querySelectorAll('.cart-total');
    cartTotalElements.forEach(element => element.textContent = `Total: ${totalCost} kr.`);
}

// Funktion til at tilføje et produkt til kurven
function addToCart(name, price) {
    const productIndex = cart.findIndex(product => product.name === name);
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCartToStorage();
    updateCartView();
}

// Funktion til at fjerne et produkt fra kurven
function removeOneFromCart(name) {
    const productIndex = cart.findIndex(product => product.name === name);
    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }
    }
    saveCartToStorage();
    updateCartView();
}

// Tilføj event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    updateCartView();

    document.getElementById('cart-items').addEventListener('click', event => {
        const target = event.target;
        const name = target.dataset.name;
        const price = parseInt(target.dataset.price, 10);

        if (target.matches('.add-button')) {
            addToCart(name, price);
        } else if (target.matches('.remove-button')) {
            removeOneFromCart(name);
        }
    });
});

function cleanCart() {
    cart = cart.filter(product => product.name && product.price > 0);
    saveCartToStorage();
}

function emptyCart() {
    cart = []; // Sætter kurven til en tom liste
    saveCartToStorage();
    updateCartView(); // Opdaterer kurvens visning
    updateFooterCartInfo(); // Opdaterer kurvens info i footeren, hvis nødvendigt
}
