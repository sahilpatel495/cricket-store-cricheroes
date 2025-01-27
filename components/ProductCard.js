// const ProductCard = ({ product }) => {
//     return (
//       <div className="border rounded-lg p-4">
//         <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
//         <h2 className="text-lg font-bold">{product.name}</h2>
//         <p>{product.description}</p>
//         <p className="text-xl font-semibold">${product.price}</p>
//         <a href={`/products/${product.id}`} className="text-blue-500">View Details</a>
//       </div>
//     );
//   };
  
//   export default ProductCard;

import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useAuth();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      onClick={() => router.push(`/products/${product.id}`)}
      className="group bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;