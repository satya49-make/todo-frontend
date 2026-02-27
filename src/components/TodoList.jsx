import React, { useState, useEffect } from 'react'
import { taskAPI } from '../services/api'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import './TodoList.css'

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('ALL') // ALL, PENDING, IN_PROGRESS, COMPLETED
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await taskAPI.getTasks()
      setTasks(response.data || [])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (formData) => {
    try {
      const response = await taskAPI.createTask(formData.title, formData.description)
      setTasks((prev) => [response.data, ...prev])
      setShowForm(false)
      setError(null)
    } catch (err) {
      setError('Failed to create task')
    }
  }

  const handleUpdateTask = async (taskId, formData) => {
    try {
      const response = await taskAPI.updateTask(taskId, formData)
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? response.data : task))
      )
      setEditingTask(null)
      setError(null)
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId)
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
        setError(null)
      } catch (err) {
        setError('Failed to delete task')
      }
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId)
    await handleUpdateTask(taskId, {
      ...task,
      status: newStatus,
    })
  }

  const handleProgressChange = async (taskId, newProgress) => {
    const task = tasks.find((t) => t.id === taskId)
    await handleUpdateTask(taskId, {
      ...task,
      progress: newProgress,
    })
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'ALL') return true
    return task.status === filter
  })

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'PENDING').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    completed: tasks.filter((t) => t.status === 'COMPLETED').length,
  }

  if (loading) {
    return (
      <div className="todo-list-container">
        <div className="loading">Loading your tasks...</div>
      </div>
    )
  }

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <div>
          <h1>My Tasks</h1>
          <p className="subtitle">Organize and track your daily activities</p>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            setShowForm(true)
            setEditingTask(null)
          }}
        >
          + Add Task
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card inprogress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
              <button
                className="btn-close"
                onClick={() => {
                  setShowForm(false)
                  setEditingTask(null)
                }}
              >
                ×
              </button>
            </div>
            <TodoForm
              initialData={editingTask}
              onSubmit={(formData) => {
                if (editingTask) {
                  handleUpdateTask(editingTask.id, {
                    ...editingTask,
                    ...formData,
                  })
                } else {
                  handleCreateTask(formData)
                }
              }}
              onCancel={() => {
                setShowForm(false)
                setEditingTask(null)
              }}
            />
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="filter-bar">
        {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No {filter !== 'ALL' ? filter.toLowerCase() : ''} tasks</h3>
            <p>
              {filter === 'ALL'
                ? 'Create your first task to get started!'
                : 'Add more tasks to this category.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onEdit={(task) => {
                setEditingTask(task)
                setShowForm(true)
              }}
              onDelete={() => handleDeleteTask(task.id)}
              onStatusChange={(status) => handleStatusChange(task.id, status)}
              onProgressChange={(progress) => handleProgressChange(task.id, progress)}
            />
          ))
        )}
      </div>
    </div>
  )
}
