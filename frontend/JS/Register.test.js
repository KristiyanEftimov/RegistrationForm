// Register.test.js

// Mock jQuery and jQuery validation plugin
const $ = require('jquery');
const { default: jQueryValidator } = require('jquery-validation');
$.validator = jQueryValidator;

// Mock fetch API
const fetchMock = require('fetch-mock');
fetchMock.mock('http://localhost:8000/register', {
    status: 200,
    body: { message: 'Registration successful' },
});

// Mock alert function
global.alert = jest.fn();

// Import the selected code
require('./Register');

// Unit test for the selected code
test('Validates the form with all fields filled correctly', async () => {
    // Fill in form inputs
    $('#name').val('John Doe');
    $('#email').val('johndoe@example.com');
    $('#password').val('password123');
    $('#captchaInput').val('3');

    // Simulate form submission
    $('#registerForm').submit();

    // Wait for the fetch request to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Expect the form to be reset
    expect($('#registerForm')[0]).toBeEmptyForm();

    // Expect an alert to be displayed with success message
    expect(alert).toHaveBeenCalledWith('Registration successful');

    // Expect the captcha to be regenerated
    expect(document.getElementById('captcha').textContent).not.toBe('3 + 2');
});

test('Displays an error message when the name field is empty', async () => {
    // Fill in form inputs with empty name
    $('#name').val('');
    $('#email').val('johndoe@example.com');
    $('#password').val('password123');
    $('#captchaInput').val('3');

    // Simulate form submission
    $('#registerForm').submit();

    // Wait for the fetch request to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Expect an alert to be displayed with error message
    expect(alert).toHaveBeenCalledWith('Error: Name is required');
});


test('Displays an error message when the email field is not a valid email address', async () => {
    // Fill in form inputs with invalid email
    $('#email').val('invalid_email');
    $('#password').val('password123');
    $('#captchaInput').val('3');

    // Simulate form submission
    $('#registerForm').submit();

    // Wait for the fetch request to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Expect an alert to be displayed with error message
    expect(alert).toHaveBeenCalledWith('Please enter a valid email address');
});

test("Should display an error message when the password field is less than 6 characters", async () => {
    // Fill in form inputs with password less than 6 characters
    $('#name').val('John Doe');
    $('#email').val('johndoe@example.com');
    $('#password').val('pass');
    $('#captchaInput').val('3');

    // Simulate form submission
    $('#registerForm').submit();

    // Wait for the fetch request to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Expect an alert to be displayed with error message
    expect(alert).toHaveBeenCalledWith('Your password must be at least 6 characters long');
});

test('Displays an error message when the captcha input is incorrect', async () => {
    // Fill in form inputs with incorrect captcha
    $('#name').val('John Doe');
    $('#email').val('johndoe@example.com');
    $('#password').val('password123');
    $('#captchaInput').val('4'); // Incorrect captcha

    // Simulate form submission
    $('#registerForm').submit();

    // Wait for the fetch request to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Expect an alert to be displayed with error message
    expect(alert).toHaveBeenCalledWith('Incorrect captcha, please try again');
});