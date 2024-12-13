// Login.test.js

// Mock the window.alert function
global.alert = jest.fn();

// Mock the window.location object
const windowLocationMock = {
    assign: jest.fn(),
    href: '',
};
global.window = { ...global.window, location: windowLocationMock };

// Import the selected code
const { default: Login } = require('./Login');

// Unit test for the selected code
test('Handles empty email and password fields gracefully', () => {
    // Create a new DOM element for the form
    const form = document.createElement('form');
    form.id = 'loginForm';

    // Create a new DOM element for the email input
    const emailInput = document.createElement('input');
    emailInput.name = 'email';
    emailInput.value = ''; // Set the email input value to empty

    // Create a new DOM element for the password input
    const passwordInput = document.createElement('input');
    passwordInput.name = 'password';
    passwordInput.value = ''; // Set the password input value to empty

    // Append the email and password inputs to the form
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    // Simulate form submission
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    // Expect an alert to be displayed
    expect(alert).toHaveBeenCalledWith('An error occurred while logging in. Please try again.');
    // Expect the form to not be submitted (preventDefault should be called)
    expect(form.onsubmit).not.toHaveBeenCalled();
    // Expect the window.location.href not to be set
    expect(windowLocationMock.href).toBe('');
});

test('Navigates to "profile.html" when the login is successful', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: 'Login successful', user: { id: 1, email: 'test@example.com' } }),
    });

    // Create a new DOM element for the form
    const form = document.createElement('form');
    form.id = 'loginForm';

    // Create a new DOM element for the email input
    const emailInput = document.createElement('input');
    emailInput.name = 'email';
    emailInput.value = 'test@example.com';

    // Create a new DOM element for the password input
    const passwordInput = document.createElement('input');
    passwordInput.name = 'password';
    passwordInput.value = 'password123';

    // Append the email and password inputs to the form
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    // Simulate form submission
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    // Wait for the async code to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Expect the window.location.href to be set to "profile.html"
    expect(windowLocationMock.href).toBe('profile.html');
});