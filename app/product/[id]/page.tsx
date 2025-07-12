// product/[id]/page.tsx
"use client"
import { products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}
