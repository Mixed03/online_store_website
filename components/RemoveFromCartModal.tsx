// components/RemoveFromCartModal.tsx
import React from 'react';

// Define the type for a cart item, assuming it has these properties
interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

interface RemoveFromCartModalProps {
  showRemoveModal: boolean;
  itemToRemove: string | null;
  cart: CartItemType[]; // Pass the entire cart to find item details
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RemoveFromCartModal({
  showRemoveModal,
  itemToRemove,
  cart,
  onConfirm,
  onCancel,
}: RemoveFromCartModalProps) {
  if (!showRemoveModal) {
    return null;
  }

  // Find the item details from the cart based on itemToRemove ID
  const itemDetails = cart.find(item => item.id === itemToRemove);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold text-center mb-4">Remove From Cart?</h2>
        {itemDetails && ( // Conditionally render item details if found
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-6">
            <img
              src={itemDetails.image}
              alt={itemDetails.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-800">{itemDetails.name}</h3>
              <p className="text-sm text-gray-600">
                Size: {itemDetails.size}, Color:
                <span
                  className="inline-block w-3 h-3 rounded-full ml-1 align-middle border border-gray-300"
                  style={{ backgroundColor: itemDetails.color }}
                ></span>
              </p>
              <div className="text-sm font-semibold text-gray-900">${(itemDetails.price * itemDetails.quantity).toFixed(2)}</div>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
}
