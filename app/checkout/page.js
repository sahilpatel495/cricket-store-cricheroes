"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, BadgeIndianRupee, Banknote } from "lucide-react";
import toast from "react-hot-toast";

const Checkout = () => {
  const { currentUser, cart, removeFromCart, updateCartQuantity, clearCart } =
    useAuth();
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Calculate total price
    const calculatedTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [cart]);

  const handlePlaceOrder = () => {
    if (!address || !paymentMethod) {
      toast.error("Please fill in all details to proceed.");
      return;
    }
    // Process payment and clear cart
    toast.success("Order placed successfully!");
    clearCart();
  };

  if (!currentUser) return <div>Please log in to view your cart.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 m-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Cart & Checkout</h1>

      {/* Cart Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 btn btn-brand-800 border rounded hover:bg-brand-800"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg- border rounded hover:bg-brand-800"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      {cart.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>

          {/* Address Input */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-2">
              Shipping Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-2"
              rows="3"
              placeholder="Enter your shipping address..."
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Payment Method</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("Credit Card")}
                className={`px-4 py-2 rounded-lg border ${
                  paymentMethod === "Credit Card"
                    ? "bg-primary-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <CreditCard size={20} className="mr-2" />
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod("Cash")}
                className={`px-4 py-2 rounded-lg border ${
                  paymentMethod === "Cash"
                    ? "bg-primary-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <BadgeIndianRupee size={20} className="mr-2" />
                Cash
              </button>
              <button
                onClick={() => setPaymentMethod("Bank Transfer")}
                className={`px-4 py-2 rounded-lg border ${
                  paymentMethod === "Bank Transfer"
                    ? "bg-primary-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Banknote size={20} className="mr-2" />
                Bank Transfer
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex items-center justify-between font-medium text-lg mb-6">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
