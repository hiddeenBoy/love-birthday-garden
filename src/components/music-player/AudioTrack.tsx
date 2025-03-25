import React from "react";
import { Music } from "lucide-react";

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  src: string;
  cover?: string;
}

interface AudioTrackProps {
  track: AudioTrack;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

const AudioTrackItem: React.FC<AudioTrackProps> = ({
  track,
  isActive,
  isPlaying,
  onClick,
}) => {
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg mb-2 transition-all duration-300 
        ${
          isActive
            ? "bg-love-400/10 border border-love-700/30"
            : "hover:bg-black/5 cursor-pointer border border-transparent"
        }
      `}
    >
      <div className="flex-shrink-0 w-12 h-12 aspect-square rounded-md overflow-hidden mr-4 bg-black/5">
        {track.cover ? (
          <img
            src={track.cover}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Music size={20} className="text-gray-500" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium truncate ${
            isActive ? "text-love-600" : "text-player-text"
          }`}
        >
          {track.title}
        </h3>
        <p className="text-sm text-player-text-light truncate">
          {track.artist}
        </p>
      </div>

      <div className="flex-shrink-0 ml-4 text-player-text-light text-sm">
        {formatDuration(track.duration)}
      </div>

      {isActive && isPlaying && (
        <div className="flex-shrink-0 ml-3 flex space-x-[2px] items-end h-4 ">
          <div
            className="waveform-bar h-2 "
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="waveform-bar h-3"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="waveform-bar h-4"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="waveform-bar h-2"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AudioTrackItem;
