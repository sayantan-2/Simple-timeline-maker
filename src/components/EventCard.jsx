// components/EventCard.jsx

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import ReactMarkdown from "react-markdown";

export const EventCard = ({ event, onShowMore, onDelete }) => (
  <Card className="w-full shadow-md transition-shadow duration-300">
    <CardContent className="p-4">
      <h3 className="mb-2 font-bold text-gray-800 text-xl truncate">
        {event.title}
      </h3>
      <p className="text-sm font-medium text-indigo-500 mb-2">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <div className="text-gray-600 text-sm line-clamp-3 prose prose-sm max-w-none">
        <ReactMarkdown>{event.description}</ReactMarkdown>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => onShowMore(event)} variant="ghost" size="small">
          Show More
        </Button>
        <Button
          onClick={() => onDelete(event.id)}
          variant="danger"
          size="small"
          className="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
      </div>
    </CardContent>
  </Card>
);
