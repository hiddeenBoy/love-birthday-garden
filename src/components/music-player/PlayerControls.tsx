import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Repeat,
  Shuffle,
} from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  skipToPrevious: () => void;
  skipToNext: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  togglePlayPause,
  skipToPrevious,
  skipToNext,
  volume,
  setVolume,
  isMuted,
  toggleMute,
  isRepeat,
  toggleRepeat,
  isShuffle,
  toggleShuffle,
}) => {
  // Get the appropriate volume icon based on the volume level and mute state
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="flex flex-col items-center px-4 pt-3 pb-6 space-y-4">
      {/* Shuffle and Repeat */}
      <div className="flex items-center justify-between w-full mb-2">
        <button
          className={`player-icon-button ${
            isShuffle ? "text-love-600" : "text-player-text-light"
          }`}
          onClick={toggleShuffle}
          aria-label="Toggle shuffle"
        >
          <Shuffle size={16} />
        </button>
        <button
          className={`player-icon-button ${
            isRepeat ? "text-love-600" : "text-player-text-light"
          }`}
          onClick={toggleRepeat}
          aria-label="Toggle repeat"
        >
          <Repeat size={16} />
        </button>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4 w-full">
        <button
          className="player-icon-button text-player-text"
          onClick={skipToPrevious}
          aria-label="Previous track"
        >
          <SkipBack size={24} />
        </button>

        <button
          className="w-14 h-14 bg-love-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all duration-200"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={28} />
          ) : (
            <Play size={28} className="ml-1" />
          )}
        </button>

        <button
          className="player-icon-button text-player-text"
          onClick={skipToNext}
          aria-label="Next track"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 w-full max-w-xs mx-auto mt-4">
        <button
          className="player-icon-button text-player-text-light"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {getVolumeIcon()}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-love-600"
          aria-label="Volume control"
        />
      </div>
    </div>
  );
};

export default PlayerControls;
