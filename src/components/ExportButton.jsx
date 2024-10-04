import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const ExportButton = ({ onClick }) => (
  <div className="text-center">
    <Button
      onClick={onClick}
      className="rounded-full w-12 h-12 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
    >
      <Download size={24} />
    </Button>
    <p className="mt-1 text-sm text-green-600 font-medium">Export</p>
  </div>
);

export default ExportButton;
