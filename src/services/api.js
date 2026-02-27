import dummyTodos from '../data/dummyTodos.json'
import dummyUsers from '../data/users.json'

// Initialize users and todos in localStorage
const initializeUsers = () => {
  const existing = localStorage.getItem('users')
  if (!existing) {
    localStorage.setItem('users', JSON.stringify(dummyUsers))
  }
}

const initializeTodos = () => {
  const existing = localStorage.getItem('todos')
  if (!existing) {
    localStorage.setItem('todos', JSON.stringify(dummyTodos))
  }
}

// Get all users from localStorage
const getUsersFromStorage = () => {
  initializeUsers()
  const users = localStorage.getItem('users')
  return JSON.parse(users || '[]')
}

// Get all todos from localStorage
const getTodosFromStorage = () => {
  initializeTodos()
  const todos = localStorage.getItem('todos')
  return JSON.parse(todos || '[]')
}

// Save users to localStorage
const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users))
}

// Save todos to localStorage
const saveTodosToStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Generate unique ID for users
const generateUserId = () => {
  const users = getUsersFromStorage()
  return Math.max(...users.map(u => u.id), 0) + 1
}

// Generate unique ID for todos
const generateTodoId = () => {
  const todos = getTodosFromStorage()
  return Math.max(...todos.map(t => t.id), 0) + 1
}

// Generate JWT-like token (simple implementation)
const generateToken = (username) => {
  return btoa(JSON.stringify({ username, timestamp: Date.now() }))
}

// Auth APIs
export const authAPI = {
  register: (email, username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromStorage()
        
        // Check if user already exists
        if (users.find(u => u.username === username)) {
          reject({ response: { data: { message: 'Username already exists' } } })
          return
        }
        
        if (users.find(u => u.email === email)) {
          reject({ response: { data: { message: 'Email already exists' } } })
          return
        }
        
        // Create new user
        const newUser = {
          id: generateUserId(),
          username,
          email,
          password,
          createdAt: new Date().toISOString(),
        }
        
        users.push(newUser)
        saveUsersToStorage(users)
        
        // Create token and return user data
        const token = generateToken(username)
        resolve({
          data: {
            username,
            email,
            token,
          },
        })
      }, 300)
    })
  },

  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromStorage()
        const user = users.find(
          u => u.username === username && u.password === password
        )
        
        if (!user) {
          reject({
            response: {
              data: { message: 'Invalid username or password' },
            },
          })
          return
        }
        
        // Generate token
        const token = generateToken(username)
        resolve({
          data: {
            username: user.username,
            email: user.email,
            token,
          },
        })
      }, 300)
    })
  },
}

// Task APIs - Using localStorage instead of API calls
export const taskAPI = {
  // Get all tasks for current user
  getTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = localStorage.getItem('currentUser')
        const allTodos = getTodosFromStorage()
        
        // Filter todos by current user (stored in todo data)
        const userTodos = allTodos.filter(
          t => t.userId === currentUser || !t.userId
        )
        
        resolve({ data: userTodos })
      }, 100)
    })
  },

  // Create a new task
  createTask: (title, description = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = getTodosFromStorage()
        const currentUser = localStorage.getItem('currentUser')
        
        const newTodo = {
          id: generateTodoId(),
          title,
          description,
          status: 'PENDING',
          progress: 0,
          userId: currentUser || 'default',
          createdAt: new Date().toISOString(),
        }
        
        todos.unshift(newTodo)
        saveTodosToStorage(todos)
        resolve({ data: newTodo })
      }, 100)
    })
  },

  // Update a task
  updateTask: (id, { title, description, status, progress }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = getTodosFromStorage()
        const index = todos.findIndex(t => t.id === id)
        
        if (index !== -1) {
          todos[index] = {
            ...todos[index],
            title: title || todos[index].title,
            description: description !== undefined ? description : todos[index].description,
            status: status || todos[index].status,
            progress: progress !== undefined ? progress : todos[index].progress,
          }
          saveTodosToStorage(todos)
          resolve({ data: todos[index] })
        }
      }, 100)
    })
  },

  // Delete a task
  deleteTask: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = getTodosFromStorage()
        const filtered = todos.filter(t => t.id !== id)
        saveTodosToStorage(todos)
        resolve({ data: { success: true } })
      }, 100)
    })
  },
}

export default taskAPI
