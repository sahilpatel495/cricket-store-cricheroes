'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login({ email, password });
    
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm border">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Welcome back</h2>
        
        <form onSubmit={handleSignIn}>
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
            className="w-full rounded-full bg-gray-800 text-white py-2  hover:bg-gray-900 transition duration-300"
            >
            Sign In
          </button>
            </div>
        </form>
      </div>
      
      <button 
        onClick={() => router.push('/register')}
        className="w-80 mt-4 rounded-full text-gray-900 py-2 bg-white border border-black hover:bg-gray-100 transition duration-300"
      >
        Create new account
      </button>
    </div>
  );
}