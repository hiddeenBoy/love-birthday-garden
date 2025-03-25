import React from "react";
import { AudioTrack } from "./AudioTrack";
import { Music } from "lucide-react";

interface TrackInfoProps {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ currentTrack, isPlaying }) => {
  if (!currentTrack) {
    return (
      <div className="flex items-center px-6 py-4">
        <div className="text-center w-full text-player-text-light">
          No track selected
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center px-6 py-4">
      <div
        className={`w-16 h-16 rounded-lg overflow-hidden mr-4 ${
          isPlaying ? "shadow-lg" : ""
        }`}
      >
        {currentTrack.cover ? (
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className={`w-full h-full object-cover ${
              isPlaying ? "scale-105 transition-transform duration-500" : ""
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Music size={24} className="text-gray-500" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h2 className="font-medium text-lg text-player-text truncate">
          {currentTrack.title}
        </h2>
        <p className="text-player-text-light truncate">{currentTrack.artist}</p>
      </div>
    </div>
  );
};

export default TrackInfo;
