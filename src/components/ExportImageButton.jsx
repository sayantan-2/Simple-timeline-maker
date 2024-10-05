import React from "react";
import { ImageDown } from "lucide-react";

const ExportImageButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 group"
      title="Export as Image"
    >
      <ImageDown
        size={24}
        className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-200"
      />
    </button>
  );
};

export default ExportImageButton;
