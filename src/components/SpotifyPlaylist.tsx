
import { Music } from 'lucide-react';

interface SpotifyPlaylistProps {
  playlistId: string;
  title?: string;
  description?: string;
}

const SpotifyPlaylist = ({ 
  playlistId, 
  title = "Our Special Playlist", 
  description = "Songs that remind me of you and our special moments together." 
}: SpotifyPlaylistProps) => {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Music className="mr-2 text-love-600" size={24} />
          {title}
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          {description}
        </p>
      </div>

      <div className="aspect-video glass-morphism p-4 rounded-xl shadow-lg overflow-hidden">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist embed"
        ></iframe>
      </div>
    </div>
  );
};

export default SpotifyPlaylist;
