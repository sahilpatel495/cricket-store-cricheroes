

'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await register({ name, email, password });
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm border">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Create an account</h2>
        
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition duration-300"
            >
            Sign Up
          </button>
            </div>
        </form>
      </div>
      
      <button 
        onClick={() => router.push('/login')}
        className="w-80 mt-4 rounded-full text-gray-900 py-2 rounded bg-white border border-black hover:bg-gray-100 transition duration-300"
      >
        Already have an account? Sign In
      </button>
    </div>
  );
}