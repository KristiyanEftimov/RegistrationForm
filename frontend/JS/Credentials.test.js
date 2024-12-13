//Credentials.test.js

// Import required libraries
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const { document } = window;

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock alert function
global.alert = jest.fn();

// Mock window.location.href
delete window.location;
window.location = { href: "" };

// Import the selected code
const { default: Credentials } = require("./Credentials");

// Unit test for the selected code
test("Should display an alert when the user is not logged in", () => {
    // Mock localStorage.getItem to return null (user not logged in)
    localStorageMock.getItem.mockReturnValueOnce(null);

    // Create a new DOM element for the form
    const form = document.createElement("form");
    form.id = "credentialsForm";

    // Simulate form submission
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    // Expect an alert to be displayed
    expect(alert).toHaveBeenCalledWith("You are not logged in. Redirecting to login page.");
});

// Test case: Should prevent form submission when the email field is empty
test("Should prevent form submission when the email field is empty", () => {
    // Mock localStorage.getItem to return a user object (user is logged in)
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ id: 1, email: "test@example.com" }));

    // Create a new DOM element for the form
    const form = document.createElement("form");
    form.id = "credentialsForm";

    // Create a new DOM element for the email input
    const emailInput = document.createElement("input");
    emailInput.id = "new-email";
    emailInput.value = ""; // Set the email input value to empty

    // Append the email input to the form
    form.appendChild(emailInput);

    // Simulate form submission
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    // Expect the form to not be submitted (preventDefault should be called)
    expect(form.onsubmit).not.toHaveBeenCalled();
});

// Test case: Should prevent form submission when the password field is empty
test("Should prevent form submission when the password field is empty", () => {
    // Mock localStorage.getItem to return a user object (user is logged in)
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ id: 1, email: "test@example.com" }));

    // Create a new DOM element for the form
    const form = document.createElement("form");
    form.id = "credentialsForm";

    // Create a new DOM element for the password input
    const passwordInput = document.createElement("input");
    passwordInput.id = "new-password";
    passwordInput.value = ""; // Set the password input value to empty

    // Append the password input to the form
    form.appendChild(passwordInput);

    // Simulate form submission
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    // Expect the form to not be submitted (preventDefault should be called)
    expect(form.onsubmit).not.toHaveBeenCalled();
});