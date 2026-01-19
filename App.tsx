
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PlaylistManager from './pages/PlaylistManager';
import LiveTV from './pages/LiveTV';
import VOD from './pages/VOD';
import { AuthProvider, useAuth } from './services/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Wrap the entire layout in ProtectedRoute to ensure 'children' prop is provided correctly */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 container mx-auto px-4 py-6">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/playlists" element={<PlaylistManager />} />
                        <Route path="/live" element={<LiveTV />} />
                        <Route path="/vod/:type" element={<VOD />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
