import React from "react";
import { Button } from "./ui/button";

const AddEventButton = ({ onClick }) => (
  <div className="fixed top-4 right-4 text-center">
    <Button
      onClick={onClick}
      className="rounded-full w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold"
    >
      +
    </Button>
    <p className="mt-1 text-sm text-indigo-600 font-medium">Add Event</p>
  </div>
);

export default AddEventButton;
