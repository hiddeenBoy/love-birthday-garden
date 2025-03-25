import { Music } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MusicPlayer from "./music-player/MusicPlayer";
import { sampleTracks } from "@/data/sampleTrack";

interface SpotifyPlaylistProps {
  playlistId: string;
  title?: string;
  description?: string;
  onPlay?: () => void;
  onStop?: () => void;
}

const SpotifyPlaylist = ({
  playlistId,
  title = "Our Special Playlist",
  description = "Songs that remind me of you and our special moments together.",
  onPlay,
  onStop,
}: SpotifyPlaylistProps) => {
  const isMobile = useIsMobile();

  const handlePlay = () => {
    if (onPlay) onPlay();
    // Any additional play logic you need
  };

  const handleStop = () => {
    if (onStop) onStop();
    // Any additional stop logic you need
  };

  return (
    <div className="max-w-6xl mx-auto my-8 md:my-16 px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Music className="mr-2 text-love-600" size={isMobile ? 20 : 24} />
          {title}
        </h2>
        <p className="text-love-600 text-sm md:text-lg max-w-md mx-auto">
          {description}
        </p>
      </div>

      <div className="aspect-square md:aspect-video glass-morphism p-2 md:p-6 rounded-xl shadow-lg h-auto w-full md:max-w-4xl mx-auto">
        <MusicPlayer
          title="Your Personal Collection"
          description="A curated playlist of songs that bring memories to life"
          tracklist={sampleTracks}
          showPlaylist={true}
          onPlay={handlePlay}
          onStop={handleStop}
        />
      </div>
    </div>
  );
};

export default SpotifyPlaylist;
