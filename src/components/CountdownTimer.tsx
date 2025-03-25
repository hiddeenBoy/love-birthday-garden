
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CountdownTimerProps {
  targetDate: Date;
  title: string;
  description?: string;
}

const CountdownTimer = ({ targetDate, title, description }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="max-w-2xl mx-auto my-6 md:my-10 glass-morphism p-4 md:p-6 rounded-xl shadow-lg">
      <div className="text-center mb-3 md:mb-4">
        <h2 className="font-display text-xl md:text-3xl font-bold text-love-800 mb-1 md:mb-2 flex items-center justify-center">
          <Clock className="mr-2 text-love-600" size={isMobile ? 20 : 24} />
          {title}
        </h2>
        {description && <p className="text-love-600 text-sm md:text-base">{description}</p>}
      </div>

      <div className="grid grid-cols-4 gap-1 md:gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-white w-full py-2 md:py-3 px-1 md:px-2 rounded-lg shadow-md mb-1 md:mb-2">
              <div className="text-xl md:text-4xl font-bold text-love-700 text-center">
                {value}
              </div>
            </div>
            <span className="text-xs md:text-base text-love-600 capitalize">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
