// Load cart from localStorage
let cart = getCart();
console.log(cart)
// Reference to container in order.html
const orderContainer = document.getElementById("cart-items");

// Render cart items
function renderCart() {
    orderContainer.innerHTML = ""; // clear old content

    if (cart.length === 0) {
        orderContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    } 

    cart.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("cart-item");

        row.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <div class="quantity">
                    <button class="subtracting">-</button>
                    <t class="qntyResult" style="padding-left: 5px; padding-right: 5px">${item.quantity}</t>
                    <button class="adding">+</button>
                </div>
            </div>
            <button class="remove-item"><i class="fas fa-trash"></i></button>
        `;

        // Handle removal
        row.querySelector(".remove-item").addEventListener("click", () => {
            removeFromCart(item.id);
        });

        // Handle addition and Subtraction of Quantity
        row.querySelector(".subtracting").addEventListener("click", () => {
            item.quantity = subtractQuantity(item.quantity);
            row.querySelector(".qntyResult").innerHTML = item.quantity; 
            
            // updating even in cart array
            const cartIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            if (cartIndex !== -1) {
                cart[cartIndex].quantity = item.quantity;
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            // Recalculate totals
            updateTotals();

        });
        row.querySelector(".adding").addEventListener("click", () => {
            item.quantity = addingQuantity(item.quantity);
            row.querySelector(".qntyResult").innerHTML = item.quantity; 

            // updating even in cart array
            const cartIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            if (cartIndex !== 21) {
                cart[cartIndex].quantity = item.quantity;
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            // Recalculate totals
            updateTotals();
        });

        orderContainer.appendChild(row);
    });
    
    // Show total
    const  orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const subTotal = document.getElementById("subtotal");
    subTotal.innerHTML = `Ksh ${orderTotal}` ;  
    
    const grandTotalCost = orderTotal + 50;
    const grandTotal = document.getElementById("total");
    grandTotal.innerHTML = `Ksh ${grandTotalCost}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function subtractQuantity(quantity) {
    return quantity > 1 ? quantity - 1 : 1;
}

function addingQuantity(quantity) {
    if (quantity < 20) {
        return quantity + 1;   // increase by 1
    }
    return 20;
}

function updateTotals() {
    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subTotal = document.getElementById("subtotal");
    const grandTotal = document.getElementById("total");

    subTotal.innerHTML = `Ksh ${orderTotal}`;
    grandTotal.innerHTML = `Ksh ${orderTotal + 50}`; // assuming 50 is delivery
}


// Initial render
renderCart();