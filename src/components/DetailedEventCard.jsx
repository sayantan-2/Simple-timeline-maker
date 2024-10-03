// components/DetailedEventCard.jsx

import React from "react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";

export const DetailedEventCard = ({ event, onClose }) => {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 pr-12">
            {event.title}
          </h2>
          <p className="text-sm font-medium text-indigo-600 mt-1">
            {new Date(event.date).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <Button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
