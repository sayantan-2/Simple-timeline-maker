import React from "react";
import { X } from "lucide-react";

const TimelineGeneratorModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-11/12 max-w-6xl bg-white rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="p-6 max-h-[90vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default TimelineGeneratorModal;
