'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from "@/app/login/page";
import { useAuth } from '@/context/AuthContext';


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