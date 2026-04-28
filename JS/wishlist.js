let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function renderWishlist() {
  let tbody = document.getElementById("wishlist-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (wishlist.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3'>Wishlist is empty</td></tr>";
    return;
  }

  wishlist.forEach((item, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${item.image}" width="60">
          <h6>${item.name}</h6>
        </div>
      </td>

      <td>₹${item.price}</td>

      <td>
        <button onclick="addToCartFromWishlist(${index})" class="btn btn-success btn-sm">
          Add to Cart
        </button>

        <button onclick="removeWishlist(${index})" class="btn btn-danger btn-sm">
          Remove
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}


// ✅ ADD TO CART (instant navbar update)
function addToCartFromWishlist(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = wishlist[index];

  let existing = cart.find(p => p.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // 🔥 instant update
}


// ❌ REMOVE
function removeWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}


// INIT
renderWishlist();
updateCartCount();