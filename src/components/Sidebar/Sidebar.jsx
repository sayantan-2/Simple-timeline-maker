// components/Sidebar/Sidebar.js (update)
import React from "react";
import { Plus } from "lucide-react";
import { TimelineList } from "./TimelineList";
import { ImportButton } from "./ImportButton";

export const Sidebar = ({
  isOpen,
  timelines,
  currentTimelineId,
  onAddTimeline,
  onTimelineSelect,
  onTimelineDelete,
  onImportTimeline,
}) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 flex flex-col`}
    >
      <div className="p-4 mt-16 flex-grow overflow-y-auto">
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

      <ImportButton onImport={onImportTimeline} />
    </div>
  );
};
