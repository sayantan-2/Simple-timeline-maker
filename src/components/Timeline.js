import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const MAX_TITLE_LENGTH = 50;
// const DESCRIPTION_PREVIEW_LENGTH = 100;

const EventCard = ({ event, index, onShowMore, onDelete }) => (
  <Card className="w-full shadow-md transition-shadow duration-300">
    <CardContent className="p-4">
      <h3 className="mb-2 font-bold text-gray-800 text-xl truncate">{event.title}</h3>
      <p className="text-sm font-medium text-indigo-500 mb-2">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 text-sm line-clamp-3">
        {event.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <Button
          onClick={() => onShowMore(event)}
          variant="ghost"
          size="small"
        >
          Show More
        </Button>
        <Button
          onClick={() => onDelete(event.id)}
          variant="danger"
          size="small"
          className="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const DetailedEventCard = ({ event, onClose }) => (
  <Card className="fixed inset-0 z-50 overflow-auto bg-white">
    <CardContent className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="text-lg font-medium text-indigo-500 mb-4">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-6 whitespace-pre-wrap">{event.description}</p>
      <Button onClick={onClose} className="bg-indigo-500 hover:bg-indigo-600 text-white">
        Close
      </Button>
    </CardContent>
  </Card>
);

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const showDetailedEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeDetailedEvent = () => {
    setSelectedEvent(null);
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
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full mt-4 p-2 border rounded"
              rows="3"
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
              <div className="order-1 w-5/12">
                <EventCard
                  event={event}
                  index={index}
                  onShowMore={showDetailedEvent}
                  onDelete={removeEvent}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && (
        <DetailedEventCard event={selectedEvent} onClose={closeDetailedEvent} />
      )}
    </div>
  );
};

export default Timeline;