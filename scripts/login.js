// A JavaScript object that holds your user data, acting as a local database.
const usersData = {
  "users": [
    { "username": "sakhekile", "password": "12345" },
    { "username": "admin", "password": "admin@123" }
  ]
};

// Function to handle the login logic
function login() {
  // Get the form and input values
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // Find a user that matches both the username and password
  const user = usersData.users.find(
    (u) => u.username === usernameInput && u.password === passwordInput
  );

  // Check if a user was found
  if (user) {
    alert("Login successful!");
    // Redirect to the home page or dashboard
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password");
  }
}

// Add an event listener to the form to handle submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the default form submission behavior (page reload)
  login(); // Call the login function
});