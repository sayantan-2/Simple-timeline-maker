import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import ReactMarkdown from "react-markdown";

export const EventCard = ({ event, onShowMore, onDelete }) => (
  <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <CardContent className="p-0">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white mb-1 leading-tight">
            {event.title}
          </h3>
        </div>
        <p className="text-sm font-medium text-white/80">
          {new Date(event.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="p-4">
        <div className="text-gray-600 text-sm line-clamp-3 prose prose-sm max-w-none mb-4">
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => onDelete(event.id)}
            variant="ghost"
            size="icon"
            // className="text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200 rounded-full"
            className="text-gray-500 hover:text-red-600 p-1 rounded-md transition-colors flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button
            onClick={() => onShowMore(event)}
            variant="outline"
            size="sm"
            className="text-indigo-600 hover:text-white hover:bg-indigo-600 transition-colors duration-200 group-hover:border-indigo-600 px-2 py-1"
          >
            Show More
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);
