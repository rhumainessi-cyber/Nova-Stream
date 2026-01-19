
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-blue-500 flex items-center">
              <span className="mr-2">⚡</span> NovaStream
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className={linkClass('/')}>Dashboard</Link>
              <Link to="/live" className={linkClass('/live')}>Live TV</Link>
              <Link to="/vod/movie" className={linkClass('/vod/movie')}>Movies</Link>
              <Link to="/vod/series" className={linkClass('/vod/series')}>Series</Link>
              <Link to="/playlists" className={linkClass('/playlists')}>Playlists</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={logout}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
