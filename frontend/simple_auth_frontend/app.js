// API URLs
const API_BASE_URL = 'http://localhost:8000/api';
const AUTH_ENDPOINTS = {
    login: `${API_BASE_URL}/auth/login/`,
    register: `${API_BASE_URL}/auth/register/`,
    logout: `${API_BASE_URL}/auth/logout/`,
    welcome: `${API_BASE_URL}/auth/welcome/`
};

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const authContainer = document.getElementById('auth-container');
const welcomeContainer = document.getElementById('welcome-container');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Event Listeners
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginError.textContent = '';
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    registerError.textContent = '';
});

loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
logoutBtn.addEventListener('click', handleLogout);

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', checkAuthStatus);

// Functions
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        fetchWelcomeMessage(token);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    loginError.textContent = '';
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(AUTH_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show welcome screen
            showWelcomeScreen(data.user.first_name);
            loginForm.reset();
        } else {
            loginError.textContent = data.non_field_errors || 'Invalid credentials';
        }
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'An error occurred. Please try again.';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    registerError.textContent = '';
    
    const userData = {
        first_name: document.getElementById('register-first-name').value,
        last_name: document.getElementById('register-last-name').value,
        username: document.getElementById('register-username').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
        password2: document.getElementById('register-password2').value
    };
    
    try {
        const response = await fetch(AUTH_ENDPOINTS.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show welcome screen
            showWelcomeScreen(data.user.first_name);
            registerForm.reset();
        } else {
            // Display error message
            const errorMessage = Object.values(data).flat().join('\n');
            registerError.textContent = errorMessage || 'Registration failed';
        }
    } catch (error) {
        console.error('Registration error:', error);
        registerError.textContent = 'An error occurred. Please try again.';
    }
}

async function handleLogout() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(AUTH_ENDPOINTS.logout, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        
        if (response.ok) {
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Show auth container
            authContainer.style.display = 'block';
            welcomeContainer.style.display = 'none';
            
            // Reset forms
            loginForm.reset();
            registerForm.reset();
            loginError.textContent = '';
            registerError.textContent = '';
            
            // Set active tab to login
            loginTab.click();
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

async function fetchWelcomeMessage(token) {
    try {
        const response = await fetch(AUTH_ENDPOINTS.welcome, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const user = JSON.parse(localStorage.getItem('user')) || {};
            showWelcomeScreen(user.first_name || 'User');
        } else {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    } catch (error) {
        console.error('Error fetching welcome message:', error);
    }
}

function showWelcomeScreen(firstName) {
    authContainer.style.display = 'none';
    welcomeContainer.style.display = 'block';
    userName.textContent = firstName;
} 