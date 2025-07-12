// app/page.tsx
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Search } from "lucide-react"; // Import necessary icons
// import { Search, Home as HomeIcon, Bell, ShoppingCart, User } from "lucide-react";

export default function Home() {
  return (
    // Main container for the page, with increased max-width, min-height, and flex column layout
    <main className="max-w-xl mx-auto min-h-screen flex flex-col">
      {/* Fixed Search Bar Section, adapted to match Footer's fixed positioning and shadow */}
      {/* This outer div spans the full width and has a shadow, similar to the footer */}
      <div className="fixed top-0 left-0 right-0 z-50"> {/* Changed shadow to lg to match footer, removed rounded-b-2xl */}
        {/* Inner div to constrain content width and center it, similar to Footer's inner div */}
        <div className="max-w-xl mx-auto p-4 pt-4"> {/* Applied max-w-xl mx-auto here, keeping original padding */}
          <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-4 gap-0 shadow-sm">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm ml-2" // Added ml-2 for spacing
            />
          </div>
        </div>
      </div>

      {/* Main Content Area - Added flex-grow to push footer to bottom */}
      {/* Added pt-28 to push content below the fixed header (adjust as needed based on header height) */}
      <div className="flex-grow overflow-y-auto pb-12 pt-20">
        {/* Banner Section */}
        {/* <div className="p-4">
          <div className="relative bg-gradient-to-r from-gray-800 to-black rounded-3xl overflow-hidden shadow-lg aspect-video flex items-center justify-center">
            <img
              src="https://placehold.co/600x300/1a202c/ffffff?text=Banner+Image" // Placeholder image
              alt="Promotional Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 p-6 text-white max-w-[70%]">
              <h2 className="text-2xl font-bold mt-1 leading-tight"></h2>
            </div>
          </div>
        </div> */}

        {/* Categories/Brands Section */}
        {/* <div className="p-3.5 grid grid-cols-4 gap-4 text-center">
          {[
            { name: "Nike", logo: "https://placehold.co/60x60/ffffff/000000?text=Nike" },
            { name: "Reebok", logo: "https://placehold.co/60x60/ffffff/000000?text=Reebok" },
            { name: "Adidas", logo: "https://placehold.co/60x60/ffffff/000000?text=Adidas" },
            { name: "Puma", logo: "https://placehold.co/60x60/ffffff/000000?text=Puma" },
          ].map((brand, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                <img src={brand.logo} alt={`${brand.name} logo`} className="w-10 h-10 object-contain" />
              </div>
              <span className="text-xs text-gray-700">{brand.name}</span>
            </div>
          ))}
        </div> */}

        {/* "Selected for you" Heading */}
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-800">Selected for you</h2>
        </div>

        {/* Product Grid */}
        <div className="p-4 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
