
import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import BirthdayCake from "@/components/BirthdayCake";
import PhotoGallery from "@/components/PhotoGallery";
import PhotoCarousel from "@/components/PhotoCarousel";
import BirthdayLetter from "@/components/BirthdayLetter";
import CountdownTimer from "@/components/CountdownTimer";
import RelationshipTimeline from "@/components/RelationshipTimeline";
import VirtualGift from "@/components/VirtualGift";
import SpotifyPlaylist from "@/components/SpotifyPlaylist";
import LoveMap from "@/components/LoveMap";
import DistanceMap from "@/components/DistanceMap"; // Import the new component
import Fireworks from "@/components/Fireworks";
import { Heart, Sparkles } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [globalAudioPlaying, setGlobalAudioPlaying] = useState(true);
  const [playlistPlaying, setPlaylistPlaying] = useState(false);

  // Calculate next birthday date (1 year from now)
  const nextBirthdayDate = new Date();
  nextBirthdayDate.setFullYear(nextBirthdayDate.getFullYear() + 1);

  useEffect(() => {
    // Simulate loading time for smoother intro animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleBlowCandles = () => {
    // Reveal the birthday letter when candles are blown
    setLetterRevealed(true);
  };

  const handlePlaylistPlay = () => {
    setPlaylistPlaying(true);
    setGlobalAudioPlaying(false); // Stop global music when playlist starts
  };

  const handlePlaylistStop = () => {
    setPlaylistPlaying(false);
    setGlobalAudioPlaying(true); // Resume global music when playlist stops
  };

  const handleGlobalAudioStop = () => {
    setGlobalAudioPlaying(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-love-100">
        <div className="text-center">
          <Heart
            size={48}
            className="mx-auto text-love-500 animate-pulse mb-4"
          />
          <p className="text-love-600 text-lg font-medium">
            Loading a special surprise...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-love-100 to-white">
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-gold-500 opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Sparkles size={Math.random() * 20 + 10} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative pt-12 pb-8 px-6 text-center blur-in overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-love-200 opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="relative">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-love-800 mb-3 animate-slide-down">
            Happy Birthday
          </h1>
          <p className="text-love-600 text-xl md:text-2xl max-w-md mx-auto animate-slide-up">
            To the most beautiful soul I've ever known
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto pb-24">
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <BirthdayCake onBlowCandles={handleBlowCandles} />
        </div>

        <div
          className="my-16 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <BirthdayLetter isOpen={letterRevealed} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <CountdownTimer
            targetDate={nextBirthdayDate}
            title="Until Our Next Celebration"
            description="Every moment until then is precious"
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <RelationshipTimeline />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.1s" }}>
          <PhotoGallery />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <PhotoCarousel />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.3s" }}>
          <VirtualGift />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.4s" }}>
          <SpotifyPlaylist
            playlistId="37i9dQZF1DX0MLFaUdXnjA" // Replace with your actual playlist ID
            title="Our Love Playlist"
            description="Songs that define our journey together"
            onPlay={handlePlaylistPlay}
            onStop={handlePlaylistStop}
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.5s" }}>
          <LoveMap />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.6s" }}>
          <DistanceMap />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1.7s" }}>
          <Fireworks />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-love-500">
        <div className="flex items-center justify-center">
          <Heart size={16} className="mr-2" />
          <p>Made with love, for you</p>
        </div>
      </footer>

      {/* Background music - only render if global audio should play */}
      {globalAudioPlaying && (
        <MusicPlayer
          audioSrc="/love.mp3"
          autoPlay={true}
          onStop={handleGlobalAudioStop}
        />
      )}
    </div>
  );
};

export default Index;
