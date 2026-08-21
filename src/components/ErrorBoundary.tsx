import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-ink-900">Something went wrong</h1>
            <p className="text-sm text-ink-500 mt-2">An unexpected error occurred. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="btn-primary mt-5">
              <RefreshCw className="w-4 h-4" /> Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
