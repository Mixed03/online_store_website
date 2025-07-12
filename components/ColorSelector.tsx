// components/ColorSelector.tsx
import React from 'react';

type ColorSelectorProps = {
  colors: string[]; // e.g., ['#D4C9BD', '#707070', '#E0E0E0', '#B0B0B0']
  selected: string;
  onChange: (color: string) => void;
};

export default function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 mb-2">Color</h3>
      <div className="flex gap-3">
        {colors.map((colorValue) => (
          <button
            key={colorValue}
            onClick={() => onChange(colorValue)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center border-2
              ${selected === colorValue ? "border-black" : "border-transparent"}
              transition
            `}
            style={{ backgroundColor: colorValue }}
          >
            {/* Optional: Add a checkmark icon if the color swatch represents a pure color,
                or leave empty if it's just a visual indicator */}
          </button>
        ))}
      </div>
    </div>
  );
}