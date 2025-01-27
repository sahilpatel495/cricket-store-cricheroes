"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Trash2,
  Package,
  MapPin,
  CreditCard as CreditCardIcon,
  ShoppingBag,
  ReceiptText,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const CartItem = ({ item }) => (
  <div className="space-y-2 p-4 bg-gray-50 rounded-lg mb-4">
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <div className="text-sm text-gray-600 mt-1">
          <span className="mr-4">Size: {item.selectedSize}</span>
          <span>Color: {item.selectedColor}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                updateCartQuantity(
                  item.productKey,
                  Math.max(1, item.quantity - 1)
                )
              }
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() =>
                updateCartQuantity(item.productKey, item.quantity + 1)
              }
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(item.productKey)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StepIndicator = ({step}) => (
  <div className="flex items-center justify-center mb-8">
    <div className="flex items-center">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 1 ? "bg-primary-500 text-white" : "bg-gray-200"
        }`}
      >
        1
      </div>
      <div
        className={`w-16 h-1 ${step >= 2 ? "bg-primary-500" : "bg-gray-200"}`}
      />
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 2 ? "bg-primary-500 text-white" : "bg-gray-200"
        }`}
      >
        2
      </div>
      <div
        className={`w-16 h-1 ${step >= 3 ? "bg-primary-500" : "bg-gray-200"}`}
      />
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 3 ? "bg-primary-500 text-white" : "bg-gray-200"
        }`}
      >
        3
      </div>
    </div>
  </div>
);

const Checkout = () => {
  const { currentUser, cart, removeFromCart, updateCartQuantity, clearCart } =
    useAuth();
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    const calculatedTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [cart]);

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    toast.success("Order placed successfully!");
    clearCart();
  };

  const isDisabled =
    step === 2 &&
    (address.street === "" ||
      address.city === "" ||
      address.state === "" ||
      address.pincode === "" ||
      address.phone === "");

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Please log in to checkout
        </h2>
        <p className="text-gray-600">
          You need to sign in to view your cart and checkout
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag size={100} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-2xl">Your cart is empty</p>
          <Link href="/" className="text-primary-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

          <StepIndicator step={step}/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {step === 1 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Package size={20} />
                    Your Items
                  </h2>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag
                        size={48}
                        className="mx-auto text-gray-400 mb-4"
                      />
                      <p className="text-gray-600">Your cart is empty</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <CartItem key={item.productKey} item={item} />
                    ))
                  )}
                </section>
              )}

              {step === 2 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin size={20} />
                    Shipping Address
                  </h2>
                  <div className="p-4 bg-gray-50 rounded-lg grid grid-cols-1  md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) =>
                          setAddress({ ...address, pincode: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({ ...address, phone: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CreditCardIcon size={20} />
                    Payment Method
                  </h2>
                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Credit Card"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          checked={paymentMethod === "Credit Card"}
                          className="w-5 h-5 text-primary-500"
                        />
                        Credit Card
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="UPI"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          checked={paymentMethod === "UPI"}
                          className="w-5 h-5 text-primary-500"
                        />
                        UPI
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Cash on Delivery"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          checked={paymentMethod === "Cash on Delivery"}
                          className="w-5 h-5 text-primary-500"
                        />
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ReceiptText size={20} />
                Billing Details
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.productKey}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep((prev) => prev - 1)}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg"
                  >
                    Previous
                  </button>
                )}
                {step < 3 && (
                  <button
                    onClick={() => setStep((prev) => prev + 1)}
                    className={`w-full py-2 rounded-lg ${
                      isDisabled
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-primary-500 hover:bg-primary-600 text-white"
                    }`}
                    disabled={isDisabled}
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-2 bg-primary-500 text-white rounded-lg"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
