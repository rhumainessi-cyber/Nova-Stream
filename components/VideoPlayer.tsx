
import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, poster, autoPlay = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    // Reset player
    video.pause();
    
    if (url.endsWith('.m3u8')) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS (Safari/iOS)
        video.src = url;
      } else if ((window as any).Hls.isSupported()) {
        const hls = new (window as any).Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      }
    } else if (url.endsWith('.mpd')) {
      const player = (window as any).dashjs.MediaPlayer().create();
      player.initialize(video, url, autoPlay);
    } else {
      // Standard MP4 fallback
      video.src = url;
    }

    if (autoPlay) {
      video.play().catch(e => console.log('Autoplay blocked', e));
    }

  }, [url, autoPlay]);

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        poster={poster || 'https://picsum.photos/800/450'}
      />
    </div>
  );
};

export default VideoPlayer;
