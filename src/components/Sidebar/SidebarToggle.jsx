// components/Sidebar/SidebarToggle.js
import React from "react";
import { Menu, X } from "lucide-react";

export const SidebarToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
};
