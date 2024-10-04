// components/Sidebar/ImportButton.js
import React, { useRef } from "react";
import { Upload } from "lucide-react";

export const ImportButton = ({ onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            // Get the filename without the extension and convert it to a readable format
            const filename = file.name
              .replace(/\.json$/, "") // Remove .json extension
              .replace(/-/g, " ") // Replace hyphens with spaces
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
              .join(" "); // Join words back together

            onImport(importedData, filename);
          } else {
            alert("Invalid timeline data format");
          }
        } catch (error) {
          alert("Error reading timeline file");
        }
      };
      reader.readAsText(file);
    }
    // Reset the file input
    event.target.value = "";
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        <Upload size={20} />
        Import Timeline
      </button>
    </div>
  );
};
