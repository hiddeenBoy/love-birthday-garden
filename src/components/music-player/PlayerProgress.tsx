import React, { useRef } from "react";

interface PlayerProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const PlayerProgress: React.FC<PlayerProgressProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle click on progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;

    onSeek(newTime);
  };

  return (
    <div className="px-6 py-3 w-full">
      <div
        ref={progressRef}
        className="player-progress cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div
          className="player-progress-bar group-hover:h-2"
          style={{ width: `${progressPercentage}%` }}
        />
        <div
          className="w-3 h-3 bg-love-500 rounded-full absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            left: `${progressPercentage}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-player-text-light">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayerProgress;
