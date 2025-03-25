
import { useState } from 'react';
import { Calendar, Heart } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Calendar className="mr-2 text-love-600" size={24} />
          Our Journey Together
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          A timeline of our most precious moments
        </p>
      </div>

      <div className="relative">
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
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'} py-4`}>
                <div 
                  className="glass-morphism rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => setActiveEvent(event)}
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
    </div>
  );
};

export default RelationshipTimeline;
