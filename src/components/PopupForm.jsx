import React from "react";
import { Button } from "./ui/button";

const PopupForm = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Add New Event</h3>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            variant="ghost"
            size="sm"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
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
          </Button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default PopupForm;
