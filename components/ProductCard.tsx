// components/ProductCard.tsx
"use client";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

type ProductProps = {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    sold: number;
};

export default function ProductCard({
    id,
    name,
    image,
    price,
    rating,
    sold,
}: ProductProps) {
    return (
        <Link
            href={`/product/${id}`}
            // Matched design: bg-white, rounded-xl, subtle shadow
            className="block bg-white rounded-xl shadow-sm hover:shadow-md transition relative overflow-hidden"
        >
            <div className="relative aspect-square overflow-hidden rounded-t-xl"> {/* Adjusted aspect ratio and rounded top */}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                {/* <div className="absolute top-2 right-2 bg-white rounded-full p-1 border border-gray-200 flex items-center justify-center shadow-sm">
                    <Heart size={14} className="text-gray-800" /> 
                </div> */}
            </div>
            <div className="p-3">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-1">{name}</h2> {/* Adjusted font size */}
                <div className="flex items-center gap-1 mt-1"> {/* Adjusted gap */}
                    <div className="flex items-center text-xs text-gray-600">
                        <Star size={12} className="text-yellow-500 mr-0.5" fill="rgb(234 179 8)" /> {/* Adjusted star size */}
                        <span className="text-[11px] text-gray-700">{rating.toFixed(1)}</span> {/* Adjusted font size and color */}
                    </div>
                    <span className="text-[10px] text-gray-500">
                        ({sold.toLocaleString()} sold)
                    </span>
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-1"> {/* Adjusted font size */}
                    ${price.toFixed(2)}
                </div>
            </div>
        </Link>
    );
}