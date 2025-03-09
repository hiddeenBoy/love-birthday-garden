
import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

interface BirthdayLetterProps {
  isOpen: boolean;
}

const BirthdayLetter = ({ isOpen }: BirthdayLetterProps) => {
  const letterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && letterRef.current) {
      letterRef.current.classList.add('open');
      
      // Scroll to letter when opened
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isOpen]);
  
  return (
    <div 
      className={`max-w-2xl mx-auto px-6 py-8 transition-all duration-1000 ${isOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}
    >
      <div className="glass-morphism rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <Heart size={48} className="mx-auto text-love-500 animate-pulse mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-love-800 mb-2">Happy Birthday My Love</h2>
          <div className="w-32 h-1 bg-love-300 mx-auto"></div>
        </div>
        
        <div 
          ref={letterRef}
          className="letter-content prose prose-lg prose-pink max-w-none"
        >
          <p className="text-love-700 font-medium leading-relaxed">
            To my amazing girlfriend,
          </p>
          
          <p className="text-love-700 leading-relaxed">
            On this special day, I want to celebrate you and all that you are. Your smile brightens even my darkest days, and your laugh is the sweetest melody I've ever heard. Every moment with you feels like a precious gift I get to unwrap over and over again.
          </p>
          
          <p className="text-love-700 leading-relaxed">
            Your love has transformed me in ways I never thought possible. You've shown me what it means to truly care for someone, to put their happiness before my own, and to find joy in the simplest moments we share together.
          </p>
          
          <p className="text-love-700 leading-relaxed">
            Today, as you begin another journey around the sun, I promise to be by your side, holding your hand, supporting your dreams, and loving you more deeply with each passing day.
          </p>
          
          <p className="text-love-700 leading-relaxed">
            May this year bring you all the happiness, success, and love that you deserve. May your heart be light, your smile be bright, and your spirit soar with the knowledge that you are loved beyond measure.
          </p>
          
          <p className="text-love-800 font-bold mt-6">
            Happy Birthday, my love. Today and always.
          </p>
          
          <p className="text-love-800 font-bold">
            With all my heart,
          </p>
          
          <p className="text-love-800 font-bold italic">
            Your Love
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayLetter;
