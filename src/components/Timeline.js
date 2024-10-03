import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const MAX_TITLE_LENGTH = 50;
const DESCRIPTION_PREVIEW_LENGTH = 100;

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [expandedEventId, setExpandedEventId] = useState(null);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now(), title: newEvent.title.slice(0, MAX_TITLE_LENGTH) }]);
      setNewEvent({ title: '', date: '', description: '' });
    }
  };

  const removeEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  const toggleDescription = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Chronological Timeline</h1>
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  placeholder={`Event Title (max ${MAX_TITLE_LENGTH} characters)`}
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value.slice(0, MAX_TITLE_LENGTH) })}
                  className="w-full"
                  maxLength={MAX_TITLE_LENGTH}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {MAX_TITLE_LENGTH - newEvent.title.length} characters left
                </p>
              </div>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full"
              />
            </div>
            <Input
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full mt-4"
            />
            <Button onClick={addEvent} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Add Event
            </Button>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-300 ml-6 md:ml-0 md:left-1/2"></div>

          {sortedEvents.map((event, index) => (
            <div key={event.id} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}>
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-indigo-500 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
              </div>
              <Card className="order-1 w-5/12 shadow-md transition-shadow duration-300">
                <CardContent className="p-4">
                  <h3 className="mb-2 font-bold text-gray-800 text-xl truncate">{event.title}</h3>
                  <p className="text-sm font-medium text-indigo-500 mb-2">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {expandedEventId === event.id
                      ? event.description
                      : `${event.description.slice(0, DESCRIPTION_PREVIEW_LENGTH)}${event.description.length > DESCRIPTION_PREVIEW_LENGTH ? '...' : ''}`}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    {event.description.length > DESCRIPTION_PREVIEW_LENGTH && (
                      <Button
                        onClick={() => toggleDescription(event.id)}
                        className="text-indigo-500 hover:text-indigo-700 bg-transparent p-0"
                      >
                        {expandedEventId === event.id ? 'Show Less' : 'Show More'}
                      </Button>
                    )}
                    <Button
                      onClick={() => removeEvent(event.id)}
                      className="text-red-500 hover:text-red-700 bg-transparent hover:bg-red-100 rounded-full p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;