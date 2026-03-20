import React from "react";

export default function OptionCard({ option, isSelected, onSelect, type = "radio" }) {
  return (
    <div
      onClick={() => onSelect(option)}
      className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 flex gap-4 ${
        isSelected ? "border-black bg-black text-white" : "border-slate-300 hover:border-black bg-white"
      }`}
    >
      <div className="shrink-0 mt-1">
        {type === "radio" ? (
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected ? "border-white bg-black" : "border-slate-400 bg-white"
            }`}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
          </div>
        ) : (
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              isSelected ? "border-white bg-white" : "border-slate-400 bg-white"
            }`}
          >
            {isSelected && (
              <svg
                className="w-3.5 h-3.5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h1 className={`text-lg ${option?.hasOwnProperty('description') ? "font-semibold leading-tight" : "text-sm"}`}>{option.value}</h1>
        {option.description && (
          <p
            className={`text-sm mt-1 leading-relaxed ${
              isSelected ? "text-slate-200" : "text-gray-500"
            }`}
          >
            {option.description}
          </p>
        )}
      </div>
    </div>
  );
}
