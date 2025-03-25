
import { useState, useEffect } from 'react';
import { Gift, Package, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const VirtualGift = () => {
  const [showGift, setShowGift] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const isMobile = useIsMobile();

  // Reset animation states when dialog closes
  useEffect(() => {
    if (!showDialog) {
      setTimeout(() => {
        setIsOpening(false);
        setIsOpen(false);
      }, 500);
    }
  }, [showDialog]);

  const handleOpenGift = () => {
    console.log("Opening gift - click handler triggered");
    if (!isOpening) {
      setIsOpening(true);
      
      // Simulate unwrapping animation
      setTimeout(() => {
        console.log("Setting isOpen to true");
        setIsOpen(true);
        
        // Show confetti after gift is open
        setTimeout(() => {
          console.log("Triggering confetti");
          createConfetti();
        }, 300); // Small delay for better visual effect
      }, 1000);
    }
  };

  const createConfetti = () => {
    console.log("Creating confetti");
    const confettiContainer = document.getElementById('gift-confetti-container');
    if (!confettiContainer) {
      console.log("Confetti container not found");
      return;
    }
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    // Create new confetti pieces
    const colors = ['#FB8CA9', '#FFD34D', '#F43F75', '#FFC926', '#FCACBF'];
    const confettiCount = isMobile ? 50 : 100; // Fewer confetti pieces on mobile
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.opacity = '1';
      confetti.style.position = 'absolute';
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      confettiContainer.appendChild(confetti);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 md:my-16 px-4 text-center">
      <div className="mb-6 md:mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Gift className="mr-2 text-love-600" size={isMobile ? 20 : 24} />
          A Special Gift For You
        </h2>
        <p className="text-love-600 text-base md:text-lg max-w-md mx-auto">
          Tap to unwrap your virtual present!
        </p>
      </div>

      <button
        className="mx-auto block transform hover:scale-105 transition-transform duration-300 focus:outline-none"
        onClick={() => setShowDialog(true)}
        aria-label="Open gift"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <Package 
              size={isMobile ? 96 : 128} 
              className="text-love-500 filter drop-shadow-lg animate-float"
            />
          </div>
          <div className="absolute -top-5 -right-5">
            <Heart size={isMobile ? 32 : 40} className="text-love-600" fill="#F43F75" />
          </div>
        </div>
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md w-[90%] max-w-[90vw] glass-morphism border-love-200">
          <DialogHeader>
            <DialogTitle className="text-center text-xl md:text-2xl font-display text-love-800">
              Your Special Gift
            </DialogTitle>
            <DialogDescription className="text-center text-love-600">
              Tap to unwrap your present!
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative h-56 md:h-64 flex items-center justify-center overflow-hidden">
            {/* Gift wrapping (shown before opening) */}
            {!isOpen && (
              <div 
                className={`absolute inset-0 bg-love-100 flex items-center justify-center transition-all duration-1000 ${
                  isOpening ? 'opacity-0 scale-150' : 'opacity-100'
                } cursor-pointer`} 
                onClick={handleOpenGift}
                style={{ cursor: 'pointer' }}
                aria-label="Unwrap gift"
              >
                <div className="relative">
                  <Package 
                    size={isMobile ? 80 : 100} 
                    className="text-love-500 filter drop-shadow-lg" 
                  />
                  <div className="absolute top-0 left-0 right-0 text-center -mt-6">
                    <span className="inline-block px-3 py-1 bg-love-500 text-white rounded-full text-sm animate-pulse">
                      Tap to open!
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Gift content (shown after opening) */}
            <div 
              className={`w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-center px-4">
                <h3 className="text-xl font-bold text-love-700 mb-2">I Love You!</h3>
                <p className="text-love-600 mb-4">
                  This gift represents my endless love for you. Happy Birthday!
                </p>
                <div className="animate-float">
                  <Heart size={isMobile ? 64 : 80} className="text-love-600 mx-auto" fill="#F43F75" />
                </div>
              </div>
            </div>
            
            {/* Confetti container */}
            <div 
              id="gift-confetti-container" 
              className="absolute inset-0 pointer-events-none overflow-hidden z-10"
            />
          </div>

          <style>
            {`
              @keyframes fall {
                0% {
                  transform: translateY(-10px) rotate(0deg);
                  opacity: 1;
                }
                100% {
                  transform: translateY(100px) rotate(360deg);
                  opacity: 0;
                }
              }
              
              .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                animation: fall 3s linear forwards;
              }
            `}
          </style>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VirtualGift;
