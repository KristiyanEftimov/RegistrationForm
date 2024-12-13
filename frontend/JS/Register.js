$(document).ready(function () {
    // Generate a random number captcha
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        $('#captcha').text(`${num1} + ${num2}`);
        return num1 + num2;
    }

    let correctCaptcha = generateCaptcha(); // Store the correct captcha

    // Custom validator for captcha
    $.validator.addMethod(
        "correctCaptcha",
        function (value, element) {
            return parseInt(value) === correctCaptcha;
        },
        "Incorrect captcha, please try again"
    );

    // Validate the form
    $('#registerForm').validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            captchaInput: {
                required: true,
                correctCaptcha: true
            }
        },
        messages: {
            name: "Please enter your name",
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            captchaInput: {
                required: "Please solve the captcha"
            }
        },
        submitHandler: async function (form) {
            const name = $('input[name="name"]').val();
            const email = $('input[name="email"]').val();
            const password = $('input[name="password"]').val();

            try {
                const response = await fetch('http://localhost:8000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message); 
                    form.reset();
                    correctCaptcha = generateCaptcha(); 
                } else {
                    alert(`Error: ${result.message}`); 
                }
            } catch (error) {
                alert("An error occurred while submitting your registration. Please try again.");
            }
        }
    });
});
