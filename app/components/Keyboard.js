"use client";
import { useEffect, useRef, useState } from "react";

const setNativeValue = (element, value) => {
  const { set: valueSetter } =
    Object.getOwnPropertyDescriptor(element, "value") || {};
  const prototype = Object.getPrototypeOf(element);
  const { set: prototypeValueSetter } =
    Object.getOwnPropertyDescriptor(prototype, "value") || {};

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else if (valueSetter) {
    valueSetter.call(element, value);
  }
};

const VirtualKeyboard = ({ show, onHide }) => {
  const [capsLock, setCapsLock] = useState(false);
  const activeElement = useRef(null);

  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  ];

  useEffect(() => {
    const handleFocus = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        activeElement.current = e.target;
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, []);

  const handleKeyPress = (key) => {
    if (!activeElement.current) return;

    const input = activeElement.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    let newValue = input.value;

    // Key handling logic
    if (key === "Backspace") {
      newValue =
        newValue.slice(0, Math.max(0, start - 1)) + newValue.slice(end);
    } else if (key === "Space") {
      newValue = newValue.slice(0, start) + " " + newValue.slice(end);
    } else if (key === "Enter") {
      newValue = newValue.slice(0, start) + "\n" + newValue.slice(end);
    } else {
      newValue =
        newValue.slice(0, start) +
        (capsLock ? key.toUpperCase() : key) +
        newValue.slice(end);
    }

    // Update input value
    setNativeValue(input, newValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    // Maintain cursor position
    const newPosition =
      key === "Backspace" ? Math.max(0, start - 1) : start + 1;
    requestAnimationFrame(() => {
      input.selectionStart = newPosition;
      input.selectionEnd = newPosition;
    });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-lg z-[1000]">
      <div className="max-w-3xl mx-auto">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center mb-2">
            {row.map((key) => (
              <button
                key={key}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleKeyPress(key);
                }}
                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow mx-0.5"
              >
                {capsLock ? key.toUpperCase() : key}
              </button>
            ))}
            {i === 3 && (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleKeyPress("Backspace");
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow mx-0.5"
              >
                ⌫
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-center mt-2">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setCapsLock(!capsLock);
            }}
            className={`${
              capsLock ? "bg-blue-500 text-white" : "bg-white text-gray-800"
            } font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-0.5`}
          >
            ⇧
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleKeyPress(" ");
            }}
            className="bg-white text-gray-800 font-semibold py-2 px-12 border border-gray-400 rounded shadow mx-0.5"
          >
            Space
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleKeyPress("Enter");
            }}
            className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-0.5"
          >
            ⏎
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onHide?.();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow mx-0.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
