// // src/hooks/useWishlist.ts - Debug Version
// import { useState, useEffect, useCallback } from 'react';
// import { useAuth } from './useAuth';

// interface WishlistItem {
//   id: string;
//   packageId: string;
//   userId: string;
//   addedAt: string;
//   package?: {
//     id: string;
//     title: string;
//     destination: string;
//     price: number;
//     thumbnail: string;
//     type: 'domestic' | 'international';
//     category: string;
//     duration: number;
//   };
// }

// interface UseWishlistReturn {
//   wishlist: WishlistItem[];
//   loading: boolean;
//   error: string | null;
//   addToWishlist: (packageId: string) => Promise<void>;
//   removeFromWishlist: (packageId: string) => Promise<void>;
//   isInWishlist: (packageId: string) => boolean;
//   fetchWishlist: () => Promise<void>;
//   clearWishlist: () => void;
// }

// export const useWishlist = (): UseWishlistReturn => {
//   const { user, isAuthenticated } = useAuth();
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Get auth headers for API calls
//   const getAuthHeaders = useCallback(() => {
//     const token = localStorage.getItem('token');
//     console.log('🔑 Token exists:', !!token);
//     console.log('🔑 Token preview:', token ? token.substring(0, 20) + '...' : 'No token');
    
//     return {
//       'Content-Type': 'application/json',
//       'Authorization': token ? `Bearer ${token}` : ''
//     };
//   }, []);

//   // Add package to wishlist
//   const addToWishlist = useCallback(async (packageId: string) => {
//     console.log('📦 Adding to wishlist - Package ID:', packageId);
//     console.log('🔐 User authenticated:', isAuthenticated);
//     console.log('👤 User data:', user);

//     if (!isAuthenticated || !user) {
//       throw new Error('Please login to add packages to your wishlist');
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const headers = getAuthHeaders();
//       console.log('📡 Request headers:', headers);

//       const requestBody = { packageId };
//       console.log('📤 Request body:', requestBody);

//       const response = await fetch('/api/users/wishlist', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(requestBody)
//       });

//       console.log('📥 Response status:', response.status);
//       console.log('📥 Response statusText:', response.statusText);

//       // Log response headers
//       console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

//       if (response.status === 401) {
//         console.error('❌ 401 Unauthorized - Token may be invalid');
        
//         // Let's check the response body for more details
//         try {
//           const errorData = await response.json();
//           console.error('❌ 401 Error details:', errorData);
//         } catch (e) {
//           console.error('❌ Could not parse 401 error response');
//         }
        
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         throw new Error('Session expired. Please login again.');
//       }

//       if (response.status === 409) {
//         const errorData = await response.json().catch(() => ({}));
//         console.log('⚠️ 409 Conflict:', errorData);
//         throw new Error(errorData.message || 'Package already in wishlist');
//       }

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         console.error('❌ API Error:', errorData);
//         throw new Error(errorData.message || `Failed to add to wishlist: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('✅ Success response:', data);
      
//       if (data.success && data.wishlistItem) {
//         setWishlist(prev => [...prev, data.wishlistItem]);
//         console.log('✅ Added to local wishlist state');
//       } else {
//         console.log('🔄 Refreshing entire wishlist as fallback');
//         await fetchWishlist();
//       }
//     } catch (error: any) {
//       console.error('❌ Failed to add to wishlist:', error);
//       setError(error.message || 'Failed to add to wishlist');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated, user, getAuthHeaders]);

//   // Fetch user's wishlist
//   const fetchWishlist = useCallback(async () => {
//     if (!isAuthenticated || !user) {
//       setWishlist([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('/api/users/wishlist', {
//         method: 'GET',
//         headers: getAuthHeaders()
//       });

//       if (response.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setWishlist([]);
//         return;
//       }

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Failed to fetch wishlist: ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (data.success && Array.isArray(data.wishlist)) {
//         setWishlist(data.wishlist);
//       } else if (Array.isArray(data)) {
//         setWishlist(data);
//       } else {
//         setWishlist([]);
//       }
//     } catch (error: any) {
//       console.error('Failed to fetch wishlist:', error);
//       setError(error.message || 'Failed to load wishlist');
//       setWishlist([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated, user, getAuthHeaders]);

//   // Remove package from wishlist
//   const removeFromWishlist = useCallback(async (packageId: string) => {
//     if (!isAuthenticated || !user) {
//       throw new Error('Please login to manage your wishlist');
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`/api/users/wishlist/${packageId}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders()
//       });

//       if (response.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         throw new Error('Session expired. Please login again.');
//       }

//       if (response.status === 404) {
//         setWishlist(prev => prev.filter(item => item.packageId !== packageId));
//         return;
//       }

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Failed to remove from wishlist: ${response.status}`);
//       }

//       setWishlist(prev => prev.filter(item => item.packageId !== packageId));
//     } catch (error: any) {
//       console.error('Failed to remove from wishlist:', error);
//       setError(error.message || 'Failed to remove from wishlist');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated, user, getAuthHeaders]);

