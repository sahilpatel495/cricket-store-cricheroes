// 'use client'
// import React, { createContext, useState, useContext } from 'react';

// // Create the AuthContext
// const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [currentUser , setCurrentUser ] = useState(null);
//   const [users, setUsers] = useState([]); // Store registered users

//   const addToCart = (product) => {
//     // Your existing addToCart logic
//   };

//   const login = (user) => {
//     // Your existing login logic
//     setCurrentUser (user);
//   };

//   const logout = () => {
//     setCurrentUser (null);
//   };

//   console.log(currentUser,"currentUser at context");

//   const register = (user) => {
//     setUsers((prevUsers) => [...prevUsers, user]);
//     setCurrentUser (user); // Automatically log in the user after registration
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, addToCart, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Create a custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default AuthContext;

'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedCart = localStorage.getItem('cart');
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    
    setLoading(false);
  }, []);

  const login = (credentials) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const userWithoutPassword = {
          ...user,
          password: undefined
        };
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const register = (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some((user) => user.email === userData.email)) {
        return { success: false, error: 'Email already registered' };
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const userWithoutPassword = {
        ...newUser,
        password: undefined
      };
      
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      router.push('/login');
      return { success: false, error: 'Please login to add items to cart' };
    }

    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { success: true };
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateCartQuantity = (productId, quantity) => {
    const updatedCart = cart.map((item) => 
      item.id === productId ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const value = {
    currentUser,
    cart,
    loading,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};