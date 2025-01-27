"use client";

import React, { useState } from "react";
import { ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import StarRating from "./StarRatings";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  const { addToCart, getCartItemCount } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const router = useRouter();

  // Get total quantity of this product in cart (across all variations)
  const cartQuantity = getCartItemCount(product.id);

  const allImages = [product.image, ...product.photos];

  const handleAddToCart = () => {
    const result = addToCart({ ...product }, quantity, {
      size: selectedSize,
      color: selectedColor,
    });

    if (result.success) {
      setQuantity(1);
      setSelectedSize("");
      setSelectedColor("");
    }
  };

  const handleBuyNow = async () => {
    const result = await addToCart({ ...product }, quantity, {
      size: selectedSize,
      color: selectedColor,
    });
  
    if (result.success) {
      setQuantity(1);
      setSelectedSize("");
      setSelectedColor("");
      await router.push("/checkout");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <a href="/" className="hover:text-primary-600">
          Products
        </a>
        <ChevronRight size={16} />
        <span className="text-gray-900">{product.name}</span>
      </div>

      {cartQuantity > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
          <p className="text-blue-600">
            You currently have {cartQuantity} units of this product in your
            cart.
          </p>
          <button
            onClick={() => router.push("/checkout")}
            className="ml-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Go to Checkout
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Carousel Section */}
        <div className="space-y-4">
          <div className="relative bg-white rounded-2xl shadow-md overflow-hidden group">
            <img
              src={allImages[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-[500px] object-cover object-center"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-primary-500 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary-600">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Select Color:{" "}
              {selectedColor && (
                <span className="text-primary-600">({selectedColor})</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedColor === color
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-primary-500"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Select Size:{" "}
              {selectedSize && (
                <span className="text-primary-600">({selectedSize})</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedSize === size
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-primary-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Rating:
            </h3>
            <div className="flex items-center gap-2">
              <StarRating rating={product.ratings} />
              <span className="text-sm text-gray-600">({product.ratings})</span>
            </div>
          </div>

          {/* Warranty */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Warranty:
            </h3>
            <p className="text-sm text-gray-600">{product.warranty}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 rounded-l-lg transition-colors"
              >
                -
              </button>
              <span className="px-6 py-2 border-x border-gray-300 font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100 rounded-r-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-colors ${
                !selectedSize || !selectedColor
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600 text-white"
              }`}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              className={`flex-2 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-colors ${
                !selectedSize || !selectedColor
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-primary-600 text-white"
              }`}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          {(!selectedSize || !selectedColor) && (
            <p className="text-red-500 text-sm">
              Please select both size and color to add to cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
