import React, { useState, useMemo, useRef, useEffect } from "react";
import EventForm from "./EventForm";
import TimelineList from "./TimelineList";
import { DetailedEventCard } from "./DetailedEventCard";
import EditEventForm from "./EditEventForm";
import AddEventButton from "./AddEventButton";
import PopupForm from "./PopupForm";
import { Pencil } from "lucide-react";

const Timeline = ({ events, onEventsUpdate, timelineName, onRename }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(timelineName);
  const titleInputRef = useRef(null);

  useEffect(() => {
    setEditedTitle(timelineName);
  }, [timelineName]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const startEditing = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    finishEditing();
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      setEditedTitle(timelineName);
      setIsEditingTitle(false);
    }
  };

  const finishEditing = () => {
    if (editedTitle.trim() !== "") {
      onRename(editedTitle.trim());
    } else {
      setEditedTitle(timelineName);
    }
    setIsEditingTitle(false);
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
      onEventsUpdate(updatedEvents);
      setNewEvent({ title: "", date: "", description: "" });
      setIsFormVisible(false);
    }
  };

  const removeEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    onEventsUpdate(updatedEvents);
  };

  const editEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    onEventsUpdate(updatedEvents);
    setEditingEvent(null);
  };

  const exportTimeline = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${timelineName
      .toLowerCase()
      .replace(/\s+/g, "-")}-export.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start gap-4 mb-8">
          <div className="flex-grow max-w-[70%]">
            {isEditingTitle ? (
              <div className="w-full">
                <textarea
                  ref={titleInputRef}
                  value={editedTitle}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className="text-4xl font-bold text-indigo-600 bg-transparent border-b-2 border-indigo-600 focus:outline-none focus:border-indigo-800 w-full resize-none overflow-hidden"
                  style={{
                    minHeight: "3rem",
                    height: "auto",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
              </div>
            ) : (
              <div className="group flex items-start gap-2">
                <h1 className="text-4xl font-bold text-indigo-600 whitespace-pre-wrap break-words">
                  {timelineName}
                </h1>
                <button
                  onClick={startEditing}
                  className="text-gray-500 hover:text-indigo-600 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100 mt-2"
                  title="Rename Timeline"
                >
                  <Pencil size={20} />
                </button>
              </div>
            )}
          </div>
          {events.length > 0 && (
            <button
              onClick={exportTimeline}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex-shrink-0"
            >
              Export Timeline
            </button>
          )}
        </div>

        {events.length > 0 && (
          <AddEventButton onClick={() => setIsFormVisible(true)} />
        )}

        {isFormVisible && (
          <PopupForm onClose={() => setIsFormVisible(false)}>
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
          onShowMore={(event) => setSelectedEvent(event)}
          onDelete={removeEvent}
        />

        {selectedEvent && (
          <DetailedEventCard
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onEdit={() => {
              setEditingEvent(selectedEvent);
              setSelectedEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Timeline;
