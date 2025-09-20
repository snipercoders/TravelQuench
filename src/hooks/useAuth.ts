


// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = useAuthContext;

// Custom hook for protected routes
export const useRequireAuth = (redirectTo: string = '/auth/login') => {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { 
    user, 
    isAuthenticated, 
    isLoading,
    checkAuth 
  };
};

// Custom hook for guest-only routes (redirect if authenticated)
export const useGuestOnly = (redirectTo: string = '/') => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
};

// Admin-specific hook with role checking
export const useRequireAdmin = (redirectTo: string = '/unauthorized') => {
  const authData = useRequireAuth();
  const router = useRouter();

  const isAdmin = authData.user?.role === 'admin';

  useEffect(() => {
    if (!authData.isLoading && authData.isAuthenticated && authData.user) {
      if (authData.user.role !== 'admin') {
        router.push(redirectTo);
      }
    }
  }, [authData.isLoading, authData.isAuthenticated, authData.user, router, redirectTo]);

  return {
    ...authData,
    isAdmin,
    adminChecked: !authData.isLoading
  };
};
