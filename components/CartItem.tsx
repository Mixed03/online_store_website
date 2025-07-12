// components/CartItem.tsx
"use client";
import { useCartStore } from "@/lib/cartStore";
import QuantitySelector from "./QuantitySelector";
import { Trash2 } from "lucide-react"; // Import Trash2 icon

type Props = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  onRemoveClick: (id: string) => void; // Added prop for modal trigger
};

export default function CartItem(props: Props) {
  const { updateQuantity } = useCartStore(); // Removed removeFromCart here as it's handled by modal

  return (
    <div className="flex items-center bg-white rounded-xl shadow-sm p-3 relative"> {/* Card styling */}
      <img src={props.image} alt={props.name} className="w-24 h-24 rounded-lg object-cover mr-4" /> {/* Image size and margin */}
      <div className="flex-grow"> {/* Allows content to take remaining space */}
        <h2 className="font-medium text-gray-800 line-clamp-1">{props.name}</h2> {/* Adjusted font */}
        <p className="text-xs text-gray-500 mt-1">
          Color:
          <span
            className="inline-block w-3 h-3 rounded-full ml-1 mr-2 align-middle border border-gray-300"
            style={{ backgroundColor: props.color }}
          ></span>
          Size: {props.size}
        </p>
        <div className="text-base font-semibold text-gray-900 mt-2">${(props.price * props.quantity).toFixed(2)}</div> {/* Adjusted font */}

        <div className="mt-2"> {/* Margin top for quantity selector */}
          <QuantitySelector
            quantity={props.quantity}
            setQuantity={(q) => updateQuantity(props.id, q)}
          />
        </div>
      </div>

      <button
        onClick={() => props.onRemoveClick(props.id)} // Use the prop to trigger modal
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <Trash2 size={20} /> {/* Trash can icon */}
      </button>
    </div>
  );
}