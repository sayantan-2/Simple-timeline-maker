import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const ExportButton = ({ onClick }) => (
  <div className="text-center">
    <Button
      onClick={onClick}
      className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <Download size={24} />
    </Button>
    <p className="mt-2 text-sm text-green-600 font-semibold">Export</p>
  </div>
);

export default ExportButton;
