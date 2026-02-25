// components/ProductDetail.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import { useRouter } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  additionalImages?: string[];
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  rating: number;
  sold: number;
};

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false); // Lightbox state
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (typeof window !== "undefined" && product?.id) {
      localStorage.setItem("lastViewedProductId", product.id);
    }
  }, [product.id]);

  const handleAdd = () => {
    addToCart({
      id: product.id + size + color,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      quantity,
    });
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1000);
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  const allImages = [product.image, ...(product.additionalImages || [])];

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = 0;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchEndX.current || allImages.length <= 1) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    } else if (isRightSwipe) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto pb-36">
      <div
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {allImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`${product.name} image ${index + 1}`}
              className="w-full flex-shrink-0 aspect-[3/4] object-cover cursor-pointer"
              onClick={() => setShowLightbox(true)}
            />
          ))}
        </div>

        {/* Back Button */}
        <div className="fixed top-4 inset-x-0 z-50 max-w-xl mx-auto px-3 pointer-events-none">
          <div
            className="pointer-events-auto w-fit bg-white/70 backdrop-blur-md rounded-full p-1 shadow-sm cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </div>
        </div>

        {/* Image Indicators */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full cursor-pointer transition-colors duration-200 ${index === currentImageIndex ? "bg-black" : "bg-gray-300"
                  }`}
                onClick={() => setCurrentImageIndex(index)}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center text-xs text-gray-600">
            <Star size={14} className="text-yellow-500 mr-0.5" fill="rgb(234 179 8)" />
            <span className="text-sm font-medium text-gray-700">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] text-gray-500">
            ({product.sold.toLocaleString()} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">{product.description}</p>

        <div className="mt-6 space-y-5">
          <SizeSelector sizes={product.sizes} selected={size} onChange={setSize} />
          <ColorSelector colors={product.colors} selected={color} onChange={setColor} />
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 inset-x-0 z-40 max-w-xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-2xl p-4 flex justify-between items-center border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Total price</span>
            <span className="text-lg font-bold text-gray-900">${(product.price * quantity).toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg text-base font-medium flex items-center justify-center shadow-md"
              onClick={handleAdd}
            >
              Add to Cart
            </button>
            <button
              className="bg-black text-white px-4 py-3 rounded-lg text-base font-medium flex items-center justify-center shadow-md"
              onClick={handleGoToCart}
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/30 backdrop-blur-md">
          <div className="bg-white p-4 rounded-lg shadow-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-800 font-medium">Item added to cart!</span>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
          onTouchStart={(e) => {
            touchEndX.current = 0;
            touchStartX.current = e.targetTouches[0].clientX;
          }}
          onTouchMove={(e) => {
            touchEndX.current = e.targetTouches[0].clientX;
          }}
          onTouchEnd={() => {
            if (!touchEndX.current || allImages.length <= 1) return;
            const distance = touchStartX.current - touchEndX.current;
            if (distance > minSwipeDistance) {
              setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
            } else if (distance < -minSwipeDistance) {
              setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
            }
          }}
        >
          {/* ปุ่มปิด */}
          <button
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2"
            onClick={() => setShowLightbox(false)}
          >
            ✕
          </button>

          {/* รูปภาพเต็มจอ */}
          <img
            src={allImages[currentImageIndex]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* ปุ่มเลื่อนซ้าย/ขวา */}
          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-3 text-white bg-white/20 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-3 text-white bg-white/20 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                }}
              >
                <ChevronLeft size={24} className="rotate-180" />
              </button>

              {/* Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentImageIndex ? "bg-white" : "bg-white/40"
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}