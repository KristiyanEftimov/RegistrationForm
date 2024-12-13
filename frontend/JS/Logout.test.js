// Logout.test.js

// Mock the localStorage object
const localStorageMock = {
    removeItem: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
};
global.localStorage = localStorageMock;

// Import the logout function
const { logout } = require('./Logout');

// Test the logout function
test('Removes the "user" item from localStorage when called', () => {
    logout();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
});

// Mock the window.location object
const windowLocationMock = {
    assign: jest.fn(),
    href: '',
};
global.window = { ...global.window, location: windowLocationMock };

// Test the logout function
test('Redirects to "login.html" after removing "user" item from localStorage', () => {
    logout();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(windowLocationMock.href).toBe('login.html');
});