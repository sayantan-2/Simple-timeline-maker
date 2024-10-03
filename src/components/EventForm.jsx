import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CalendarIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

const MAX_TITLE_LENGTH = 50;

const EventForm = ({ newEvent, setNewEvent, onSubmit }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
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
            <p className="text-sm text-gray-500">
              {MAX_TITLE_LENGTH - newEvent.title.length} characters left
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Event Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full pl-10"
              />
              <CalendarIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <div className="flex space-x-2 mb-2">
              <Button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                variant={!isPreviewMode ? "default" : "outline"}
              >
                Write
              </Button>
              <Button
                type="button"
                onClick={() => setIsPreviewMode(true)}
                variant={isPreviewMode ? "default" : "outline"}
              >
                Preview
              </Button>
            </div>
            {!isPreviewMode ? (
              <Textarea
                id="description"
                placeholder="Description (Markdown supported)"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="w-full min-h-[120px]"
                rows="5"
              />
            ) : (
              <Card className="w-full min-h-[120px] p-4 bg-gray-50">
                <ReactMarkdown className="prose max-w-none">
                  {newEvent.description || "Preview will appear here"}
                </ReactMarkdown>
              </Card>
            )}
          </div>

          <Button type="submit" className="w-full">
            Add Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
