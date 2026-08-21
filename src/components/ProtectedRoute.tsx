import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import type { Role } from '@/types';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ role, children }: { role: Role; children: ReactNode }) {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (currentUser.role !== role) {
    const dashboards: Record<Role, string> = { student: '/student', industry: '/industry', admin: '/admin' };
    return <Navigate to={dashboards[currentUser.role]} replace />;
  }
  return <>{children}</>;
}
