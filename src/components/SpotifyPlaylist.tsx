
import { Music } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="max-w-4xl mx-auto my-8 md:my-16 px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Music className="mr-2 text-love-600" size={isMobile ? 20 : 24} />
          {title}
        </h2>
        <p className="text-love-600 text-sm md:text-lg max-w-md mx-auto">
          {description}
        </p>
      </div>

      <div className="aspect-video glass-morphism p-2 md:p-4 rounded-xl shadow-lg overflow-hidden">
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
