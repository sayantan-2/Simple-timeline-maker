// components/Sidebar/TimelineItem.js
import React from "react";
import { Trash2 } from "lucide-react";

export const TimelineItem = ({
  timeline,
  isActive,
  onSelect,
  onDelete,
  canDelete,
}) => {
  return (
    <div
      className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
        isActive ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex-grow min-w-0 mr-2" onClick={onSelect}>
        <span className="text-sm font-medium truncate block">
          {timeline.name}
        </span>
      </div>
      {canDelete && (
        <button
          onClick={() => onDelete(timeline.id)}
          className="text-gray-500 hover:text-red-600 p-1 rounded-md transition-colors flex-shrink-0"
          title="Delete Timeline"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};
