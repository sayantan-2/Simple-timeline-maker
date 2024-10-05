import React, { useState, useMemo, useRef, useEffect } from "react";
import EventForm from "./EventForm";
import TimelineList from "./TimelineList";
import { DetailedEventCard } from "./card/DetailedEventCard";
import EditEventForm from "./card/EditEventForm";
import AddEventButton from "./AddEventButton";
import ExportButton from "./ExportButton";
import PopupForm from "./PopupForm";
import { Pencil } from "lucide-react";
import ExportImageButton from "./ExportImageButton";
import TimelineGenerator from "./TimelineGenerator";
import TimelineGeneratorModal from "./TimelineGeneratorModal";

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
      e.preventDefault();
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
      .replace(/\s+/g, "-")}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);
  const [isTimelineGeneratorVisible, setIsTimelineGeneratorVisible] =
    useState(false);
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        <div className="flex justify-between items-start gap-4 mb-8">
          <div className="flex-grow max-w-[70%]">
            <div className="group relative">
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
                <>
                  <h1 className="text-4xl font-bold text-indigo-600 break-words pr-12">
                    {timelineName}
                  </h1>
                  <button
                    onClick={startEditing}
                    className="absolute top-0 right-0 text-gray-500 hover:text-indigo-600 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    title="Rename Timeline"
                  >
                    <Pencil size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

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

        {events.length === 0 ? (
          <div className="text-center">
            <EventForm
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              onSubmit={addEvent}
            />
          </div>
        ) : (
          <div className="fixed top-4 right-4 flex flex-col items-center space-y-6">
            <AddEventButton onClick={() => setIsFormVisible(true)} />
            <ExportButton onClick={exportTimeline} />
            <ExportImageButton
              onClick={() => setIsTimelineGeneratorVisible(true)}
            />
          </div>
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
        <TimelineGeneratorModal
          isOpen={isTimelineGeneratorVisible}
          onClose={() => setIsTimelineGeneratorVisible(false)}
        >
          <TimelineGenerator events={events} />
        </TimelineGeneratorModal>
      </div>
    </div>
  );
};

export default Timeline;
