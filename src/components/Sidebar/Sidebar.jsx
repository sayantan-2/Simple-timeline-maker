// components/Sidebar/Sidebar.js
import React from "react";
import { Plus } from "lucide-react";
import { TimelineList } from "./TimelineList";

export const Sidebar = ({
  isOpen,
  timelines,
  currentTimelineId,
  onAddTimeline,
  onTimelineSelect,
  onTimelineDelete,
}) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 overflow-hidden`}
    >
      <div className="p-4 mt-16">
        <button
          onClick={onAddTimeline}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mb-4"
        >
          <Plus size={20} />
          New Timeline
        </button>

        <TimelineList
          timelines={timelines}
          currentTimelineId={currentTimelineId}
          onTimelineSelect={onTimelineSelect}
          onTimelineDelete={onTimelineDelete}
        />
      </div>
    </div>
  );
};
