const menuItems = [
    {
        id: "mi-001",
        name: "Ugali na Sukuma",
        description: "Kenyan staple with maize meal and collard greens.",
        price: 150,
        image: "https://img-global.cpcdn.com/recipes/e44f803244dcd038/680x482cq70/sukuma-wiki-ugalilocalfoodcontest_kisumu-recipe-main-photo.jpg"
    },
    {
        id: "mi-002",
        name: "Nyama Choma",
        description: "Grilled goat meat, a Kenyan favorite.",
        price: 500,
        image: "https://diethood.com/wp-content/uploads/2023/05/new-york-strip-steak-13-600x800.jpg"
    },
    {
        id: "mi-003",
        name: "Pilau",
        description: "Spiced rice dish cooked with beef and Kenyan spices.",
        price: 300,
        image: "https://www.kenyans.co.ke/files/images/news/beef_pilau_rice.jpg"
    },
    {
        id: "mi-004",
        name: "Chapati",
        description: "Soft layered flatbread, perfect with stews.",
        price: 50,
        image: "https://nilepost.co.ug/wp-content/uploads/2021/01/Chapati.jpg"
    },
    {
        id: "mi-005",
        name: "Mandazi",
        description: "Sweet fried dough, a popular Kenyan snack.",
        price: 30,
        image: "https://formationsofanoblewoman.com/wp-content/uploads/2023/05/20230519_082816_00001-768x432.png"
    },
    {
        id: "mi-006",
        name: "Samosa",
        description: "Crispy pastry stuffed with spiced beef or vegetables.",
        price: 100,
        image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/08/Best-Indian-Punjabi-Samosa-Recipe.jpg"
    },
    {
        id: "mi-007",
        name: "Fried Fish",
        description: "Whole deep-fried tilapia served with ugali and greens.",
        price: 650,
        image: "https://thumbs.dreamstime.com/b/kerala-food-homemade-fish-fry-authentic-recipe-tasty-roasted-exotic-spices-herbs-traditional-119378153.jpg"
    },
    {
        id: "mi-008",
        name: "Ndengu Soup",
        description: "Green gram soup seasoned with fresh herbs.",
        price: 150,
        image: "https://www.keepingthepeas.com/wp-content/uploads/2021/06/low-calorie-lentil-soup-2.jpg"
    }
];

const container = document.getElementById("menu-container");
let cart = getCart();
// localStorage.clear();

menuItems.forEach(item => {
    const dishCard = document.createElement("div");
    dishCard.classList.add("dish-card");

    dishCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="price">Ksh ${item.price}</span>
        <button class="add-to-cart" data-item-id="${item.id}"><i class="fas fa-cart-plus"></i> Add</button>
    `;

    

    container.appendChild(dishCard);
}); 
// Add event listener to the button
document.querySelectorAll(".add-to-cart")
    .forEach((button) => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.itemId;
            const item = menuItems.find(m => m.id == itemId);
            addToCart(item);
        });
    });
  
function addToCart(item) {
    const existing = cart.find(cartItemId => cartItemId.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(item);

}