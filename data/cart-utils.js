// cart-utils.js
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const countSpan = document.getElementById("indicator");
    if (!countSpan) return;

    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countSpan.innerHTML = totalItems;

    // Hide badge if 0
    countSpan.style.display = totalItems === 0 ? "none" : "inline-block";
    console.log(totalItems);
}

// Run on page load
updateCartCount();

