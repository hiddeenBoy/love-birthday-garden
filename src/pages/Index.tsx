
import { useState, useEffect } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import BirthdayCake from '@/components/BirthdayCake';
import PhotoGallery from '@/components/PhotoGallery';
import PhotoCarousel from '@/components/PhotoCarousel';
import BirthdayLetter from '@/components/BirthdayLetter';
import { Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [letterRevealed, setLetterRevealed] = useState(false);

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
          style={{ animationDelay: "0.8s" }}
        >
          <BirthdayLetter isOpen={letterRevealed} />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <PhotoGallery />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <PhotoCarousel />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-love-500">
        <div className="flex items-center justify-center">
          <Heart size={16} className="mr-2" />
          <p>Made with love, for you</p>
        </div>
      </footer>

      {/* Background music */}
      <MusicPlayer audioSrc="/love.mp3" autoPlay={true} />
    </div>
  );
};

export default Index;
