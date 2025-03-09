
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const MusicPlayer = ({ audioSrc, autoPlay = true }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener('canplaythrough', () => {
      if (autoPlay) {
        // Attempt autoplay
        audio.play().catch(() => {
          console.log('Autoplay prevented by browser. User interaction needed.');
          setIsPlaying(false);
        });
      }
    });
    
    return () => {
      // Clean up on unmount
      audio.pause();
      audio.src = '';
      audio.remove();
    };
  }, [audioSrc, autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={togglePlay}
        className="glass-morphism w-12 h-12 rounded-full flex items-center justify-center text-love-600 hover:text-love-800 transition-all duration-300"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 size={20} className="animate-pulse" />
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
