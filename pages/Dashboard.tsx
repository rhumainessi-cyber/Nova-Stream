
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [stats] = useState({
    playlists: 0,
    channels: 0,
    vods: 0,
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-400">Manage your private media sources securely.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all">
          <div className="text-blue-500 text-2xl mb-2">📁</div>
          <div className="text-2xl font-bold">{stats.playlists}</div>
          <div className="text-gray-400 text-sm">Active Playlists</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-green-500/50 transition-all">
          <div className="text-green-500 text-2xl mb-2">📺</div>
          <div className="text-2xl font-bold">{stats.channels}</div>
          <div className="text-gray-400 text-sm">Live Channels</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-purple-500/50 transition-all">
          <div className="text-purple-500 text-2xl mb-2">🎬</div>
          <div className="text-2xl font-bold">{stats.vods}</div>
          <div className="text-gray-400 text-sm">Movies & Series</div>
        </div>
      </div>

      {stats.playlists === 0 && (
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-8 text-center max-w-2xl mx-auto mt-12">
          <h2 className="text-xl font-semibold mb-2">Ready to start streaming?</h2>
          <p className="text-gray-300 mb-6">You haven't added any sources yet. Connect your M3U or Xtream account to begin.</p>
          <Link to="/playlists" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium inline-block transition-colors">
            Add Your First Playlist
          </Link>
        </div>
      )}
      
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Quick Shortcuts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/live" className="p-4 bg-slate-800 rounded-lg text-center hover:bg-slate-700">Live TV</Link>
          <Link to="/vod/movie" className="p-4 bg-slate-800 rounded-lg text-center hover:bg-slate-700">Movies</Link>
          <Link to="/vod/series" className="p-4 bg-slate-800 rounded-lg text-center hover:bg-slate-700">Series</Link>
          <Link to="/playlists" className="p-4 bg-slate-800 rounded-lg text-center hover:bg-slate-700">History</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
