$(document).ready(function () {
    // Generate a random number captcha
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        $('#captcha').text(`${num1} + ${num2}`);
        return num1 + num2;
    }

    // Store the correct captcha answer
    let correctCaptcha = generateCaptcha();

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
                equalTo: function () {
                    return correctCaptcha.toString();
                }
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
                required: "Please solve the captcha",
                equalTo: "Incorrect captcha, please try again"
            }
        },
        submitHandler: function (form) {
            alert("Registration successful!");
            form.reset();
            correctCaptcha = generateCaptcha(); 
        }
    });
});
