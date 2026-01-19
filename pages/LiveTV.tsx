
import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';

const LiveTV: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<{name: string, url: string} | null>(null);
  const [search, setSearch] = useState('');

  // Mock channels
  const channels = [
    { name: 'France 24 English', url: 'https://static.france24.com/live/F24_EN_LO_HLS/live_tv.m3u8', category: 'News' },
    { name: 'NASA TV', url: 'https://ntv1.akamaized.net/hls/live/2014049/NASA-NTV1-HLS/master.m3u8', category: 'Science' },
    { name: 'Euronews', url: 'https://euronews-euronews-world-1-au.samsung.wurl.tv/playlist.m3u8', category: 'News' }
  ];

  const filteredChannels = channels.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
      {/* Player Area */}
      <div className="flex-1 flex flex-col space-y-4">
        {selectedChannel ? (
          <>
            <VideoPlayer url={selectedChannel.url} />
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{selectedChannel.name}</h1>
              <button className="bg-slate-800 p-2 rounded-full hover:bg-slate-700">⭐</button>
            </div>
          </>
        ) : (
          <div className="aspect-video bg-slate-900 border-2 border-dashed border-slate-800 rounded-lg flex items-center justify-center text-gray-500 flex-col">
            <span className="text-4xl mb-4">📺</span>
            <p>Select a channel from the list to start watching</p>
          </div>
        )}
      </div>

      {/* Sidebar Channel List */}
      <div className="w-full lg:w-80 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <input 
            type="text" 
            placeholder="Search channels..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredChannels.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedChannel(c)}
              className={`w-full p-4 flex items-center gap-3 text-left transition-colors hover:bg-slate-800 border-b border-slate-800/50 ${selectedChannel?.name === c.name ? 'bg-slate-800' : ''}`}
            >
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center font-bold text-xs">
                {c.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{c.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
