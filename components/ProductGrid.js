"use client"
import React from "react";
import { useRouter } from 'next/navigation';


const ProductGrid = ({ products }) => {
 const router = useRouter();

 const handleProductClick = (id) => {
  router.push(`/products/${id}`);
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-card overflow-hidden cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-brand-800 mb-2">{product.name}</h3>
            <p className="text-brand-700 mb-2">{product.shortDescription}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-600">
              ₹ {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;