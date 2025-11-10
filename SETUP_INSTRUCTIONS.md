# Registration & Login Setup Instructions

All the code has been implemented! Here's what you need to do to get everything running:

## Backend Setup (Laravel)

### 1. Configure Environment
Create/update your `.env` file in the `backend` folder:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 2. Run Migrations
```bash
cd backend
php artisan migrate:fresh
```

This will create the users table with the new `address` field.

### 3. Configure CORS
Make sure your `config/cors.php` allows requests from your React frontend:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'], // Vite default port
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### 4. Start Laravel Server
```bash
php artisan serve
```

The backend will run on `http://localhost:8000`

## Frontend Setup (React)

### 1. Create Environment File
Copy the example file and create your own `.env`:
```bash
cd frontend
copy .env.example .env
```

The `.env` file should contain:
```
VITE_API_URL=http://localhost:8000/api
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is taken)

## What Was Implemented

### Backend (Laravel)
✅ **User Model** - Added `address` and `role` fields to fillable array, added `HasApiTokens` trait
✅ **Migration** - Updated users table to include `address` field
✅ **AuthController** - Created with 4 methods:
  - `register()` - Register new users
  - `login()` - Authenticate users
  - `logout()` - Log out users
  - `me()` - Get authenticated user data
✅ **API Routes** - Set up authentication endpoints:
  - `POST /api/register`
  - `POST /api/login`
  - `POST /api/logout` (protected)
  - `GET /api/me` (protected)

### Frontend (React)
✅ **API Service** (`src/services/api.js`) - Axios instance with interceptors for token management
✅ **Auth Context** (`src/context/AuthContext.jsx`) - Global authentication state management
✅ **RegisterPage** - Updated with:
  - Split name into `first_name` and `last_name` fields
  - Added `address` field
  - Full API integration
  - Error handling and validation
  - Loading states
✅ **LoginPage** - Updated with:
  - Full API integration
  - Error handling
  - Loading states
✅ **Main App** - Wrapped with `AuthProvider`

### Documentation
✅ **ai-context.md** - Updated schema to include `address` field

## Testing the Implementation

### 1. Test Registration
1. Navigate to `http://localhost:5173/register`
2. Fill in all fields:
   - First Name
   - Last Name
   - Email
   - Address
   - Password
   - Accept Terms & Policy
3. Click "Register"
4. You should be redirected to the home page and logged in

### 2. Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter your email and password
3. Click "Log In"
4. You should be redirected to the home page and logged in

### 3. Verify Token Storage
Open browser DevTools → Application → Local Storage
You should see:
- `auth_token` - Your authentication token
- `user` - Your user data (JSON)

## API Response Examples

### Successful Registration
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "role": "user"
  },
  "token": "1|abc123..."
}
```

### Successful Login
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "role": "user"
  },
  "token": "2|xyz789..."
}
```

### Validation Error
```json
{
  "success": false,
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

## Next Steps

1. **Protected Routes** - You may want to create a ProtectedRoute component to guard routes that require authentication
2. **User Dashboard** - Update the UserDashboard to display user information from the auth context
3. **Logout Functionality** - Add logout buttons in your Navbar or user menu
4. **Password Reset** - Implement forgot password functionality
5. **Admin Panel** - Create admin-only routes and components

## Troubleshooting

### CORS Errors
- Make sure Laravel CORS config allows your frontend origin
- Check that credentials are supported

### 401 Unauthorized
- Token might be expired or invalid
- Check that the token is being sent in the Authorization header

### Database Errors
- Make sure PostgreSQL is running
- Verify database credentials in `.env`
- Run migrations: `php artisan migrate:fresh`

### React Errors
- Make sure all dependencies are installed: `npm install`
- Check that `.env` file exists with correct API URL
- Verify axios is installed: `npm list axios`
