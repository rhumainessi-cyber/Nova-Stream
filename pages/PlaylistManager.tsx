
import React, { useState } from 'react';
import { Playlist, PlaylistType } from '../types';

const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [type, setType] = useState<PlaylistType>(PlaylistType.M3U);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    host: '',
    username: '',
    password: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlaylist: Playlist = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      type,
      ...formData
    };
    setPlaylists([...playlists, newPlaylist]);
    setShowAdd(false);
    setFormData({ name: '', url: '', host: '', username: '', password: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Playlists</h1>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add New Source
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Add Media Source</h2>
            <div className="flex p-1 bg-slate-800 rounded-lg mb-6">
              <button 
                onClick={() => setType(PlaylistType.M3U)}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all ${type === PlaylistType.M3U ? 'bg-slate-700 text-white' : 'text-gray-400'}`}
              >
                M3U URL
              </button>
              <button 
                onClick={() => setType(PlaylistType.XTREAM)}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all ${type === PlaylistType.XTREAM ? 'bg-slate-700 text-white' : 'text-gray-400'}`}
              >
                Xtream Codes
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Friendly Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. My Provider"
                />
              </div>

              {type === PlaylistType.M3U ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">M3U URL</label>
                  <input 
                    required
                    type="url" 
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="http://server.com/playlist.m3u"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Host / Server URL</label>
                    <input 
                      required
                      type="url" 
                      value={formData.host}
                      onChange={e => setFormData({...formData, host: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="http://server.com:8080"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Username</label>
                      <input 
                        required
                        type="text" 
                        value={formData.username}
                        onChange={e => setFormData({...formData, username: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Password</label>
                      <input 
                        required
                        type="password" 
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
                >
                  Add Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map(p => (
          <div key={p.id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase px-2 py-0.5 bg-slate-700 rounded text-blue-400">{p.type}</span>
                <button className="text-gray-500 hover:text-red-400">Delete</button>
              </div>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-gray-400 truncate mt-1">{p.url || p.host}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <span className="text-xs text-gray-500">Not synced yet</span>
              <button className="text-xs font-semibold text-blue-500 hover:underline">Sync Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistManager;
