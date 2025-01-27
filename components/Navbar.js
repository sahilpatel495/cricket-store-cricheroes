'use client';

import Login from '@/app/login/page';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const { currentUser , logout } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    if (currentUser ) {
      logout();
      router.push('/'); // Redirect to home on logout
    } else {
      setShowLogin(true); // Show login popup
    }
  };

  const closeLoginPopup = () => {
    setShowLogin(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Cricket Store</div>
      <div>
        {currentUser  ? (
          <div>
            <span className="mr-4">Hello, {currentUser .name}</span>
            <button onClick={handleLoginClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        )}
      </div>
      {showLogin && <Login onClose={closeLoginPopup} />}
    </nav>
  );
};

export default Navbar;