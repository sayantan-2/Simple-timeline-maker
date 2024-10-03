// components/TimelineList.jsx
import React from "react";
import { EventCard } from "./EventCard";

const TimelineList = ({ events, onShowMore, onDelete }) => (
  <div className="relative">
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-300 ml-6 md:ml-0 md:left-1/2"></div>
    {events.map((event, index) => (
      <div
        key={event.id}
        className={`mb-8 flex justify-between items-center w-full ${
          index % 2 === 0 ? "flex-row-reverse" : ""
        }`}
      >
        <div className="order-1 w-5/12"></div>
        <div className="z-20 flex items-center order-1 bg-indigo-500 shadow-xl w-8 h-8 rounded-full">
          <h1 className="mx-auto font-semibold text-lg text-white">
            {index + 1}
          </h1>
        </div>
        <div className="order-1 w-5/12">
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
