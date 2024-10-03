import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import ReactMarkdown from 'react-markdown';

const MAX_TITLE_LENGTH = 50;

const EventCard = ({ event, index, onShowMore, onDelete }) => (
  <Card className="w-full shadow-md transition-shadow duration-300">
    <CardContent className="p-4">
      <h3 className="mb-2 font-bold text-gray-800 text-xl truncate">{event.title}</h3>
      <p className="text-sm font-medium text-indigo-500 mb-2">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <div className="text-gray-600 text-sm line-clamp-3 prose prose-sm max-w-none">
        <ReactMarkdown>{event.description}</ReactMarkdown>
      </div>
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

const DetailedEventCard = ({ event, onClose }) => {
  // Add keyboard event listener for ESC key
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Handle click outside
  const contentRef = React.useRef(null);
  const handleBackdropClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in duration-200"
      >
        {/* Close button - now more visible */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 pr-12">{event.title}</h2>
          <p className="text-sm font-medium text-indigo-600 mt-1">
            {new Date(event.date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </div>
        </div>

        {/* Footer with close button */}
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <Button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now(), title: newEvent.title.slice(0, MAX_TITLE_LENGTH) }]);
      setNewEvent({ title: '', date: '', description: '' });
      setIsPreviewMode(false);
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

            <div className="mt-4">
              <div className="flex space-x-2 mb-2">
                <Button
                  onClick={() => setIsPreviewMode(false)}
                  variant={!isPreviewMode ? "default" : "ghost"}
                  className={!isPreviewMode ? "bg-indigo-600" : ""}
                >
                  Write
                </Button>
                <Button
                  onClick={() => setIsPreviewMode(true)}
                  variant={isPreviewMode ? "default" : "ghost"}
                  className={isPreviewMode ? "bg-indigo-600" : ""}
                >
                  Preview
                </Button>
              </div>

              {!isPreviewMode ? (
                <textarea
                  placeholder="Description (Markdown supported)"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-2 border rounded min-h-[120px]"
                  rows="5"
                />
              ) : (
                <div className="border rounded p-4 min-h-[120px] prose max-w-none">
                  <ReactMarkdown>{newEvent.description || 'Preview will appear here'}</ReactMarkdown>
                </div>
              )}
            </div>

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