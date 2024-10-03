import React from "react";
import { EventCard } from "./EventCard";

const TimelineList = ({ events, onShowMore, onDelete }) => (
  <div className="relative">
    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600"></div>
    {events.map((event, index) => (
      <div
        key={event.id}
        className={`mb-8 flex justify-between items-center w-full ${
          index % 2 === 0 ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-5/12"></div>
        <div className="z-20 flex items-center justify-center bg-white border-4 border-indigo-500 shadow-md w-12 h-12 rounded-full">
          <span className="font-bold text-lg text-indigo-600">{index + 1}</span>
        </div>
        <div className="w-5/12">
          <EventCard
            event={event}
            onShowMore={onShowMore}
            onDelete={onDelete}
          />
        </div>
      </div>
    ))}
  </div>
);

export default TimelineList;
