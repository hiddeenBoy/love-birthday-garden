import React, { useState, useRef, useEffect } from "react";
import AudioTrackItem, { AudioTrack } from "./AudioTrack";
import PlayerControls from "./PlayerControls";
import PlayerProgress from "./PlayerProgress";
import TrackInfo from "./TrackInfo";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronUp, ChevronDown, ListMusic } from "lucide-react";

interface MusicPlayerProps {
  title?: string;
  description?: string;
  tracklist: AudioTrack[];
  showPlaylist?: boolean;
  autoplay?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Custom Playlist",
  description = "A collection of our favorite songs",
  tracklist,
  showPlaylist = true,
  autoplay = false,
  onPlay,
  onStop,
}) => {
  const isMobile = useIsMobile();

  // Player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [showTrackList, setShowTrackList] = useState<boolean>(showPlaylist);

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get current track
  const currentTrack =
    currentTrackIndex >= 0 ? tracklist[currentTrackIndex] : null;

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();

    // Auto-select first track
    if (tracklist.length > 0) {
      setCurrentTrackIndex(0);
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      // Notify parent when component unmounts
      if (isPlaying && onStop) {
        onStop();
      }
    };
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    if (isPlaying) {
      if (onPlay) onPlay();
    } else {
      if (onStop) onStop();
    }
  }, [isPlaying]);

  // Handle track change and autoplay
  useEffect(() => {
    if (!audioRef.current || currentTrackIndex < 0) return;

    // Set audio source
    audioRef.current.src = tracklist[currentTrackIndex].src;
    audioRef.current.load();

    // Update duration when metadata is loaded
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    // Update current time during playback
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    // Handle track end
    const handleEnded = () => {
      if (isRepeat) {
        // Repeat current track
        audioRef.current?.play();
      } else {
        // Play next track
        handleSkipToNext();
      }
    };

    // Add event listeners
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleEnded);

    // Autoplay when changing tracks (if was already playing)
    if (isPlaying || autoplay) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentTrackIndex, isRepeat, autoplay]);

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current || currentTrackIndex < 0) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  // Skip to previous track
  const handleSkipToPrevious = () => {
    if (currentTime > 3) {
      // If current time > 3 seconds, restart current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      // Otherwise go to previous track
      let newIndex;

      if (isShuffle) {
        // Random track (except current)
        const availableIndices = Array.from(
          { length: tracklist.length },
          (_, i) => i
        ).filter((i) => i !== currentTrackIndex);

        newIndex =
          availableIndices[Math.floor(Math.random() * availableIndices.length)];
      } else {
        // Previous track in order
        newIndex =
          (currentTrackIndex - 1 + tracklist.length) % tracklist.length;
      }

      setCurrentTrackIndex(newIndex);
    }
  };

  // Skip to next track
  const handleSkipToNext = () => {
    let newIndex;

    if (isShuffle) {
      // Random track (except current)
      const availableIndices = Array.from(
        { length: tracklist.length },
        (_, i) => i
      ).filter((i) => i !== currentTrackIndex);

      newIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      // Next track in order
      newIndex = (currentTrackIndex + 1) % tracklist.length;
    }

    setCurrentTrackIndex(newIndex);
  };

  // Seek to position
  const handleSeek = (time: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle track selection
  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-5xl mx-auto my-8 md:my-16 md:px-4 animate-fade-in">
      <div className="text-center mb-6 md:mb-8 animate-scale-in">
        <div className="inline-block py-1 px-3 bg-love-300/10 rounded-full text-love-700 text-xs mb-2">
          OUR MUSIC PLAYER
        </div>
        <h2 className="hidden md:block font-sans text-2xl md:text-3xl font-bold text-player-text mb-2">
          {title}
        </h2>
        <p className="hidden md:block text-love-400 text-sm md:text-base max-w-md mx-auto">
          {description}
        </p>
      </div>

      <div
        className="neo-morphism overflow-hidden animate-scale-in"
        style={{ animationDelay: "0.15s" }}
      >
        {/* Track Info and Progress */}
        <div>
          <TrackInfo currentTrack={currentTrack} isPlaying={isPlaying} />
          <PlayerProgress
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />
        </div>

        {/* Player Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          skipToPrevious={handleSkipToPrevious}
          skipToNext={handleSkipToNext}
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isRepeat={isRepeat}
          toggleRepeat={() => setIsRepeat(!isRepeat)}
          isShuffle={isShuffle}
          toggleShuffle={() => setIsShuffle(!isShuffle)}
        />

        {/* Playlist Toggle */}
        <div className="border-t border-gray-200">
          <button
            className="w-full py-3 flex items-center justify-center text-player-text-light hover:bg-black/5"
            onClick={() => setShowTrackList(!showTrackList)}
          >
            <ListMusic size={isMobile ? 16 : 18} className="mr-2" />
            <span className="mr-1">Playlist</span>
            {showTrackList ? (
              <ChevronUp size={isMobile ? 16 : 18} />
            ) : (
              <ChevronDown size={isMobile ? 16 : 18} />
            )}
          </button>
        </div>

        {/* Track List */}
        {showTrackList && (
          <div className="max-h-80 overflow-y-auto p-4 border-t border-gray-200 animate-slide-up">
            {tracklist.map((track, index) => (
              <AudioTrackItem
                key={track.id}
                track={track}
                isActive={index === currentTrackIndex}
                isPlaying={isPlaying && index === currentTrackIndex}
                onClick={() => handleTrackSelect(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
