let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  let tbody = document.getElementById("cart-body");
  let total = 0;

  tbody.innerHTML = "";

  if (cart.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3'>Cart is empty</td></tr>";
    document.getElementById("total-price").innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${item.image}" width="60" height="60">
          <div>
            <h6>${item.name}</h6>
            <p class="text-success mb-0">₹${item.price}</p>
          </div>
        </div>
      </td>

      <td>
        <button onclick="decreaseQty(${index})" class="btn btn-sm btn-danger">-</button>
        ${item.qty}
        <button onclick="increaseQty(${index})" class="btn btn-sm btn-success">+</button>
      </td>

      <td>
        <button onclick="removeItem(${index})" class="btn btn-warning btn-sm">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  document.getElementById("total-price").innerText = "Total: ₹" + total;

  // ✅ ALWAYS SAVE
  localStorage.setItem("cart", JSON.stringify(cart));
}


// 🔁 Increase
function increaseQty(index) {
  cart[index].qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 🔁 Decrease
function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ❌ Remove
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


// Checkout
function checkout() {
  let user = localStorage.getItem("user");

  if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  if (confirm("Confirm your order?")) {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  }
}

renderCart();