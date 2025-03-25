import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
  onStop?: () => void;
  onPlay?: () => void;
  isGlobal?: boolean; // To distinguish between global and playlist players
}

const MusicPlayer = ({
  audioSrc,
  autoPlay = true,
  onStop,
  onPlay,
  isGlobal = true,
}: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      if (onPlay && !isGlobal) onPlay(); // Only call onPlay for playlist player
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (onStop && !isGlobal) onStop(); // Only call onStop for playlist player
    };

    // Set up event listeners
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("canplaythrough", () => {
      if (autoPlay && userInteracted) {
        audio.play().catch(() => {
          console.log("Autoplay prevented by browser.");
          setIsPlaying(false);
        });
      }
    });

    return () => {
      // Clean up on unmount
      audio.pause();
      audio.src = "";
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.remove();
    };
  }, [audioSrc, autoPlay, userInteracted]);

  const togglePlay = () => {
    if (!userInteracted) setUserInteracted(true);

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (isGlobal && onStop) onStop(); // Notify parent when global player stops
      } else {
        audioRef.current.play().catch((e) => {
          console.error("Playback failed:", e);
          setIsPlaying(false);
        });
        if (isGlobal && onPlay) onPlay(); // Notify parent when global player starts
      }
    }
  };

  // Sync with external play/pause commands
  useEffect(() => {
    if (!audioRef.current || !isGlobal) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Playback failed:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${!isGlobal ? "hidden" : ""}`}>
      <button
        onClick={togglePlay}
        className="glass-morphism w-12 h-12 rounded-full flex items-center justify-center text-love-600 hover:text-love-800 transition-all duration-300"
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
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
 