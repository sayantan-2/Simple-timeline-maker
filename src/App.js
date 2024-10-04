import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import { Menu, X, Plus, Trash2 } from 'lucide-react';

function App() {
  const [timelines, setTimelines] = useState(() => {
    const savedTimelines = localStorage.getItem('timelines');
    return savedTimelines ? JSON.parse(savedTimelines) : [{
      id: 'default',
      name: 'My First Timeline',
      events: []
    }];
  });

  const [currentTimelineId, setCurrentTimelineId] = useState(() => {
    const savedCurrentId = localStorage.getItem('currentTimelineId');
    return savedCurrentId || 'default';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('timelines', JSON.stringify(timelines));
  }, [timelines]);

  useEffect(() => {
    localStorage.setItem('currentTimelineId', currentTimelineId);
  }, [currentTimelineId]);

  const getCurrentTimeline = () => {
    return timelines.find(t => t.id === currentTimelineId) || timelines[0];
  };

  const addNewTimeline = () => {
    const newTimeline = {
      id: `timeline-${Date.now()}`,
      name: `New Timeline ${timelines.length + 1}`,
      events: []
    };
    setTimelines([...timelines, newTimeline]);
    setCurrentTimelineId(newTimeline.id);
  };

  const updateTimelineEvents = (events) => {
    setTimelines(timelines.map(timeline =>
      timeline.id === currentTimelineId
        ? { ...timeline, events }
        : timeline
    ));
  };

  const deleteTimeline = (timelineId) => {
    if (timelines.length === 1) {
      alert("You can't delete the last timeline!");
      return;
    }

    const newTimelines = timelines.filter(t => t.id !== timelineId);
    setTimelines(newTimelines);

    if (currentTimelineId === timelineId) {
      setCurrentTimelineId(newTimelines[0].id);
    }
  };

  const renameTimeline = (timelineId, newName) => {
    setTimelines(timelines.map(timeline =>
      timeline.id === timelineId
        ? { ...timeline, name: newName }
        : timeline
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 overflow-hidden`}>
        <div className="p-4 mt-16">
          <button
            onClick={addNewTimeline}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mb-4"
          >
            <Plus size={20} />
            New Timeline
          </button>

          <div className="space-y-2">
            {timelines.map(timeline => (
              <div
                key={timeline.id}
                className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${currentTimelineId === timeline.id
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'hover:bg-gray-100'
                  }`}
              >
                <div
                  className="flex-grow min-w-0 mr-2"
                  onClick={() => setCurrentTimelineId(timeline.id)}
                >
                  <span className="text-sm font-medium truncate block">
                    {timeline.name}
                  </span>
                </div>
                {timelines.length > 1 && (
                  <button
                    onClick={() => deleteTimeline(timeline.id)}
                    className="text-gray-500 hover:text-red-600 p-1 rounded-md transition-colors flex-shrink-0"
                    title="Delete Timeline"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
        <Timeline
          events={getCurrentTimeline().events}
          onEventsUpdate={updateTimelineEvents}
          timelineName={getCurrentTimeline().name}
          onRename={(newName) => renameTimeline(currentTimelineId, newName)}
        />
      </div>
    </div>
  );
}

export default App;