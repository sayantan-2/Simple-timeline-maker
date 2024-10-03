import React, { useState, useMemo } from "react";
import EventForm from "./EventForm";
import TimelineList from "./TimelineList";
import { DetailedEventCard } from "./DetailedEventCard";
import EditEventForm from "./EditEventForm";
import AddEventButton from "./AddEventButton";
import PopupForm from "./PopupForm";

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: "", date: "", description: "" });
      setIsFormVisible(false);
    }
  };

  const removeEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const editEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
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

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">
          Chronological Timeline
        </h1>

        {events.length > 0 && <AddEventButton onClick={toggleFormVisibility} />}

        {isFormVisible && (
          <PopupForm onClose={toggleFormVisibility}>
            <EventForm
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              onSubmit={addEvent}
            />
          </PopupForm>
        )}

        {editingEvent && (
          <PopupForm onClose={() => setEditingEvent(null)}>
            <EditEventForm
              event={editingEvent}
              onSave={editEvent}
              onCancel={() => setEditingEvent(null)}
            />
          </PopupForm>
        )}

        {events.length === 0 && (
          <EventForm
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            onSubmit={addEvent}
          />
        )}

        <TimelineList
          events={sortedEvents}
          onShowMore={showDetailedEvent}
          onDelete={removeEvent}
        />

        {selectedEvent && (
          <DetailedEventCard
            event={selectedEvent}
            onClose={closeDetailedEvent}
            onEdit={() => {
              setEditingEvent(selectedEvent);
              closeDetailedEvent();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Timeline;
