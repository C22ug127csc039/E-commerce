document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();           

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("error");

  if (!username || !password) {
    error.innerText = "All fields required!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(user => user.username === username);

  if (exists) {
    error.innerText = "User already exists!";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully!");
  window.location.href = "login.html";
});