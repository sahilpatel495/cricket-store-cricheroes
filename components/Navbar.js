"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, Menu, X, User, LogOut, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { currentUser, logout, cart } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const cartItemsCount =
    cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navigation = [{ name: "Products", href: "/" }];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Logo Image */}
              <img
                src="/crickEase-logo.png"
                alt="CrickEase Logo"
                className="mr-2 h-8"
              />
              <span className="text-2xl  font-bold text-brand-900">
                CrickEase
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-600 hover:text-brand-900 px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {currentUser && (
              <Link
                href="/checkout"
                className="text-brand-600 hover:text-brand-900 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {currentUser ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-brand-200 flex items-center justify-center">
                    <span className="text-brand-700 font-medium">
                      {currentUser.name[0].toUpperCase()}
                    </span>
                  </div>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-brand-700">
                      <div className="flex items-center gap-2">
                        <User className="h-6 w-6" />
                        <span>
                          {currentUser.name.charAt(0).toUpperCase()}
                          {currentUser.name.slice(1)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
