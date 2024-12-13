document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-email").textContent = user.email;
    } else {
        alert("No user data found. Please log in.");
        window.location.href = "login.html"; 
    }
});
