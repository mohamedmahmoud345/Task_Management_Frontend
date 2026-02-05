# Task Management React Frontend

A modern, production-ready React frontend application for managing tasks with a comprehensive feature set including authentication, task CRUD operations, filtering, sorting, and profile management.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC)

## Features

### 🔐 Authentication System
- User registration with validation
- User login with JWT token management
- Password strength indicator
- Remember me functionality
- Protected routes with automatic redirect
- Token expiration handling

### ✅ Task Management
- Create, read, update, and delete tasks
- Task properties:
  - Title (5-200 characters)
  - Description (max 300 characters)
  - Due date
  - Priority (LOW, MEDIUM, HIGH)
  - Status (TODO, IN_PROGRESS, COMPLETED)
- Real-time character counters
- Form validation with error messages

### 🎯 Advanced Features
- **Task Filtering**: Filter by status, priority, and search by title
- **Task Sorting**: Sort by due date or priority
- **Task Statistics**: Visual dashboard with task counts and completion percentage
- **Due Date Warnings**: Color-coded badges for overdue, due today, and due soon tasks
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Success, error, and info messages
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Empty States**: Helpful messages when no tasks exist

### 👤 Profile Management
- View user information
- Upload profile photo with:
  - File type validation (JPG/PNG)
  - File size validation (max 10MB)
  - Drag and drop support
  - Image preview before upload
  - Upload progress indicator

### 🎨 UI/UX
- Clean, modern interface with Tailwind CSS
- Smooth animations and transitions
- Responsive navigation with hamburger menu on mobile
- Accessible components with ARIA labels
- Modal dialogs with keyboard support (ESC to close)
- Form validation with inline error messages

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running (see API Configuration below)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamedmahmoud345/Task_Management_Frontend.git
   cd Task_Management_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your API base URL:
   ```
   VITE_API_BASE_URL=https://localhost:7111
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (output in `dist/` folder)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx           # Navigation header with user menu
│   │   ├── Footer.tsx           # Footer component
│   │   └── Layout.tsx           # Main layout wrapper
│   ├── Tasks/
│   │   ├── TaskCard.tsx         # Individual task card
│   │   ├── TaskList.tsx         # Task list with grid layout
│   │   ├── TaskForm.tsx         # Create/edit task modal form
│   │   ├── TaskFilters.tsx      # Filtering and sorting controls
│   │   └── TaskStats.tsx        # Task statistics dashboard
│   ├── Profile/
│   │   ├── ProfileInfo.tsx      # User profile information display
│   │   └── PhotoUpload.tsx      # Profile photo upload component
│   ├── Auth/
│   │   ├── LoginForm.tsx        # Login form component
│   │   └── RegisterForm.tsx     # Registration form component
│   └── Common/
│       ├── Button.tsx           # Reusable button component
│       ├── Input.tsx            # Reusable input component
│       ├── Modal.tsx            # Modal dialog component
│       └── PrivateRoute.tsx     # Protected route wrapper
├── pages/
│   ├── Login.tsx                # Login page
│   ├── Register.tsx             # Registration page
│   ├── Dashboard.tsx            # Main task dashboard
│   └── Profile.tsx              # User profile page
├── services/
│   ├── api.ts                   # Axios instance with interceptors
│   ├── authService.ts           # Authentication API calls
│   ├── taskService.ts           # Task CRUD API calls
│   └── userService.ts           # User profile API calls
├── contexts/
│   ├── AuthContext.tsx          # Authentication state management
│   └── TaskContext.tsx          # Task state management
├── hooks/
│   ├── useAuth.ts               # Authentication hook
│   └── useTasks.ts              # Tasks hook
├── types/
│   ├── auth.types.ts            # Authentication type definitions
│   ├── task.types.ts            # Task type definitions
│   └── user.types.ts            # User type definitions
├── utils/
│   ├── constants.ts             # App constants and configuration
│   ├── validation.ts            # Validation functions
│   └── formatters.ts            # Date and text formatting utilities
├── App.tsx                      # Main app with routing
├── main.tsx                     # Application entry point
└── index.css                    # Global styles with Tailwind
```

## Technologies Used

### Core
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server

### Routing & State
- **React Router DOM 6.22.0** - Client-side routing
- **React Context API** - State management

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### HTTP & API
- **Axios 1.6.7** - HTTP client with interceptors

### UI Components & Icons
- **React Icons 5.0.1** - Icon library
- **React Toastify 10.0.4** - Toast notifications

### Utilities
- **date-fns 3.3.1** - Date formatting and manipulation

### Development
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## API Integration

### Base URL
Configure the backend API URL in `.env`:
```
VITE_API_BASE_URL=https://localhost:7111
```

### Authentication Flow
1. User logs in → receives JWT token
2. Token stored in localStorage
3. All API requests include `Authorization: Bearer {token}` header
4. On 401 response → user redirected to login

### Available Endpoints

#### Authentication
- `POST /api/Account/register` - Register new user
- `POST /api/Account/login` - Login user

#### Tasks
- `GET /api/Task` - Get all user tasks
- `GET /api/Task/{id}` - Get specific task
- `POST /api/Task` - Create new task
- `PUT /api/Task/{id}` - Update task
- `DELETE /api/Task/{id}` - Delete task

#### Profile
- `POST /api/User/upload-photo` - Upload profile photo
- `GET /api/User/profile-photo` - Get profile photo URL

### CORS Configuration
The backend API must have CORS enabled to allow requests from the frontend origin.

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - Upload the `dist/` folder to your hosting service
   - Common platforms: Vercel, Netlify, AWS S3, Azure Static Web Apps

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://localhost:7111` |

## Troubleshooting

### CORS Errors
- Ensure the backend API has CORS enabled
- Check that the API URL in `.env` is correct
- Verify the API is running and accessible

### Authentication Issues
- Clear browser localStorage: `localStorage.clear()`
- Check token expiration
- Verify backend authentication endpoints are working

### Build Errors
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 18.x or higher

### Development Server Not Starting
- Check if port 5173 is already in use
- Try `npm run dev -- --port 3000` to use a different port

## Code Quality

The project follows best practices:
- ✅ TypeScript for type safety
- ✅ Functional components with hooks
- ✅ Component composition and reusability
- ✅ Consistent naming conventions
- ✅ Error handling with try-catch
- ✅ Loading states and error messages
- ✅ Responsive design with mobile-first approach
- ✅ Accessible components with ARIA labels
- ✅ Clean code with proper formatting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Author

Mohamed Mahmoud

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please create an issue in the GitHub repository.
