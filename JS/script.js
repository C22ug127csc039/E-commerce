// ================= CART =================

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  let el = document.getElementById("cart-count");
  if (el) el.innerText = totalQty;
}

updateCartCount();


// ================= WISHLIST =================

function toggleWishlist(name, price, image, element) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  let index = wishlist.findIndex(item => item.name === name);
  let icon = element.querySelector("i");

  if (index === -1) {
    wishlist.push({ name, price, image });
    icon.classList.add("text-danger");
  } else {
    wishlist.splice(index, 1);
    icon.classList.remove("text-danger");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


// highlight hearts on reload
function highlightWishlist() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  document.querySelectorAll(".wishlist").forEach(btn => {
    let name = btn.getAttribute("data-name");
    let icon = btn.querySelector("i");

    let exists = wishlist.find(item => item.name === name);

    if (exists) {
      icon.classList.add("text-danger");
    } else {
      icon.classList.remove("text-danger");
    }
  });
}

highlightWishlist();


// ================= Search  =================

function searchProduct(event) {
  event.preventDefault();

  let input = document.getElementById("searchInput").value.toLowerCase();
  let sections = document.querySelectorAll("#productSection > div"); // men, women, kids
  let found = false;

  sections.forEach(section => {
    let cards = section.querySelectorAll(".card");
    let sectionMatch = false;

    cards.forEach(card => {
      let title = card.querySelector(".card-title").innerText.toLowerCase();

      if (title.includes(input)) {
        card.style.display = "block";
        sectionMatch = true;
        found = true;
      } else {
        card.style.display = "none";
      }
    });

    // Hide whole section if no product inside matches
    section.style.display = sectionMatch ? "" : "none";
  });

  // If nothing found → show all again
  if (!found) {
    alert("No product found");

    sections.forEach(section => {
      section.style.display = "block";
      section.querySelectorAll(".card").forEach(card => {
        card.style.display = "";
      });
    });
  }

  document.getElementById("productSection").scrollIntoView({
    behavior: "smooth",
  });
}

// ================= LOGIN / LOGOUT =================

function handleAuthUI() {
  let user = localStorage.getItem("user");

  let loginBtn = document.getElementById("loginBtn");
  let logoutBtn = document.getElementById("logoutBtn");

  // Safe check (prevents null error)
  if (!loginBtn || !logoutBtn) return;

  if (user) {
    // Logged in
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    // Not logged in
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  handleAuthUI();
  highlightWishlist();
  updateCartCount();
});


// Logout function
function logout() {
  localStorage.removeItem("user");

  alert("Logged out!");

  // refresh UI instantly
  handleAuthUI();

  // optional redirect
  window.location.href = "./login.html";
}

// ================= SAFE NEWSLETTER =================

let form = document.getElementById("newsletterForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let error = document.getElementById("error");

    if (email === "") {
      error.innerText = "Email is required!";
    } else if (!email.includes("@")) {
      error.innerText = "Enter valid email!";
    } else {
      alert("Subscribed successfully!");
      form.reset();
    }
  });
}