// ErrorBoundary.jsx
"use client"
import React from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-message">Something went wrong in the chat component.</div>
    }

    return this.props.children
  }
}
