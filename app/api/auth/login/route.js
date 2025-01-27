'use client';

import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from "@/app/login/page";


const LoginPage = () => {
  const { currentUser  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser ) {
      router.push('/'); 
    }
  }, [currentUser , router]);

  return <Login />;
};

export default LoginPage;