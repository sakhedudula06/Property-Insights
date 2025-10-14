// A JavaScript object that holds your user data, acting as a local database.
const usersData = {
  "users": [
    { "username": "sakhekile", "password": "12345", "email": "kamvelihledudula@gmail.com"},
    { "username": "admin", "password": "admin@123", "email": "sakhekile.dudula@mrisoftware.com" }
  ]
};

function login() {

  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  const user = usersData.users.find(
    (u) => u.username === usernameInput && u.password === passwordInput
  );

  if (user) {
    alert("Login successful!");
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

function handleCostKeydown(event){
    if(event.key === 'Enter'){
    login();
  };
};