import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: '✓',
      title: 'Easy Task Management',
      description: 'Create, edit, and organize your tasks effortlessly',
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'See changes instantly as you work on your tasks',
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor task progress with visual indicators',
    },
    {
      icon: '🎯',
      title: 'Status Management',
      description: 'Track tasks through Pending, In Progress, and Completed',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Works perfectly on desktop, tablet, and mobile',
    },
    {
      icon: '⚙️',
      title: 'Smart Filtering',
      description: 'Filter and view tasks by status with ease',
    },
  ]

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="nav-icon">📝</span>
            <span className="nav-text">TodoApp</span>
          </div>
          <div className="nav-buttons">
            <button
              className="nav-btn nav-login"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="nav-btn nav-register"
              onClick={() => navigate('/register')}
            >
              Register →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Organize Your Tasks,
            <br />
            <span className="highlight">Master Your Day</span>
          </h1>
          <p className="hero-subtitle">
            A modern, intuitive todo application designed to help you stay productive
            and focused. Create, manage, and track your tasks in real-time.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/login')}
            >
              Get Started Now
            </button>
            <button className="btn btn-secondary btn-large">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">100%</div>
              <div className="stat-label">Free to Use</div>
            </div>
            <div className="stat">
              <div className="stat-value">∞</div>
              <div className="stat-label">Unlimited Tasks</div>
            </div>
            <div className="stat">
              <div className="stat-value">⚡</div>
              <div className="stat-label">Lightning Fast</div>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hero-illustration">
          <div className="illustration-card card-1">
            <div className="card-icon">✓</div>
            <div className="card-text">Buy groceries</div>
            <div className="card-progress" style={{ width: '100%' }}></div>
          </div>
          <div className="illustration-card card-2">
            <div className="card-icon">⚡</div>
            <div className="card-text">Finish project</div>
            <div className="card-progress" style={{ width: '65%' }}></div>
          </div>
          <div className="illustration-card card-3">
            <div className="card-icon">⏳</div>
            <div className="card-text">Review document</div>
            <div className="card-progress" style={{ width: '30%' }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to stay organized and productive</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefits-container">
          <div className="benefits-content">
            <h2>Why Choose Our Todo App?</h2>
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">🎯</span>
                <div>
                  <h4>Focus on What Matters</h4>
                  <p>Eliminate distractions and focus on your most important tasks</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">📈</span>
                <div>
                  <h4>Boost Productivity</h4>
                  <p>Increase your productivity with organized task management</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">🔄</span>
                <div>
                  <h4>Real-time Sync</h4>
                  <p>All changes are instantly reflected across the application</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">🎨</span>
                <div>
                  <h4>Beautiful Design</h4>
                  <p>Enjoy a modern, clean, and intuitive user interface</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="benefits-image">
            <div className="benefit-visual">
              <div className="visual-item item-1">📝</div>
              <div className="visual-item item-2">✅</div>
              <div className="visual-item item-3">🎯</div>
              <div className="visual-item item-4">⚡</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Organized?</h2>
          <p>Start managing your tasks efficiently today. Create an account for free!</p>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate('/register')}
          >
            Sign Up Now 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 TodoApp. Built with React & Vite.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
