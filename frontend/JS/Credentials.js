document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("credentialsForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("new-email").value;
        const password = document.getElementById("new-password").value;

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("You are not logged in. Redirecting to login page.");
            window.location.href = "login.html";
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/update_credentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user.id, email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                // Update localStorage with new email if changed
                if (email) user.email = email;
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error updating credentials:", error);
            alert("An error occurred while updating credentials. Please try again.");
        }
    });
});
