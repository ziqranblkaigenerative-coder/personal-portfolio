import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { ToastProvider } from './components/ui/Toast';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProfilePage } from './pages/AdminProfilePage';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Memverifikasi sesi admin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return <>{children}</>;
};

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/login') {
    return <LoginPage />;
  }

  if (currentPath === '/admin' || currentPath === '/admin/') {
    return (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/admin/profile' || currentPath === '/admin/profile/') {
    return (
      <ProtectedRoute>
        <AdminProfilePage />
      </ProtectedRoute>
    );
  }

  return <HomePage />;
}

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProjectProvider>
          <Router />
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
