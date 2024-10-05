import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Calendar, Palette, Check } from "lucide-react";

// Theme definitions (unchanged)
const themes = {
  light: {
    name: "Light",
    background: "bg-white",
    text: "text-gray-800",
    timeline: "bg-gray-200",
    cardBorder: "border-blue-500",
    cardBg: "bg-white",
    nodeColors: ["bg-blue-500", "bg-green-500"],
    buttonBg: "bg-blue-600 hover:bg-blue-700",
    containerBg: "bg-gray-100",
  },
  dark: {
    name: "Dark",
    background: "bg-gray-900",
    text: "text-gray-100",
    timeline: "bg-gray-600",
    cardBorder: "border-purple-500",
    cardBg: "bg-gray-800",
    nodeColors: ["bg-purple-500", "bg-pink-500"],
    buttonBg: "bg-purple-600 hover:bg-purple-700",
    containerBg: "bg-gray-800",
  },
  colorful: {
    name: "Colorful",
    background: "bg-gradient-to-br from-blue-50 to-purple-50",
    text: "text-gray-900",
    timeline: "bg-gradient-to-b from-blue-300 to-purple-300",
    cardBorder: "border-indigo-500",
    cardBg: "bg-white",
    nodeColors: ["bg-indigo-500", "bg-pink-500"],
    buttonBg: "bg-indigo-600 hover:bg-indigo-700",
    containerBg: "bg-gradient-to-br from-blue-100 to-purple-100",
  },
  minimal: {
    name: "Minimal",
    background: "bg-stone-50",
    text: "text-stone-800",
    timeline: "bg-stone-300",
    cardBorder: "border-stone-400",
    cardBg: "bg-white",
    nodeColors: ["bg-stone-600", "bg-stone-500"],
    buttonBg: "bg-stone-600 hover:bg-stone-700",
    containerBg: "bg-stone-100",
  },
};

const ThemeSelector = ({ currentTheme, onThemeChange, onThemeHover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [focusedTheme, setFocusedTheme] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedTheme(currentTheme);
      }
    } else {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const themeKeys = Object.keys(themes);
        const currentIndex = themeKeys.indexOf(focusedTheme);
        let newIndex;
        if (e.key === "ArrowDown") {
          newIndex = (currentIndex + 1) % themeKeys.length;
        } else {
          newIndex = (currentIndex - 1 + themeKeys.length) % themeKeys.length;
        }
        const newTheme = themeKeys[newIndex];
        setFocusedTheme(newTheme);
        onThemeHover(newTheme);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onThemeChange(focusedTheme);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette className="w-5 h-5 text-gray-600" />
        <span>{themes[currentTheme].name} Theme</span>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          <div className="py-1">
            {Object.entries(themes).map(([themeKey, theme]) => (
              <div
                key={themeKey}
                className={`px-4 py-2 text-sm cursor-pointer ${
                  (focusedTheme || currentTheme) === themeKey
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } hover:bg-gray-100 hover:text-gray-900 flex justify-between items-center`}
                onClick={() => {
                  onThemeChange(themeKey);
                  setIsOpen(false);
                }}
                onMouseEnter={() => {
                  setFocusedTheme(themeKey);
                  onThemeHover(themeKey);
                }}
                onMouseLeave={() => onThemeHover(currentTheme)}
                role="menuitem"
                tabIndex="0"
              >
                {theme.name}
                {currentTheme === themeKey && <Check className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TimelineGenerator = ({ events }) => {
  const timelineRef = useRef(null);
  const [formattedEvents, setFormattedEvents] = useState(events);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [previewTheme, setPreviewTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("timelineTheme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("timelineTheme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const formatted = events.map((event) => ({
      ...event,
      formattedDate: new Date(event.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));
    setFormattedEvents(formatted);
  }, [events]);

  const generateImage = async () => {
    if (timelineRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(timelineRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: currentTheme === "dark" ? "#1a1a1a" : "#ffffff",
      });

      const link = document.createElement("a");
      link.download = "timeline.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    setPreviewTheme(null);
  };

  const handleThemeHover = (hoveredTheme) => {
    setPreviewTheme(hoveredTheme);
  };

  const theme = themes[previewTheme || currentTheme];

  return (
    <div
      className={`p-8 ${theme.containerBg} min-h-screen transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <button
          onClick={generateImage}
          className={`px-6 py-3 ${theme.buttonBg} text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2`}
        >
          <Calendar className="w-5 h-5" />
          <span>Generate Timeline Image</span>
        </button>

        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onThemeHover={handleThemeHover}
        />
      </div>

      <div className="flex justify-center">
        <div
          ref={timelineRef}
          className={`${theme.background} p-12 rounded-xl transition-colors duration-300`}
          style={{ width: "800px" }}
        >
          <h1 className={`text-4xl font-bold mb-12 text-center ${theme.text}`}>
            Event Timeline
          </h1>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full ${theme.timeline}`}
            ></div>

            {formattedEvents.map((event, index) => (
              <div
                key={event.id}
                className="relative flex items-center justify-center mb-16"
              >
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${
                    theme.nodeColors[index % 2]
                  } flex items-center justify-center z-10 transition-colors duration-300`}
                >
                  <span className="text-white font-medium">{index + 1}</span>
                </div>

                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "ml-auto pr-16" : "mr-auto pl-16"
                  }`}
                >
                  <div
                    className={`p-4 ${theme.cardBg} border rounded-lg shadow-md ${theme.cardBorder} transition-colors duration-300`}
                  >
                    <h3 className={`font-bold ${theme.text} text-lg mb-2`}>
                      {event.title}
                    </h3>
                    <p className={`${theme.text} opacity-80`}>
                      {event.description}
                    </p>
                    <p className={`mt-2 text-sm ${theme.text} opacity-60`}>
                      {event.formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineGenerator;
