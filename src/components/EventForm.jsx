// components/EventForm.jsx
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import ReactMarkdown from "react-markdown";

const MAX_TITLE_LENGTH = 50;

const EventForm = ({ newEvent, setNewEvent, onSubmit }) => {
  const [isPreviewMode, setIsPreviewMode] = React.useState(false);

  return (
    <Card className="mb-8 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Input
              placeholder={`Event Title (max ${MAX_TITLE_LENGTH} characters)`}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  title: e.target.value.slice(0, MAX_TITLE_LENGTH),
                })
              }
              className="w-full"
              maxLength={MAX_TITLE_LENGTH}
            />
            <p className="text-sm text-gray-500 mt-1">
              {MAX_TITLE_LENGTH - newEvent.title.length} characters left
            </p>
          </div>
          <Input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="mt-4">
          <div className="flex space-x-2 mb-2">
            <Button
              onClick={() => setIsPreviewMode(false)}
              variant={!isPreviewMode ? "default" : "ghost"}
              className={!isPreviewMode ? "bg-indigo-600" : ""}
            >
              Write
            </Button>
            <Button
              onClick={() => setIsPreviewMode(true)}
              variant={isPreviewMode ? "default" : "ghost"}
              className={isPreviewMode ? "bg-indigo-600" : ""}
            >
              Preview
            </Button>
          </div>

          {!isPreviewMode ? (
            <textarea
              placeholder="Description (Markdown supported)"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-2 border rounded min-h-[120px]"
              rows="5"
            />
          ) : (
            <div className="border rounded p-4 min-h-[120px] prose max-w-none">
              <ReactMarkdown>
                {newEvent.description || "Preview will appear here"}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <Button
          onClick={onSubmit}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Add Event
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventForm;