//   // Check if package is in wishlist
//   const isInWishlist = useCallback((packageId: string): boolean => {
//     return wishlist.some(item => item.packageId === packageId);
//   }, [wishlist]);

//   // Clear wishlist (for logout)
//   const clearWishlist = useCallback(() => {
//     setWishlist([]);
//     setError(null);
//   }, []);

//   // Fetch wishlist when user changes
//   useEffect(() => {
//     if (isAuthenticated && user) {
//       fetchWishlist();
//     } else {
//       clearWishlist();
//     }
//   }, [isAuthenticated, user, fetchWishlist, clearWishlist]);

//   return {
//     wishlist,
//     loading,
//     error,
//     addToWishlist,
//     removeFromWishlist,
//     isInWishlist,
//     fetchWishlist,
//     clearWishlist
//   };
// };









// src/hooks/useWishlist.ts - Fixed Version
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

  // Fetch user's wishlist - FIXED VERSION
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching wishlist...');
      console.log('🔐 Auth headers:', getAuthHeaders());

      const response = await fetch('/api/users/wishlist', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      console.log('📥 Fetch Response status:', response.status);
      console.log('📥 Fetch Response statusText:', response.statusText);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        console.error('❌ 401 Unauthorized - clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setWishlist([]);
        setError('Session expired. Please login again.');
        return;
      }

      // Handle 404 - wishlist endpoint doesn't exist
      if (response.status === 404) {
        console.warn('⚠️ Wishlist endpoint not found (404)');
        setWishlist([]);
        setError('Wishlist feature is not available');
        return;
      }

      // Handle 500 server errors
      if (response.status >= 500) {
        console.error('❌ Server error:', response.status);
        setWishlist([]);
        setError('Server error. Please try again later.');
        return;
      }

      // Handle other non-OK responses
      if (!response.ok) {
        let errorMessage = `Failed to fetch wishlist: ${response.status}`;
        
        try {
          const errorData = await response.json();
          console.error('❌ API Error details:', errorData);
          errorMessage = errorData.message || errorMessage;
        } catch {
          console.error('❌ Could not parse error response');
          // Try to get text response as fallback
          try {
            const textResponse = await response.text();
            console.error('❌ Error response text:', textResponse);
            if (textResponse.includes('<!DOCTYPE html>') || textResponse.includes('<html>')) {
              errorMessage = 'Server returned HTML instead of JSON. Check if the API endpoint exists.';
            }
          } catch {
            console.error('❌ Could not get text response either');
          }
        }
        
        throw new Error(errorMessage);
      }

      // Parse successful response
      const data = await response.json();
      console.log('✅ Wishlist data received:', data);
      
      // Handle the API response format based on YOUR actual backend structure
      if (data.success && Array.isArray(data.wishlist)) {
        // Your API returns: { success: true, wishlist: [...] }
        setWishlist(data.wishlist);
        console.log('✅ Wishlist updated with', data.wishlist.length, 'items');
      } else if (data.success && !data.wishlist) {
        // Empty wishlist: { success: true } with no wishlist property
        setWishlist([]);
        console.log('✅ Empty wishlist received');
      } else if (Array.isArray(data)) {
        // Fallback: direct array response
        setWishlist(data);
        console.log('✅ Wishlist updated with', data.length, 'items (direct array)');
      } else {
        console.warn('⚠️ Unexpected response format:', data);
        setWishlist([]);
      }
    } catch (fetchError: unknown) {
      console.error('❌ Failed to fetch wishlist:', fetchError);
      
      // More specific error handling
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Failed to load wishlist';
      
      if (fetchError instanceof Error) {
        if (fetchError.name === 'TypeError' && fetchError.message.includes('fetch')) {
          setError('Network error. Please check your connection.');
        } else if (fetchError.message.includes('JSON')) {
          setError('Server response error. Please try again.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to load wishlist');
      }
      
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, getAuthHeaders]);

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
        } catch {
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
    } catch (addError: unknown) {
      console.error('❌ Failed to add to wishlist:', addError);
      const errorMessage = addError instanceof Error ? addError.message : 'Failed to add to wishlist';
      setError(errorMessage);
      throw addError;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, getAuthHeaders, fetchWishlist]);

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
        // Item not found, remove from local state anyway
        setWishlist(prev => prev.filter(item => item.packageId !== packageId));
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to remove from wishlist: ${response.status}`);
      }

      // Remove from local state
      setWishlist(prev => prev.filter(item => item.packageId !== packageId));
    } catch (removeError: unknown) {
      console.error('Failed to remove from wishlist:', removeError);
      const errorMessage = removeError instanceof Error ? removeError.message : 'Failed to remove from wishlist';
      setError(errorMessage);
      throw removeError;
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

  // Fetch wishlist when user changes - with error boundary
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWishlist().catch(fetchError => {
        console.error('Effect: Failed to fetch wishlist:', fetchError);
        // Error is already handled in fetchWishlist
      });
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