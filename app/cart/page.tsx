// app/cart/page.tsx
"use client"
import { useState, useEffect } from "react"; // Import useEffect
import { useCartStore } from "../../lib/cartStore";
import CartItem from "../../components/CartItem";
import { ChevronLeft } from "lucide-react";
import RemoveFromCartModal from "../../components/RemoveFromCartModal";
import Link from "next/link";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { removeFromCart } = useCartStore();

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [backLinkHref, setBackLinkHref] = useState("/"); // State for back link href

  // Effect to read last viewed product ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure localStorage is available
      const lastViewedProductId = localStorage.getItem("lastViewedProductId");
      if (lastViewedProductId) {
        setBackLinkHref(`/product/${lastViewedProductId}`);
      } else {
        setBackLinkHref("/"); // Default to homepage if no product ID found
      }
    }
  }, []);

  const handleRemoveClick = (itemId: string) => {
    setItemToRemove(itemId);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
      setShowRemoveModal(false);
    }
  };

  const cancelRemove = () => {
    setItemToRemove(null);
    setShowRemoveModal(false);
  };

  return (
    <div className="max-w-xl mx-auto pb-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {/* Back button now dynamically navigates to previous product or homepage */}
          <Link href={backLinkHref} className="text-gray-600">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-lg font-medium text-gray-800">Cart</h1>
        </div>
      </div>

      {/* Cart Items - Adjusted padding-bottom to account for both fixed bars */}
      {/* Footer height is h-16 (4rem), Checkout bar height is approx. 3.5rem. */}
      {/* So, total space needed at bottom is 4rem + 3.5rem = 7.5rem (approx 120px). */}
      {/* pb-[120px] ensures content scrolls above both fixed elements. */}
      <div className="flex-grow p-4 space-y-4 pb-[120px] overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem key={item.id} {...item} onRemoveClick={handleRemoveClick} />
          ))
        )}
      </div>

      {/* Total and Checkout Fixed Bottom Bar - Positioned above the footer and matching content width */}
      {/* Added max-w-xl mx-auto px-4 to this div to make it align with the header and cart items. */}
      <div className="fixed bottom-16 inset-x-0 z-40 max-w-xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-2xl p-4 flex justify-between items-center border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Total price</span>
            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          {/* Changed <a> to <Link> for client-side navigation */}
          <Link
            href="/checkout"
            className="bg-black text-white px-6 py-3 rounded-lg text-base font-medium flex items-center justify-center gap-2 shadow-md"
          >
            Checkout
            <ChevronLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>

      {/* Remove From Cart Modal - Now a separate component */}
      <RemoveFromCartModal
        showRemoveModal={showRemoveModal}
        itemToRemove={itemToRemove}
        cart={cart} // Pass the entire cart for item details
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
      />
    </div>
  );
}
