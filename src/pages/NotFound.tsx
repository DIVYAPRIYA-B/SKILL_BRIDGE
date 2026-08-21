import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-float">
          <Compass className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-ink-900 font-display">404</h1>
        <h2 className="text-xl font-semibold text-ink-700 mt-2">Page not found</h2>
        <p className="text-sm text-ink-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary mt-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
