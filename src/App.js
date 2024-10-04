// App.js
import React, { useState } from 'react';
import Timeline from './components/Timeline';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SidebarToggle } from './components/Sidebar/SidebarToggle';
import { useTimelines } from './hooks/useTimelines';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    timelines,
    currentTimelineId,
    getCurrentTimeline,
    addNewTimeline,
    updateTimelineEvents,
    deleteTimeline,
    renameTimeline,
    setCurrentTimelineId,
    importTimelines,
  } = useTimelines();

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarToggle
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        timelines={timelines}
        currentTimelineId={currentTimelineId}
        onAddTimeline={addNewTimeline}
        onTimelineSelect={setCurrentTimelineId}
        onTimelineDelete={deleteTimeline}
        onImportTimeline={importTimelines}
      />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
      >
        <Timeline
          events={getCurrentTimeline().events}
          onEventsUpdate={updateTimelineEvents}
          timelineName={getCurrentTimeline().name}
          onRename={(newName) => renameTimeline(currentTimelineId, newName)}
        />
      </div>
    </div>
  );
};

export default App;