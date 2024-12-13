document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(result.user));
            alert(result.message);
            window.location.href = "profile.html"; 
        } else {
            alert(`Login failed: ${result.message}`);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred while logging in. Please try again.");
    }
});
