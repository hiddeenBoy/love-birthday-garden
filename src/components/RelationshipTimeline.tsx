
import { useState } from 'react';
import { Calendar, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
}

// Sample timeline events - you can customize these
const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "When we first met",
    title: "The Beginning",
    description: "The day our eyes met and our story began.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    date: "Our first date",
    title: "Perfect First Date",
    description: "When we knew this was going to be something special.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    date: "Our anniversary",
    title: "One Year Together",
    description: "Celebrating 365 days of laughter, love, and memories.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    date: "Special trip",
    title: "Adventure Together",
    description: "Exploring new places, hand in hand.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const RelationshipTimeline = () => {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const isMobile = useIsMobile();

  const handleEventClick = (event: TimelineEvent) => {
    setActiveEvent(event);
    setShowEventDetails(true);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 md:my-16 px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Calendar className="mr-2 text-love-600" size={isMobile ? 20 : 24} />
          Our Journey Together
        </h2>
        <p className="text-love-600 text-base md:text-lg max-w-md mx-auto">
          A timeline of our most precious moments
        </p>
      </div>

      {/* Desktop timeline */}
      {!isMobile && (
        <div className="relative hidden md:block">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-love-200 rounded-full"></div>

          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Line marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-7 h-7 bg-love-100 border-4 border-love-500 rounded-full z-10 flex items-center justify-center">
                  <Heart size={14} className="text-love-500" fill="#FB8CA9" />
                </div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div 
                    className="glass-morphism rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    {event.imageSrc && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.imageSrc} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className="inline-block px-2 py-1 bg-love-500 text-white text-sm rounded">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-display font-bold text-love-700 mb-1">{event.title}</h3>
                      <p className="text-love-600">{event.description}</p>
                    </div>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile timeline */}
      {isMobile && (
        <div className="block md:hidden">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-love-200 rounded-full"></div>

            {/* Timeline events */}
            <div className="space-y-8 pl-12">
              {timelineEvents.map((event) => (
                <div key={event.id} className="relative">
                  {/* Line marker */}
                  <div className="absolute left-0 top-6 transform -translate-x-[14px] w-6 h-6 bg-love-100 border-4 border-love-500 rounded-full z-10 flex items-center justify-center">
                    <Heart size={12} className="text-love-500" fill="#FB8CA9" />
                  </div>

                  {/* Content */}
                  <div 
                    className="glass-morphism rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 active:scale-98 cursor-pointer mb-4"
                    onClick={() => handleEventClick(event)}
                  >
                    {event.imageSrc && (
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={event.imageSrc} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <span className="inline-block px-2 py-1 bg-love-500 text-white text-xs rounded">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="text-lg font-display font-bold text-love-700 mb-1">{event.title}</h3>
                      <p className="text-love-600 text-sm">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Event details dialog for both mobile and desktop */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="sm:max-w-md w-[90%] max-w-[90vw] glass-morphism border-love-200">
          {activeEvent && (
            <div className="p-0">
              {activeEvent.imageSrc && (
                <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={activeEvent.imageSrc} 
                    alt={activeEvent.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1">{activeEvent.title}</h3>
                    <span className="inline-block px-2 py-1 bg-love-500 text-white text-sm rounded">
                      {activeEvent.date}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-4">
                <p className="text-love-700 text-base md:text-lg">{activeEvent.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RelationshipTimeline;
