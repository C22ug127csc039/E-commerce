function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();

// Login  logout

let user = localStorage.getItem("user");

let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logoutBtn");
let usernameDisplay = document.getElementById("usernameDisplay");

// Check login status
if (user) {
  // Logged in
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  // usernameDisplay.innerText = "Hi, " + user;
} else {
  // Not logged in
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  // usernameDisplay.innerText = "";
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  alert("Logged out!");
  window.location.href = "login.html";
}


// Newsletter 
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let error = document.getElementById("error");

  if (email === "") {
    error.innerText = "Email is required!";
  } else if (!email.includes("@")) {
    error.innerText = "Enter valid email!";
  } else {
    alert("Subscribed successfully!");
    
    // Reset input
    document.getElementById("newsletterForm").reset();
  }
});


