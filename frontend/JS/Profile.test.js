// Profile.test.js

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Test the user data display
test("Should display user name and email when user data is present in local storage", () => {
    // Mock user data
    const user = { name: "John Doe", email: "johndoe@example.com" };
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(user));

    // Import the Profile.js file
    require("./Profile");

    // Check if user name and email are displayed
    expect(document.getElementById("user-name").textContent).toBe(user.name);
    expect(document.getElementById("user-email").textContent).toBe(user.email);
});

// Test the redirection to login page when no user data is found
test("Should redirect to login page when no user data is found in local storage", () => {
    // Mock no user data
    mockLocalStorage.getItem.mockReturnValueOnce(null);

    // Import the Profile.js file
    require("./Profile");

    // Check if window.location.href is set to login.html
    expect(window.location.href).toBe("login.html");
});
