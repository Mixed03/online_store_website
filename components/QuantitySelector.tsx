// components/QuantitySelector.tsx
import React from 'react';
import { Minus, Plus } from 'lucide-react';

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export default function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 mb-2">Quantity</h3>
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden w-fit"> {/* w-fit to prevent it from stretching */}
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))} // Minimum quantity of 1
          className="p-3 text-gray-700 hover:bg-gray-200 transition"
        >
          <Minus size={16} />
        </button>
        <span className="px-4 text-base font-medium text-gray-800">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-3 text-gray-700 hover:bg-gray-200 transition"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}