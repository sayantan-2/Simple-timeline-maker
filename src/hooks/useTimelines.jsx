// hooks/useTimelines.js
import { useState, useEffect } from "react";

export const useTimelines = () => {
  const [timelines, setTimelines] = useState(() => {
    const savedTimelines = localStorage.getItem("timelines");
    return savedTimelines
      ? JSON.parse(savedTimelines)
      : [
          {
            id: "default",
            name: "My First Timeline",
            events: [],
          },
        ];
  });

  const [currentTimelineId, setCurrentTimelineId] = useState(() => {
    const savedCurrentId = localStorage.getItem("currentTimelineId");
    return savedCurrentId || "default";
  });

  useEffect(() => {
    localStorage.setItem("timelines", JSON.stringify(timelines));
  }, [timelines]);

  useEffect(() => {
    localStorage.setItem("currentTimelineId", currentTimelineId);
  }, [currentTimelineId]);

  const getCurrentTimeline = () => {
    return timelines.find((t) => t.id === currentTimelineId) || timelines[0];
  };

  const addNewTimeline = () => {
    const newTimeline = {
      id: `timeline-${Date.now()}`,
      name: `New Timeline`,
      events: [],
    };
    setTimelines([...timelines, newTimeline]);
    setCurrentTimelineId(newTimeline.id);
  };

  const updateTimelineEvents = (events) => {
    setTimelines(
      timelines.map((timeline) =>
        timeline.id === currentTimelineId ? { ...timeline, events } : timeline
      )
    );
  };

  const deleteTimeline = (timelineId) => {
    if (timelines.length === 1) {
      alert("You can't delete the last timeline!");
      return;
    }

    const newTimelines = timelines.filter((t) => t.id !== timelineId);
    setTimelines(newTimelines);

    if (currentTimelineId === timelineId) {
      setCurrentTimelineId(newTimelines[0].id);
    }
  };

  const renameTimeline = (timelineId, newName) => {
    setTimelines(
      timelines.map((timeline) =>
        timeline.id === timelineId ? { ...timeline, name: newName } : timeline
      )
    );
  };
  const importTimelines = (importedEvents, timelineName) => {
    const newTimeline = {
      id: `timeline-${Date.now()}`,
      name: timelineName,
      events: importedEvents,
    };
    setTimelines([...timelines, newTimeline]);
    setCurrentTimelineId(newTimeline.id);
  };

  return {
    timelines,
    currentTimelineId,
    getCurrentTimeline,
    addNewTimeline,
    updateTimelineEvents,
    deleteTimeline,
    renameTimeline,
    setCurrentTimelineId,
    importTimelines,
  };
};
