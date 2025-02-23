
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
    let item = cart.find((product) => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    animateCartIcon();
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    cartList.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        count += item.quantity;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price} x 
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            ${item.quantity}
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="removeItem(${item.id})">🗑️</button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = count;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQuantity(id, delta) {
    let item = cart.find((product) => product.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}

function removeItem(id) {
    cart = cart.filter((product) => product.id !== id);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function toggleCart() {
    document.querySelector(".cart-panel").classList.toggle("active");
}

function animateCartIcon() {
    let cartIcon = document.querySelector(".cart-icon");
    cartIcon.classList.add("bounce");

    setTimeout(() => {
        cartIcon.classList.remove("bounce");
    }, 500);
}
 
updateCart();

function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    clearCart();
  }
  

function filterByCategory(event, category) {
    event.preventDefault(); // Prevent default anchor behavior
  
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
      const prodCategory = product.getAttribute("data-category");
      if (category === "all" || prodCategory === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
    // Clear search input when filtering by category
    document.getElementById("search-input").value = "";
  }
  
 