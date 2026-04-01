// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white text-center p-10">
          <h1 className="text-2xl font-bold">Something went wrong 😢</h1>
          <p className="text-gray-300 mt-4">We're working on it!</p>
        </div>
      );
    }

    return this.props.children;
  }
}
