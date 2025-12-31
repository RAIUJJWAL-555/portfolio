
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, LogOut, LayoutDashboard } from 'lucide-react';

export default function AuthButtons() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Don't show buttons on login page to avoid clutter/confusion
  if (location.pathname === '/login') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {currentUser ? (
        <>
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
            title="Dashboard"
          >
            <LayoutDashboard size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
            title="Log Out"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
          title="Admin Login"
        >
          <LogIn size={18} />
          <span className="hidden md:inline">Admin Login</span>
        </button>
      )}
    </div>
  );
}
