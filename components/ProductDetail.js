// import { useAuth } from '../context/AuthContext';

// const ProductDetail = ({ product }) => {
//   const { addToCart, currentUser  } = useAuth(); // Use the custom hook

//   const handleAddToCart = () => {
//     if (currentUser ) {
//       addToCart(product);
//     } else {
//       alert("Please log in to add items to your cart.");
//     }
//   };

//   return (
//     <div>
//       <img src={product.image} alt={product.name} />
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductDetail;

// import React, { useState } from 'react';
// import { ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react';
// import { useAuth } from '@/context/AuthContext';

// const ProductDetail = ({ product }) => {
//   const { addToCart } = useAuth();
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     addToCart({ ...product, quantity });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
//         <a href="/" className="hover:text-primary-600">Home</a>
//         <ChevronRight size={16} />
//         <a href="/products" className="hover:text-primary-600">Products</a>
//         <ChevronRight size={16} />
//         <span className="text-gray-900">{product.name}</span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Section */}
//         <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[500px] object-cover object-center"
//           />
//         </div>

//         {/* Product Info Section */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
//           <div className="flex items-center gap-4">
//             <span className="text-3xl font-bold text-primary-600">
//               ${product.price.toFixed(2)}
//             </span>
//           </div>

//           <p className="text-gray-600 leading-relaxed">
//             {product.description}
//           </p>

//           {/* Quantity Selector */}
//           <div className="flex items-center gap-4">
//             <span className="text-gray-700">Quantity:</span>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="px-3 py-1 hover:bg-gray-100"
//               >
//                 -
//               </button>
//               <span className="px-4 py-1 border-x border-gray-300">
//                 {quantity}
//               </span>
//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="px-3 py-1 hover:bg-gray-100"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
//             >
//               <ShoppingCart size={20} />
//               Add to Cart
//             </button>
//             <button
//               className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
//               aria-label="Add to wishlist"
//             >
//               <Heart size={20} className="text-gray-600" />
//             </button>
//             <button
//               className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
//               aria-label="Share product"
//             >
//               <Share2 size={20} className="text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProductDetail = ({ product }) => {
  const { addToCart } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(quantity,"passing quantity")
    addToCart({ ...product,  },quantity);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <a href="/" className="hover:text-primary-600">Products</a>
        <ChevronRight size={16} />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover object-center"
          />
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Product Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary-600">
            ₹{product.price.toFixed(2)}
            </span>
          </div>

          {/* Product Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Available Colors:</h3>
            <div className="flex gap-4">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border rounded-full text-sm text-gray-700 bg-gray-200"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Available Sizes:</h3>
            <div className="flex gap-4">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border rounded-full text-sm text-gray-700 bg-gray-200"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Rating:</h3>
            <div className="flex items-center">
              <span className="text-xl font-bold text-yellow-500">{product.ratings}</span>
              <span className="ml-2 text-sm text-gray-600">/ 5</span>
            </div>
          </div>

          {/* Warranty */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Warranty:</h3>
            <p className="text-sm text-gray-600">{product.warranty}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3  py-1 hover:bg-gray-200 rounded-l-lg"
              > 
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 hover:bg-gray-200 rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 

          disabled={quantity == 0}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Add to wishlist"
            >
              <Heart size={20} className="text-gray-600" />
            </button>
            <button
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Share product"
            >
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Photos Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Photos:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.photos.map((photo, index) => (
            <div key={index} className="bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={photo}
                alt={`product-image-${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

