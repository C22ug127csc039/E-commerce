document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("error");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(
    user => user.username === username && user.password === password
  );

  if (!validUser) {
    error.innerText = "Invalid username or password!";
    return;
  }

  localStorage.setItem("user", username);

  alert("Login successful!");
  window.location.href = "cart.html";
});