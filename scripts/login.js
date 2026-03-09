function signInButton() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check username & password
    if (username === "admin" && password === "admin1234") {
        alert("Sign-in successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password.");
    }
}