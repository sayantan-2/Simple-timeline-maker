import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Download, Calendar, Palette, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Updated theme definitions with more sophisticated color schemes
const themes = {
  light: {
    name: "Light",
    background: "bg-gray-50",
    text: "text-gray-800",
    timeline: "bg-blue-200",
    cardBorder: "border-blue-300",
    cardBg: "bg-white",
    nodeColors: ["bg-blue-500", "bg-green-500"],
    buttonBg: "bg-blue-600 hover:bg-blue-700",
    containerBg: "bg-gradient-to-br from-blue-50 to-indigo-100",
  },
  dark: {
    name: "Dark",
    background: "bg-gray-900",
    text: "text-gray-100",
    timeline: "bg-purple-700",
    cardBorder: "border-purple-500",
    cardBg: "bg-gray-800",
    nodeColors: ["bg-purple-500", "bg-pink-500"],
    buttonBg: "bg-purple-600 hover:bg-purple-700",
    containerBg: "bg-gradient-to-br from-gray-900 to-purple-900",
  },
  nature: {
    name: "Nature",
    background: "bg-green-50",
    text: "text-green-900",
    timeline: "bg-green-300",
    cardBorder: "border-green-400",
    cardBg: "bg-white",
    nodeColors: ["bg-green-600", "bg-yellow-500"],
    buttonBg: "bg-green-600 hover:bg-green-700",
    containerBg: "bg-gradient-to-br from-green-100 to-yellow-200",
  },
  sunset: {
    name: "Sunset",
    background: "bg-orange-50",
    text: "text-orange-900",
    timeline: "bg-orange-300",
    cardBorder: "border-orange-400",
    cardBg: "bg-white",
    nodeColors: ["bg-orange-500", "bg-red-500"],
    buttonBg: "bg-orange-600 hover:bg-orange-700",
    containerBg: "bg-gradient-to-br from-yellow-200 to-red-200",
  },
  neon: {
    name: "Neon",
    background: "bg-black",
    text: "text-white",
    timeline: "bg-purple-600",
    cardBorder: "border-pink-500",
    cardBg: "bg-gray-900",
    nodeColors: ["bg-cyan-400", "bg-pink-500"],
    buttonBg: "bg-cyan-400 hover:bg-cyan-300",
    containerBg: "bg-gradient-to-br from-purple-900 to-black",
  },
  pastel: {
    name: "Pastel",
    background: "bg-pink-50",
    text: "text-gray-700",
    timeline: "bg-yellow-200",
    cardBorder: "border-blue-200",
    cardBg: "bg-white",
    nodeColors: ["bg-pink-300", "bg-blue-300"],
    buttonBg: "bg-purple-300 hover:bg-purple-400",
    containerBg: "bg-gradient-to-br from-pink-100 to-blue-100",
  },
  cyberpunk: {
    name: "Cyberpunk",
    background: "bg-yellow-400",
    text: "text-purple-900",
    timeline: "bg-purple-600",
    cardBorder: "border-cyan-400",
    cardBg: "bg-yellow-300",
    nodeColors: ["bg-cyan-400", "bg-purple-600"],
    buttonBg: "bg-purple-600 hover:bg-purple-700",
    containerBg: "bg-gradient-to-br from-yellow-400 to-pink-500",
  },
  monochrome: {
    name: "Monochrome",
    background: "bg-gray-100",
    text: "text-gray-900",
    timeline: "bg-gray-400",
    cardBorder: "border-gray-300",
    cardBg: "bg-white",
    nodeColors: ["bg-gray-600", "bg-gray-800"],
    buttonBg: "bg-gray-800 hover:bg-gray-900",
    containerBg: "bg-gradient-to-br from-gray-200 to-gray-400",
  },
  ocean: {
    name: "Ocean",
    background: "bg-blue-50",
    text: "text-blue-900",
    timeline: "bg-blue-300",
    cardBorder: "border-blue-400",
    cardBg: "bg-white",
    nodeColors: ["bg-blue-600", "bg-green-400"],
    buttonBg: "bg-blue-600 hover:bg-blue-700",
    containerBg: "bg-gradient-to-br from-blue-200 to-green-200",
  },
  vintage: {
    name: "Vintage",
    background: "bg-yellow-50",
    text: "text-brown-900",
    timeline: "bg-yellow-200",
    cardBorder: "border-yellow-600",
    cardBg: "bg-yellow-100",
    nodeColors: ["bg-yellow-600", "bg-red-700"],
    buttonBg: "bg-red-700 hover:bg-red-800",
    containerBg: "bg-gradient-to-br from-yellow-100 to-red-100",
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
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette className="w-5 h-5 text-gray-600" />
        <span>{themes[currentTheme].name} Theme</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-10"
            role="menu"
            aria-orientation="vertical"
            tabIndex="-1"
          >
            <div className="py-1">
              {Object.entries(themes).map(([themeKey, theme]) => (
                <motion.div
                  key={themeKey}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    (focusedTheme || currentTheme) === themeKey
                      ? `${themes[themeKey].buttonBg} text-white`
                      : "text-gray-700"
                  } hover:bg-gray-100 hover:text-gray-900 flex justify-between items-center transition-colors duration-200`}
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme.name}
                  {currentTheme === themeKey && <Check className="w-4 h-4" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelineGenerator = ({ events }) => {
  const timelineRef = useRef(null);
  const [formattedEvents, setFormattedEvents] = useState(events);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [previewTheme, setPreviewTheme] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const downloadImage = async () => {
    if (timelineRef.current === null) {
      return;
    }

    setIsDownloading(true);

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
    } finally {
      setIsDownloading(false);
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
        <motion.button
          onClick={downloadImage}
          disabled={isDownloading}
          className={`px-6 py-3 ${
            theme.buttonBg
          } text-white rounded-full shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
            isDownloading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
          }`}
          whileHover={{ scale: isDownloading ? 1 : 1.05 }}
          whileTap={{ scale: isDownloading ? 1 : 0.95 }}
        >
          <Download
            className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`}
          />
          <span>{isDownloading ? "Downloading..." : "Download Timeline"}</span>
        </motion.button>

        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onThemeHover={handleThemeHover}
        />
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={timelineRef}
          className={`${theme.background} p-12 rounded-xl shadow-2xl transition-colors duration-300 max-w-4xl w-full`}
        >
          <h1 className={`text-4xl font-bold mb-12 text-center ${theme.text}`}>
            Event Timeline
          </h1>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${theme.timeline} rounded-full`}
            ></div>

            {formattedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="relative flex items-center justify-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${
                    theme.nodeColors[index % 2]
                  } flex items-center justify-center z-10 transition-colors duration-300 shadow-lg`}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="text-white font-medium">{index + 1}</span>
                </motion.div>

                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "ml-auto pl-16" : "mr-auto pr-16"
                  }`}
                >
                  <motion.div
                    className={`p-6 ${theme.cardBg} border ${theme.cardBorder} rounded-lg shadow-md transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className={`font-bold ${theme.text} text-xl mb-2`}>
                      {event.title}
                    </h3>
                    <p className={`${theme.text} opacity-80 mb-4`}>
                      {event.description}
                    </p>
                    <p
                      className={`text-sm ${theme.text} opacity-60 font-semibold`}
                    >
                      {event.formattedDate}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineGenerator;
