// src/hooks/useWishlist.ts - Debug Version
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface WishlistItem {
  id: string;
  packageId: string;
  userId: string;
  addedAt: string;
  package?: {
    id: string;
    title: string;
    destination: string;
    price: number;
    thumbnail: string;
    type: 'domestic' | 'international';
    category: string;
    duration: number;
  };
}

interface UseWishlistReturn {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
  addToWishlist: (packageId: string) => Promise<void>;
  removeFromWishlist: (packageId: string) => Promise<void>;
  isInWishlist: (packageId: string) => boolean;
  fetchWishlist: () => Promise<void>;
  clearWishlist: () => void;
}

export const useWishlist = (): UseWishlistReturn => {
  const { user, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get auth headers for API calls
  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token exists:', !!token);
    console.log('🔑 Token preview:', token ? token.substring(0, 20) + '...' : 'No token');
    
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }, []);

  // Add package to wishlist
  const addToWishlist = useCallback(async (packageId: string) => {
    console.log('📦 Adding to wishlist - Package ID:', packageId);
    console.log('🔐 User authenticated:', isAuthenticated);
    console.log('👤 User data:', user);

    if (!isAuthenticated || !user) {
      throw new Error('Please login to add packages to your wishlist');
    }

    try {
      setLoading(true);
      setError(null);

      const headers = getAuthHeaders();
      console.log('📡 Request headers:', headers);

      const requestBody = { packageId };
      console.log('📤 Request body:', requestBody);

      const response = await fetch('/api/users/wishlist', {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response statusText:', response.statusText);

      // Log response headers
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.status === 401) {
        console.error('❌ 401 Unauthorized - Token may be invalid');
        
        // Let's check the response body for more details
        try {
          const errorData = await response.json();
          console.error('❌ 401 Error details:', errorData);
        } catch (e) {
          console.error('❌ Could not parse 401 error response');
        }
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }

      if (response.status === 409) {
        const errorData = await response.json().catch(() => ({}));
        console.log('⚠️ 409 Conflict:', errorData);
        throw new Error(errorData.message || 'Package already in wishlist');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `Failed to add to wishlist: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Success response:', data);
      
      if (data.success && data.wishlistItem) {
        setWishlist(prev => [...prev, data.wishlistItem]);
        console.log('✅ Added to local wishlist state');
      } else {
        console.log('🔄 Refreshing entire wishlist as fallback');
        await fetchWishlist();
      }
    } catch (error: any) {
      console.error('❌ Failed to add to wishlist:', error);
      setError(error.message || 'Failed to add to wishlist');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, getAuthHeaders]);

  // Fetch user's wishlist
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/users/wishlist', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setWishlist([]);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch wishlist: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.wishlist)) {
        setWishlist(data.wishlist);
      } else if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        setWishlist([]);
      }
    } catch (error: any) {
      console.error('Failed to fetch wishlist:', error);
      setError(error.message || 'Failed to load wishlist');
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, getAuthHeaders]);

  // Remove package from wishlist
  const removeFromWishlist = useCallback(async (packageId: string) => {
    if (!isAuthenticated || !user) {
      throw new Error('Please login to manage your wishlist');
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/users/wishlist/${packageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }

      if (response.status === 404) {
        setWishlist(prev => prev.filter(item => item.packageId !== packageId));
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to remove from wishlist: ${response.status}`);
      }

      setWishlist(prev => prev.filter(item => item.packageId !== packageId));
    } catch (error: any) {
      console.error('Failed to remove from wishlist:', error);
      setError(error.message || 'Failed to remove from wishlist');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, getAuthHeaders]);

  // Check if package is in wishlist
  const isInWishlist = useCallback((packageId: string): boolean => {
    return wishlist.some(item => item.packageId === packageId);
  }, [wishlist]);

  // Clear wishlist (for logout)
  const clearWishlist = useCallback(() => {
    setWishlist([]);
    setError(null);
  }, []);

  // Fetch wishlist when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWishlist();
    } else {
      clearWishlist();
    }
  }, [isAuthenticated, user, fetchWishlist, clearWishlist]);

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist,
    clearWishlist
  };
};