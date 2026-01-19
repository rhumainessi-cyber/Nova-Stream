
-- Database Schema for NovaStream IPTV
-- Use with PostgreSQL 13+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Playlists table (M3U or Xtream)
-- credentials are encrypted in the app logic before storage
CREATE TABLE playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'M3U' or 'XTREAM'
    url TEXT, -- for M3U
    host TEXT, -- for Xtream
    username TEXT, -- for Xtream
    password TEXT, -- for Xtream (encrypted)
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media items (Live, Movies, Series)
-- Catalog synchronization caches these for performance
CREATE TABLE media_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'live', 'movie', 'series'
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    stream_url TEXT NOT NULL,
    logo_url TEXT,
    metadata JSONB, -- For VOD details (rating, year, plot)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User interactions
CREATE TABLE favorites (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_item_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, media_item_id)
);

CREATE TABLE watch_history (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_item_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    last_watched TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    progress INTEGER DEFAULT 0 -- in seconds
);
