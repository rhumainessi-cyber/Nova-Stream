
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const VOD: React.FC = () => {
  const { type } = useParams<{type: string}>();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold capitalize">{type}s</h1>
        <div className="w-full md:w-64">
          <input 
            type="text" 
            placeholder={`Search ${type}s...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* Placeholder Grid */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
            <div className="aspect-[2/3] bg-slate-800">
               <img src={`https://picsum.photos/seed/${type}${i}/300/450`} alt="Poster" className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold truncate">Sample {type} {i+1}</div>
              <div className="text-xs text-gray-500">2024 • Action</div>
            </div>
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">▶</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VOD;
