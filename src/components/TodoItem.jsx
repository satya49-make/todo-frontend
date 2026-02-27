import React, { useState, useEffect } from 'react'
import './TodoItem.css'

const STATUS_CONFIG = {
  PENDING: { label: 'Pending', icon: '⏳', color: '#ff9800' },
  IN_PROGRESS: { label: 'In Progress', icon: '⚡', color: '#2196f3' },
  COMPLETED: { label: 'Completed', icon: '✓', color: '#4caf50' },
}

export default function TodoItem({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onProgressChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const statusConfig = STATUS_CONFIG[task.status] || STATUS_CONFIG.PENDING

  const handleStatusCycle = () => {
    const statusOrder = ['PENDING', 'IN_PROGRESS', 'COMPLETED']
    const currentIndex = statusOrder.indexOf(task.status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]
    onStatusChange(nextStatus)
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className={`todo-item ${task.status.toLowerCase().replace('_', '-')}`}>
      <div className="todo-item-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="todo-item-left">
          <div className="todo-status" style={{ color: statusConfig.color }}>
            {statusConfig.icon}
          </div>
          <div className="todo-info">
            <h3 className="todo-title">{task.title}</h3>
            <p className="todo-date">{formattedDate}</p>
          </div>
        </div>
        <div className="todo-item-right">
          <span className="status-badge" style={{ borderLeftColor: statusConfig.color }}>
            {statusConfig.label}
          </span>
          <button className="expand-btn">{isExpanded ? '▼' : '▶'}</button>
        </div>
      </div>

      {isExpanded && (
        <div className="todo-item-body">
          {task.description && (
            <div className="todo-description">
              <h4>Description</h4>
              <p>{task.description}</p>
            </div>
          )}

          <div className="progress-section">
            <div className="progress-header">
              <label htmlFor={`progress-${task.id}`}>Progress</label>
              <span className="progress-value">{task.progress || 0}%</span>
            </div>
            <input
              id={`progress-${task.id}`}
              type="range"
              min="0"
              max="100"
              step="10"
              value={task.progress || 0}
              onChange={(e) => onProgressChange(parseInt(e.target.value))}
              className="progress-input"
            />
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${task.progress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="todo-actions">
            <button
              className="btn btn-secondary"
              onClick={handleStatusCycle}
            >
              {statusConfig.icon} Change Status
            </button>
            <button
              className="btn btn-warning"
              onClick={() => onEdit(task)}
            >
              ✎ Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={onDelete}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
