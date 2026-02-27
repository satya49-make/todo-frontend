# 📝 Todo Frontend Application

A beautiful, modern **React 19 + Vite** todo application with full CRUD functionality, user authentication, and task management features.

## 🎨 Features

### ✅ Complete CRUD Operations
- **Create** tasks with title and description
- **Read** all tasks with filters (Pending, In Progress, Completed)
- **Update** task details, status, and progress
- **Delete** tasks with confirmation

### 🔐 Authentication
- User registration with email and password
- Secure login with JWT tokens
- Protected routes for authenticated users
- Automatic token persistence

### 📊 Task Management
- **Task Statuses**: PENDING, IN_PROGRESS, COMPLETED
- **Progress Tracking**: Set progress percentage (0-100%)
- **Timestamps**: Track creation and update times
- **Status Filtering**: Filter tasks by status
- **Statistics Dashboard**: View task counts by status

### 🎯 User Interface
- **Beautiful Gradient Design**: Modern purple-blue color scheme
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modal Forms**: Clean editing and creation dialogs
- **Expandable Tasks**: Click to view full details
- **Status Badges**: Visual status indicators
- **Progress Bars**: Visual progress representation
- **Sticky Header**: Easy access to user profile and logout

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The app will be available at `http://localhost:5173/`

## 📂 Project Structure

```
src/
├── components/
│   ├── Login.jsx              # Login page
│   ├── Register.jsx           # Registration page
│   ├── TodoList.jsx           # Main task list with CRUD
│   ├── TodoItem.jsx           # Individual task display
│   ├── TodoForm.jsx           # Create/Edit task form
│   ├── Header.jsx             # Navigation header
│   ├── ProtectedRoute.jsx     # Route protection wrapper
│   └── *.css                  # Component styles
├── context/
│   └── AuthContext.jsx        # Authentication state management
├── services/
│   └── api.js                 # API client with Axios
├── App.jsx                    # Root component with routing
├── main.jsx                   # Application entry point
├── index.css                  # Global styles
└── App.css                    # App layout styles
```

## 🔄 API Integration

The app connects to a backend API at `http://localhost:8080`. Ensure your backend is running.

### API Endpoints Used

**Authentication:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

**Tasks:**
- `GET /tasks` - Get user's tasks
- `GET /tasks/all` - Get all tasks grouped by user (admin)
- `POST /tasks` - Create new task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

All requests include JWT token in `Authorization: Bearer <token>` header.

## 🎯 Usage Guide

### 1. **Register/Login**
   - Navigate to login or register page
   - Create account with email, username, and password
   - Auto-login after registration

### 2. **Create Tasks**
   - Click "+ Add Task" button
   - Fill in title (required, 3-100 chars)
   - Add optional description (max 500 chars)
   - Click "Create Task"

### 3. **View Task Details**
   - Click on any task to expand
   - See full description
   - View task creation date

### 4. **Update Tasks**
   - **Change Status**: Click "Change Status" to cycle through PENDING → IN_PROGRESS → COMPLETED
   - **Update Progress**: Drag progress slider to set 0-100%
   - **Edit Details**: Click "Edit" to modify title/description in modal form

### 5. **Delete Tasks**
   - Click "Delete" button (with confirmation)
   - Task removed immediately

### 6. **Filter Tasks**
   - Use filter buttons: ALL, PENDING, IN_PROGRESS, COMPLETED
   - View statistics for each category

## 🎨 Design System

### Color Palette
- **Primary Gradient**: #667eea → #764ba2 (Purple-Blue)
- **Pending**: #ff9800 (Orange)
- **In Progress**: #2196f3 (Blue)
- **Completed**: #4caf50 (Green)
- **Background**: #f5f5f5 (Light Gray)

### Components
- **Buttons**: Primary (gradient), Secondary (outlined), Danger (red), Warning (orange)
- **Cards**: White background, subtle shadows, hover effects
- **Modals**: Centered overlay with smooth animations
- **Progress Bars**: Gradient fill with percentage label

## 🔐 Security

- JWT token-based authentication
- Tokens stored in localStorage
- Automatic token inclusion in all API requests
- Protected routes prevent unauthorized access
- Tokens cleared on logout

## 📱 Responsive Design

- **Desktop**: Full width with optimized spacing
- **Tablet**: Adapted layouts and spacing
- **Mobile**: Touch-friendly buttons, full-width layouts, compact design

## 🛠 Development

### Hot Module Replacement (HMR)
- Vite provides instant hot reload
- React Fast Refresh preserves component state during edits

### Code Standards
- ESLint configured with React hooks validation
- Functional components with hooks only
- ES6 modules
- JSX in .jsx files only

### Linting
```bash
npm run lint
```

## 🤝 Contributing

When extending this app:
- Follow existing component structure
- Keep components in `src/components/`
- Store styles alongside components
- Use React hooks for state management
- Centralize API calls in `src/services/api.js`

## 📦 Dependencies

- **react@19.2.0** - UI library
- **react-router-dom@7.13.0** - Client-side routing
- **axios@1.13.4** - HTTP client
- **vite@7.2.4** - Build tool and dev server

## 🐛 Troubleshooting

### Backend Connection Error
- Ensure backend API is running at `http://localhost:8080`
- Check network tab in browser DevTools
- Verify API endpoint URLs in `src/services/api.js`

### Login/Register Issues
- Verify backend auth endpoints are working
- Check browser console for error messages
- Ensure backend database is connected

### Tasks Not Loading
- Check authentication token is saved in localStorage
- Verify user has tasks created in backend
- Check API response in Network tab

## 📄 License

Apache 2.0
