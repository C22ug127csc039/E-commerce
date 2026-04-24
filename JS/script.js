

// Add to cart
// cart count 

let cart = [];

function addToCart() {
  let productName=document.getElementById("men-shoe-1");
  let price=document.getElementById("price").value;
  let product = { name: productName, price: price };

  cart.push(product);

  alert(productName + " added to cart 🛒");

  console.log(cart);

  updateCartCount();

}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

// Newsletter 
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

  if (email === "") {
    error.textContent = "Email is required";
  } 
  else {
    error.textContent = "";
    alert("Subscribed successfully!");
    
    // Reset input
    document.getElementById("newsletterForm").reset();
  }
});


