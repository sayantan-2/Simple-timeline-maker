// components/Sidebar/TimelineList.js
import React from "react";
import { TimelineItem } from "./TimelineItem";

export const TimelineList = ({
  timelines,
  currentTimelineId,
  onTimelineSelect,
  onTimelineDelete,
}) => {
  return (
    <div className="space-y-2">
      {timelines.map((timeline) => (
        <TimelineItem
          key={timeline.id}
          timeline={timeline}
          isActive={currentTimelineId === timeline.id}
          onSelect={() => onTimelineSelect(timeline.id)}
          onDelete={onTimelineDelete}
          canDelete={timelines.length > 1}
        />
      ))}
    </div>
  );
};
