// // 'use client';

// // import Login from '@/app/login/page';
// // import { useAuth } from '../context/AuthContext';
// // import { useRouter } from 'next/navigation';
// // import { useState } from 'react';
// // import Link from 'next/link';

// // const Navbar = () => {
// //   const { currentUser , logout } = useAuth();

// //   const router = useRouter();
// //   const [showLogin, setShowLogin] = useState(false);
// //   console.log(currentUser,"currentUser");

// //   const handleLoginClick = () => {
// //     if (currentUser ) {
// //       logout();
// //       router.push('/'); // Redirect to home on logout
// //     } else {
// //       setShowLogin(true); // Show login popup
// //     }
// //   };

// //   const closeLoginPopup = () => {
// //     setShowLogin(false);
// //   };

// //   return (
// //     <nav className="bg-primary bg-gray-800 text-white p-4 flex justify-between items-center">
// //       <Link href="/" className="text-lg font-bold">
// //         Cricket Store
// //       </Link>
// //       <div>
// //         {currentUser  ? (
// //           <div>
// //             <span className="mr-4">Hello, {currentUser.name}</span>
// //             <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
// //               Logout
// //             </button>
// //           </div>
// //         ) : (
// //           <Link href="/login" className="text-sm hover:underline">
// //           Login
// //         </Link>
// //         )}
// //       </div>
// //       {showLogin && <Login onClose={closeLoginPopup} />}
// //     </nav>
// //   );
// // };

// // export default Navbar;

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const Navbar = () => {
//   const { currentUser, logout, cart } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const router = useRouter();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsMenuOpen(false);
//   };

//   const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <nav className="bg-white border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo and primary nav */}
//           <div className="flex">
//             <Link
//               href="/"
//               className="flex items-center flex-shrink-0 text-primary-600 font-bold text-xl"
//             >
//               Cricket Store
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-8">
//             <Link href="/products" className="text-gray-600 hover:text-gray-900">
//               Products
//             </Link>
//             <Link href="/about" className="text-gray-600 hover:text-gray-900">
//               About
//             </Link>
//             <Link href="/contact" className="text-gray-600 hover:text-gray-900">
//               Contact
//             </Link>
//           </div>

//           {/* Right side buttons */}
//           <div className="flex items-center space-x-4">
//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative p-2 text-gray-600 hover:text-gray-900"
//             >
//               <ShoppingCart className="h-6 w-6" />
//               {cartItemsCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </Link>

//             {/* User Menu */}
//             {currentUser ? (
//               <div className="relative">
//                 <button
//                   onClick={toggleMenu}
//                   className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
//                 >
//                   <User className="h-6 w-6" />
//                   <span className="hidden md:block">{currentUser.name}</span>
//                 </button>

//                 {isMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                     <p
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       // onClick={() => setIsMenuOpen(false)}
//                     >
//                       {currentUser.name}
//                     </p>
//                     <Link
//                       href="/cart"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       My Cart
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
//               >
//                 Login
//               </Link>
//             )}

//             {/* Mobile menu button */}
//             <button
//               onClick={toggleMenu}
//               className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="md:hidden pb-4">
//             <div className="space-y-1">
//               <Link
//                 href="/products"
//                 className="block px-3 py-2 text-gray-600 hover:text-gray-900"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Products
//               </Link>
//               <Link
//                 href="/about"
//                 className="block px-3 py-2 text-gray-600 hover:text-gray-900"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className="block px-3 py-2 text-gray-600 hover:text-gray-900"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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

  const navigation = [
    { name: "Products", href: "/" },

  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-display font-bold text-brand-900">
                Cricket Store
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
            {currentUser &&
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
            }

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
                        <span>{currentUser.name.toUpperCase()}</span>
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
