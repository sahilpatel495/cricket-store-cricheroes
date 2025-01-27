
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userCarts, setUserCarts] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state and user-specific cart from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedCarts = localStorage.getItem('userCarts');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      
      // Initialize carts from localStorage
      if (storedCarts) {
        setUserCarts(JSON.parse(storedCarts));
      }
    }
    
    setLoading(false);
  }, []);

  // Get current user's cart
  const getCurrentUserCart = () => {
    return currentUser ? (userCarts[currentUser.id] || []) : [];
  };

  const addToCart = (product, quantity, selectedOptions = {}) => {
    if (!currentUser) {
      router.push('/login');
      toast.error('Please login to add items to cart');
      return { success: false, error: 'Please login to add items to cart' };
    }

    const { size, color } = selectedOptions;
    if (!size || !color) {
      toast.error('Please select size and color');
      return { success: false, error: 'Please select size and color' };
    }

    const currentCart = getCurrentUserCart();
    const productKey = `${product.id}-${size}-${color}`;
    
    const existingItemIndex = currentCart.findIndex(item => 
      item.id === product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    let updatedCart;
    if (existingItemIndex >= 0) {
      // Update existing item
      updatedCart = currentCart.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      updatedCart = [...currentCart, {
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: color,
        productKey
      }];
    }

    // Update user's cart
    const newUserCarts = {
      ...userCarts,
      [currentUser.id]: updatedCart
    };

    setUserCarts(newUserCarts);
    localStorage.setItem('userCarts', JSON.stringify(newUserCarts));
    toast.success('Product added to cart');
    return { success: true };
  };

  const removeFromCart = (productKey) => {
    if (!currentUser) return;

    const updatedCart = getCurrentUserCart().filter(
      item => item.productKey !== productKey
    );

    const newUserCarts = {
      ...userCarts,
      [currentUser.id]: updatedCart
    };

    setUserCarts(newUserCarts);
    localStorage.setItem('userCarts', JSON.stringify(newUserCarts));
  };

  const updateCartQuantity = (productKey, quantity) => {
    if (!currentUser) return;

    const updatedCart = getCurrentUserCart().map(item =>
      item.productKey === productKey ? { ...item, quantity } : item
    );

    const newUserCarts = {
      ...userCarts,
      [currentUser.id]: updatedCart
    };

    setUserCarts(newUserCarts);
    localStorage.setItem('userCarts', JSON.stringify(newUserCarts));
  };

  const clearCart = () => {
    if (!currentUser) return;

    const newUserCarts = {
      ...userCarts,
      [currentUser.id]: []
    };

    setUserCarts(newUserCarts);
    localStorage.setItem('userCarts', JSON.stringify(newUserCarts));
  };


  const login = async (credentials) => {
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
        toast.success('Login successful');
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
      localStorage.setItem('isAuthenticated', 'true');
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      toast.success(' Registration successful');
      
      return { success: true };
    } catch (error) {
      toast.error('An error occurred during registration');
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const value = {
    currentUser,
    cart: getCurrentUserCart(),
    loading,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartItemCount: (productId) => {
      const cart = getCurrentUserCart();
      return cart.reduce((total, item) => 
        item.id === productId ? total + item.quantity : total, 0
      );
    }
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