// checkout/page.tsx
"use client";
import { useCartStore } from "../../lib/cartStore";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
// import { MoreHorizontal, MapPin} from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // State to control the visibility of the shipping address form
  const [isShippingAddressFormOpen, setIsShippingAddressFormOpen] = useState(true);

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [villageStreet, setVillageStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [provinceCity, setProvinceCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for displaying validation errors

  const toggleShippingAddressForm = () => {
    setIsShippingAddressFormOpen(!isShippingAddressFormOpen);
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Basic form validation
    if (!fullName || !phoneNumber || !branchName || !villageStreet || !district || !provinceCity) {
      setErrorMessage("Please fill in all required shipping address fields.");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before proceeding to checkout.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages

    // Construct the order summary message
    let orderSummary = "Customer Order Summary:\n\n";
    orderSummary += "--- Shipping Information ---\n";
    orderSummary += `Full Name: ${fullName}\n`;
    orderSummary += `Phone Number: ${phoneNumber}\n`;
    orderSummary += `Branch Name: ${branchName}\n`;
    orderSummary += `Village/Street: ${villageStreet}\n`;
    orderSummary += `District: ${district}\n`;
    orderSummary += `Province/City: ${provinceCity}\n\n`;

    orderSummary += "--- Order Details ---\n";
    cart.forEach((item, index) => {
      orderSummary += `${index + 1}. ${item.name}\n`;
      orderSummary += `   Quantity: ${item.quantity}\n`;
      orderSummary += `   Color: ${item.color}\n`;
      orderSummary += `   Size: ${item.size}\n`;
      orderSummary += `   Price: $${item.price.toFixed(2)} each\n`;
      orderSummary += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`;
      orderSummary += "---\n";
    });

    orderSummary += `Total Order Price: $${total.toFixed(2)}\n\n`;
    orderSummary += "Thank you for your order!";

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(orderSummary);
    const whatsappNumber = "8562091616578"; // WhatsApp number without '+'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen flex flex-col pb-6">
      {/* Header */}
      <div className="fixed top-0 inset-x-0 z-50 max-w-xl mx-auto flex items-center gap-2 p-4 bg-white/10 backdrop-blur-md">
        <a href="/cart" className="text-gray-600">
          <ChevronLeft size={20} />
        </a>
        <h1 className="text-lg font-medium text-gray-800">Checkout</h1>
      </div>

      {/* Spacer to offset fixed header */}
      <div className="h-14" />

      {/* Error Message Display */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      

      {/* Checkout Content - Added flex-grow and pb-28 for fixed bottom button */}
      <div className="flex-grow p-4 space-y-4 pb-44 overflow-y-auto">
        {/* Shipping Address Card */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div
            className="flex justify-between items-center mb-4 cursor-pointer"
            onClick={toggleShippingAddressForm}
          >
            <h2 className="font-semibold text-gray-800">Shipping Address</h2>
            {isShippingAddressFormOpen ? (
              <ChevronUp size={20} className="text-gray-600" />
            ) : (
              <ChevronDown size={20} className="text-gray-600" />
            )}
          </div>

          {/* Shipping Address Form Fields - Conditionally rendered */}
          {isShippingAddressFormOpen && (
            <div className="space-y-4">
              {/* Contact Information */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Customer's full name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Phone number used in the logistics app"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Shipping Address</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                      Branch Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="branchName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., HAL Chanthabouly Branch"
                      required
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="villageStreet" className="block text-sm font-medium text-gray-700">
                      Village / Street<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="villageStreet"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g, Sivilay"
                      required
                      value={villageStreet}
                      onChange={(e) => setVillageStreet(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                      District<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="district"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Saysettha"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="provinceCity" className="block text-sm font-medium text-gray-700">
                      Province / City<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="provinceCity"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Vientiane Capital"
                      required
                      value={provinceCity}
                      onChange={(e) => setProvinceCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order List Header */}
        <h2 className="font-semibold text-gray-800 mt-6 mb-2">Order List</h2>

        {/* Order Items */}
        <div className="space-y-3">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white rounded-xl shadow-sm p-3">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                  <div className="text-base font-semibold text-gray-900 mt-2">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <span className="text-sm font-medium text-gray-700 px-3 py-1 bg-gray-100 rounded-md">
                  {item.quantity}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fixed Bottom Total Price and "Continue to Payment" Button */}
      <div className="fixed bottom-16 inset-x-0 z-40 max-w-xl mx-auto px-4">
        <div className="left-4 right-4 z-10 bg-white shadow-lg rounded-2xl p-4 border-t border-gray-100">
          {/* Total Price */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          {/* Continue to Payment Button */}
          <button
            onClick={handleContinueToPayment}
            className="w-full bg-black text-white py-3 rounded-lg text-base font-medium flex items-center justify-center gap-2 shadow-md"
          >
            Continue to Payment
            <ChevronLeft size={16} className="rotate-180" />
          </button>

        </div>
      </div>
    </div>
  );
}
