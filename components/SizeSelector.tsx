// components/SizeSelector.tsx
import React from 'react';

type SizeSelectorProps = {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
};

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 mb-2">Size</h3>
      <div className="flex gap-3"> {/* Use gap for spacing between buttons */}
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${selected === size
                ? "bg-black text-white" // Selected state
                : "bg-gray-100 text-gray-800 hover:bg-gray-200" // Unselected state
              }
              transition
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}