import React from "react";
import { Button } from "./ui/button";

const AddEventButton = ({ onClick }) => (
  <div className="text-center">
    <Button
      onClick={onClick}
      className="rounded-full w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white text-3xl font-bold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      +
    </Button>
    <p className="mt-2 text-sm text-indigo-600 font-semibold">Add Event</p>
  </div>
);

export default AddEventButton;
