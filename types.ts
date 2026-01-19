
export enum PlaylistType {
  M3U = 'M3U',
  XTREAM = 'XTREAM'
}

export interface Playlist {
  id: string;
  name: string;
  type: PlaylistType;
  url?: string;
  host?: string;
  username?: string;
  password?: string;
  lastSync?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  category: string;
  streamUrl: string;
  logo?: string;
  type: 'live' | 'movie' | 'series';
  playlistId: string;
}

export interface User {
  id: string;
  email: string;
  token: string;
}
