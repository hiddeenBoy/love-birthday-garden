
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface BirthdayCakeProps {
  onBlowCandles: () => void;
}

const BirthdayCake = ({ onBlowCandles }: BirthdayCakeProps) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  
  const handleBlowCandles = () => {
    if (candlesBlown || isAnimating) return;
    
    setIsAnimating(true);
    setCandlesBlown(true);
    
    // Create confetti
    createConfetti();
    
    // Notify after animation completes
    setTimeout(() => {
      toast({
        title: "Candles blown!",
        description: "Your wish is coming true...",
      });
      
      // Trigger parent callback
      onBlowCandles();
      setIsAnimating(false);
    }, 1000);
  };
  
  const createConfetti = () => {
    const colors = ['#FB8CA9', '#FFD34D', '#FCB9E9', '#9b87f5', '#FFA99F'];
    const container = document.getElementById('confetti-container');
    
    if (!container) return;
    
    // Clear any existing confetti
    container.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-20px`;
      confetti.style.width = `${Math.random() * 8 + 5}px`;
      confetti.style.height = confetti.style.width;
      confetti.style.opacity = '1';
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.classList.add('confetti-animation');
      
      container.appendChild(confetti);
      
      // Clean up confetti
      setTimeout(() => {
        if (confetti.parentNode === container) {
          container.removeChild(confetti);
        }
      }, 3000);
    }
  };
  
  return (
    <div className="relative cake-container w-full max-w-sm mx-auto mt-8 mb-12 pb-8">
      <div id="confetti-container" className="absolute inset-0 overflow-hidden pointer-events-none z-10"></div>
      
      <div className="cake-plate relative mx-auto w-64 h-64 animate-float">
        {/* Cake */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-36 bg-love-200 rounded-t-3xl rounded-b-md shadow-lg">
          {/* Cake layers */}
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[33%] bg-love-300"></div>
            <div className="absolute bottom-[33%] left-0 w-full h-[1px] bg-love-400"></div>
            <div className="absolute bottom-[66%] left-0 w-full h-[1px] bg-love-400"></div>
            
            {/* Cake decoration */}
            <div className="absolute top-0 left-0 w-full h-4 bg-love-400 rounded-t-3xl"></div>
            
            {/* Cake texture */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="absolute bottom-6 bg-love-100 rounded-full w-2 h-2" style={{ left: `${i * 10 + 5}px` }}></div>
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="absolute bottom-6 bg-love-100 rounded-full w-2 h-2" style={{ right: `${i * 10 + 5}px` }}></div>
            ))}
          </div>
          
          {/* Candles - Positioned clearly on top of the cake */}
          <div className="absolute w-full flex justify-center items-center -top-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative mx-3 z-10">
                {/* Candle */}
                <div className="w-3 h-16 bg-gold-300 rounded-sm"></div>
                
                {/* Flame */}
                <div className={`candle-flame absolute -top-8 left-1/2 -translate-x-1/2 ${candlesBlown ? 'opacity-0 transition-opacity duration-500' : 'animate-pulse'}`}>
                  <div className="w-4 h-8 bg-gold-500 rounded-full blur-[2px]"></div>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-love-400 rounded-full blur-[1px]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Plate */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-6 bg-gray-100 rounded-full shadow-md"></div>
      </div>
      
      <div className="mt-12 text-center">
        <button
          onClick={handleBlowCandles}
          disabled={candlesBlown || isAnimating}
          className={`
            glass-morphism px-8 py-3 rounded-full text-lg font-medium
            transition-all duration-300 transform
            ${candlesBlown 
              ? 'bg-gray-200 text-gray-400 cursor-default' 
              : 'bg-gold-gradient text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {candlesBlown ? "Candles Blown" : "Make a Wish & Blow Candles"}
        </button>
      </div>
    </div>
  );
};

export default BirthdayCake;
