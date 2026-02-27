# AI Coding Agent Instructions - Todo Frontend

## Project Overview
This is a **React 19 + Vite** todo application frontend. It's a minimal, modular setup using modern React with client-side routing via React Router DOM and HTTP requests via Axios.

**Key Tech Stack:**
- React 19.2.0 with React Router DOM 7.13.0 for navigation
- Vite 7.2.4 for fast dev/build tooling with HMR
- Axios for API communication
- ESLint with React-specific rules (hooks & fast refresh validation)

## Architecture & Patterns

### Component Structure
- **App.jsx**: Root component - minimal, currently empty `<></>` fragment
- **components/**: Feature components live here (currently empty, add new components as needed)
- Use **functional components with hooks** exclusively (React 19 best practice)
- Component file naming: PascalCase (e.g., `TodoList.jsx`, `TodoItem.jsx`)

### State & Data Flow
- Use **React hooks** (`useState`, `useEffect`, `useContext`) for local state
- Axios handles API calls - consider centralizing API methods in a separate utility file if needed
- React Router handles navigation - structure routes at App level

### CSS & Styling
- CSS modules or plain CSS files co-located with components
- Global styles in [index.css](../src/index.css)
- App-level styles in [App.css](../src/App.css)

## Development Workflows

### Build & Run
- **Dev server**: `npm run dev` (Vite default: http://localhost:5173)
- **Production build**: `npm run build` (outputs to `/dist`)
- **Preview built output**: `npm run preview`
- **Linting**: `npm run lint` (ESLint via flat config)

### Hot Module Replacement (HMR)
- Vite provides instant file-change feedback in the browser
- React Fast Refresh enabled via `@vitejs/plugin-react` - keeps component state during edits

## Code Standards & ESLint Rules

### Custom Rules
- **Unused variables**: Ignored if PascalCase (`^[A-Z_]`) - allows capitalized constants/components
- **React Hooks**: Validated via `eslint-plugin-react-hooks` - follow Rules of Hooks strictly
- **React Fast Refresh**: Validated via `eslint-plugin-react-refresh` - no default exports in hook files

### Conventions
- Use ES6 modules (`import`/`export`)
- Avoid CommonJS (`require`) - project is `"type": "module"`
- JSX only in `.jsx` files
- Import React explicitly if using JSX features (even in React 19, for compatibility)

## Key Dependencies & Integration Points

- **Axios**: Used for HTTP requests - centralize base URL configuration if working with a backend API
- **React Router DOM**: Handles client-side routing - define routes in App.jsx or a dedicated routes file
- **No TypeScript**: Project uses plain JavaScript/JSX - type checking via JSDoc or ESLint if needed

## Common Patterns

### Creating New Components
```jsx
// src/components/TodoItem.jsx
export default function TodoItem({ todo, onDelete }) {
  return (
    <div className="todo-item">
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
}
```

### API Integration Example
```jsx
useEffect(() => {
  axios.get('/api/todos')
    .then(res => setTodos(res.data))
    .catch(err => console.error(err))
}, [])
```

## File Locations
- **Entry point**: [src/main.jsx](../src/main.jsx)
- **App root**: [src/App.jsx](../src/App.jsx)
- **Config files**: [vite.config.js](../vite.config.js), [eslint.config.js](../eslint.config.js)
- **Assets**: [src/assets/](../src/assets/)
