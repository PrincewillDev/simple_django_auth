# Simple Authentication Website

A simple authentication website built with Django REST Framework for the backend API and plain HTML/CSS/JavaScript for the frontend. This project demonstrates token-based authentication using Django REST Framework.

## Project Structure

```
simple_auth_website/
├── backend/
│   ├── simple_auth/
│   │   ├── authentication/  # Django app for auth functionality
│   │   ├── core/            # Django project settings
│   │   └── manage.py
│   ├── venv/                # Python virtual environment
│   └── requirements.txt     # Python dependencies
└── frontend/
    └── simple_auth_frontend/
        ├── index.html       # Frontend HTML
        ├── styles.css       # CSS styles
        └── app.js           # JavaScript for API interaction
```

## Backend Setup (Django REST Framework)

1. Create and activate the virtual environment:
   ```
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Apply migrations:
   ```
   cd simple_auth
   python manage.py migrate
   ```

4. Create a superuser (to access the admin panel):
   ```
   python manage.py createsuperuser
   ```

5. Run the development server:
   ```
   python manage.py runserver
   ```

The backend API will be available at http://localhost:8000/api/.

## API Endpoints

- **Register**: `POST /api/auth/register/`
- **Login**: `POST /api/auth/login/`
- **Logout**: `POST /api/auth/logout/`
- **Profile**: `GET /api/auth/profile/`
- **Welcome**: `GET /api/auth/welcome/`

## Frontend

The frontend is a simple HTML/CSS/JS application that interacts with the backend API. You can serve it using any web server, or simply open the `index.html` file in your browser.

For local development, you can use the Python built-in HTTP server:

```
cd frontend/simple_auth_frontend
python -m http.server
```

Then open http://localhost:8000 in your browser.

## Features

- User registration and login
- Token-based authentication
- Profile view and editing
- Responsive design
- Welcome message after successful authentication

## Technologies Used

- **Backend**:
  - Django
  - Django REST Framework
  - Token Authentication

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

## Usage

1. Start the backend server
2. Start the frontend server or open the HTML file directly
3. Register a new user or login with existing credentials
4. After successful authentication, you'll see a welcome message 