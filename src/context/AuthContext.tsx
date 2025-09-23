

// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useRouter } from 'next/router';

// interface User {
//   id: string;
//   name: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   phone?: string;
//   role: 'customer' | 'admin';
//   isEmailVerified: boolean;
//   profileImage?: string;
//   totalBookings?: number;
//   totalSpent?: number;
//   lastLoginAt?: string;
//   createdAt: string;
//   isActive: boolean;
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

// type AuthAction =
//   | { type: 'AUTH_START' }
//   | { type: 'AUTH_SUCCESS'; payload: User }
//   | { type: 'AUTH_FAILURE'; payload: string }
//   | { type: 'LOGOUT' }
//   | { type: 'UPDATE_USER'; payload: Partial<User> };

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,
// };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'AUTH_START':
//       return { ...state, isLoading: true, error: null };
//     case 'AUTH_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//         isLoading: false,
//         error: null,
//       };
//     case 'AUTH_FAILURE':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: action.payload,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: null,
//       };
//     case 'UPDATE_USER':
//       return {
//         ...state,
//         user: state.user ? { ...state.user, ...action.payload } : null,
//       };
//     default:
//       return state;
//   }
// };

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
//   logout: () => void;
//   signup: (userData: any) => Promise<{ success: boolean; message: string }>;
//   updateUser: (userData: Partial<User>) => void;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const router = useRouter();

//   // Check authentication status on mount
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     dispatch({ type: 'AUTH_START' });
    
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         dispatch({ type: 'AUTH_FAILURE', payload: 'No token found' });
//         return;
//       }

//       const response = await fetch('/api/auth/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         dispatch({ type: 'AUTH_SUCCESS', payload: userData });
//       } else {
//         // Token is invalid
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid token' });
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication check failed' });
//     }
//   };

//   const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
//     dispatch({ type: 'AUTH_START' });
    
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Store token and user data
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
        
//         return { success: true, message: data.message || 'Login successful' };
//       } else {
//         dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Login failed' });
//         return { success: false, message: data.message || 'Login failed' };
//       }
//     } catch (error) {
//       const errorMessage = 'Network error. Please try again.';
//       dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
//       return { success: false, message: errorMessage };
//     }
//   };

//   const signup = async (userData: any): Promise<{ success: boolean; message: string }> => {
//     dispatch({ type: 'AUTH_START' });
    
//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Don't auto-login after signup, just show success
//         dispatch({ type: 'AUTH_FAILURE', payload: '' }); // Reset loading state
//         return { success: true, message: data.message || 'Account created successfully' };
//       } else {
//         dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Signup failed' });
//         return { success: false, message: data.message || 'Signup failed' };
//       }
//     } catch (error) {
//       const errorMessage = 'Network error. Please try again.';
//       dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
//       return { success: false, message: errorMessage };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//     router.push('/');
//   };

//   const updateUser = (userData: Partial<User>) => {
//     dispatch({ type: 'UPDATE_USER', payload: userData });
    
//     // Update localStorage
//     if (state.user) {
//       const updatedUser = { ...state.user, ...userData };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   const value: AuthContextType = {
//     ...state,
//     login,
//     logout,
//     signup,
//     updateUser,
//     checkAuth,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };












// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useRouter } from 'next/router';

// interface User {
//   id: string;
//   name: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   phone?: string;
//   role: 'customer' | 'admin';
//   isEmailVerified: boolean;
//   profileImage?: string;
//   totalBookings?: number;
//   totalSpent?: number;
//   lastLoginAt?: string;
//   createdAt: string;
//   isActive: boolean;
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

// type AuthAction =
//   | { type: 'AUTH_START' }
//   | { type: 'AUTH_SUCCESS'; payload: User }
//   | { type: 'AUTH_FAILURE'; payload: string }
//   | { type: 'LOGOUT' }
//   | { type: 'UPDATE_USER'; payload: Partial<User> };

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,
// };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'AUTH_START':
//       return { ...state, isLoading: true, error: null };
//     case 'AUTH_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//         isLoading: false,
//         error: null,
//       };
//     case 'AUTH_FAILURE':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: action.payload,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: null,
//       };
//     case 'UPDATE_USER':
//       return {
//         ...state,
//         user: state.user ? { ...state.user, ...action.payload } : null,
//       };
//     default:
//       return state;
//   }
// };

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
//   logout: () => void;
//   signup: (userData: any) => Promise<{ success: boolean; message: string }>;
//   updateUser: (userData: Partial<User>) => void;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const router = useRouter();

//   useEffect(() => {
//     console.log('AuthProvider mounted, running checkAuth...');
//     checkAuth().then(() => console.log('checkAuth completed:', state));
//   }, []);

//   const checkAuth = async () => {
//     console.log('Starting checkAuth...');
//     dispatch({ type: 'AUTH_START' });

//     const token = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     console.log('Token in localStorage:', !!token);
//     console.log('User in localStorage:', !!storedUser);

//     if (token && storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         console.log('Parsed user data:', userData);

//         // Validate user data
//         if (userData.id && userData.email && userData.role) {
//           dispatch({ type: 'AUTH_SUCCESS', payload: userData });
//           console.log('Restored user from localStorage:', userData);
//         } else {
//           console.error('Invalid user data structure:', userData);
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid user data in localStorage' });
//           return;
//         }
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to parse user data' });
//         return;
//       }

//       // Verify token with server in the background
//       try {
//         console.log('Verifying token with /api/auth/profile...');
//         const response = await fetch('/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         console.log('Profile API response status:', response.status);

//         if (response.ok) {
//           const userData = await response.json();
//           console.log('Profile API response data:', userData);
//           dispatch({ type: 'AUTH_SUCCESS', payload: userData });
//           localStorage.setItem('user', JSON.stringify(userData));
//         } else {
//           console.error('Profile API failed:', response.status, response.statusText);
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           dispatch({ type: 'AUTH_FAILURE', payload: `Profile API failed: ${response.statusText}` });
//         }
//       } catch (error) {
//         console.error('Profile API error:', error);
//         // Only clear localStorage if the error is critical (e.g., network failure)
//         dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to verify token' });
//       }
//     } else {
//       console.log('No token or user in localStorage, marking as unauthenticated');
//       dispatch({ type: 'AUTH_FAILURE', payload: 'No authentication data found' });
//     }
//   };

//   const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
//     console.log('Attempting login:', { email });
//     dispatch({ type: 'AUTH_START' });

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log('Login API response:', data);

//       if (response.ok && data.success) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
//         console.log('Login successful, user:', data.user);
//         return { success: true, message: data.message || 'Login successful' };
//       } else {
//         console.error('Login failed:', data.message);
//         dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Login failed' });
//         return { success: false, message: data.message || 'Login failed' };
//       }
//     } catch (error) {
//       console.error('Login network error:', error);
//       dispatch({ type: 'AUTH_FAILURE', payload: 'Network error. Please try again.' });
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   const signup = async (userData: any): Promise<{ success: boolean; message: string }> => {
//     console.log('Attempting signup:', userData);
//     dispatch({ type: 'AUTH_START' });

//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();
//       console.log('Signup API response:', data);

//       if (response.ok && data.success) {
//         dispatch({ type: 'AUTH_FAILURE', payload: '' }); // Reset loading state
//         return { success: true, message: data.message || 'Account created successfully' };
//       } else {
//         dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Signup failed' });
//         return { success: false, message: data.message || 'Signup failed' };
//       }
//     } catch (error) {
//       console.error('Signup network error:', error);
//       dispatch({ type: 'AUTH_FAILURE', payload: 'Network error. Please try again.' });
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   const logout = () => {
//     console.log('Logging out...');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//     router.push('/');
//   };

//   const updateUser = (userData: Partial<User>) => {
//     console.log('Updating user:', userData);
//     dispatch({ type: 'UPDATE_USER', payload: userData });
//     if (state.user) {
//       const updatedUser = { ...state.user, ...userData };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   const value: AuthContextType = {
//     ...state,
//     login,
//     logout,
//     signup,
//     updateUser,
//     checkAuth,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };





















// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useRouter } from 'next/router';

// interface User {
//   id: string;
//   name: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   phone?: string;
//   role: 'customer' | 'admin';
//   isEmailVerified: boolean;
//   profileImage?: string;
//   totalBookings?: number;
//   totalSpent?: number;
//   lastLoginAt?: string;
//   createdAt: string;
//   isActive: boolean;
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

// type AuthAction =
//   | { type: 'AUTH_START' }
//   | { type: 'AUTH_SUCCESS'; payload: User }
//   | { type: 'AUTH_FAILURE'; payload: string }
//   | { type: 'LOGOUT' }
//   | { type: 'UPDATE_USER'; payload: Partial<User> };

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,
// };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'AUTH_START':
//       return { ...state, isLoading: true, error: null };
//     case 'AUTH_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//         isLoading: false,
//         error: null,
//       };
//     case 'AUTH_FAILURE':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: action.payload,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: null,
//       };
//     case 'UPDATE_USER':
//       return {
//         ...state,
//         user: state.user ? { ...state.user, ...action.payload } : null,
//       };
//     default:
//       return state;
//   }
// };

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
//   logout: () => void;
//   signup: (userData: any) => Promise<{ success: boolean; message: string }>;
//   updateUser: (userData: Partial<User>) => void;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const router = useRouter();

//   // Check authentication status on mount
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     dispatch({ type: 'AUTH_START' });
    
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         dispatch({ type: 'AUTH_FAILURE', payload: 'No token found' });
//         return;
//       }

//       const response = await fetch('/api/auth/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         dispatch({ type: 'AUTH_SUCCESS', payload: userData });
//       } else {
//         // Token is invalid
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid token' });
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication check failed' });
//     }
//   };

//   const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
//     dispatch({ type: 'AUTH_START' });
    
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Store token and user data
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
        
//         return { success: true, message: data.message || 'Login successful' };
//       } else {
//         dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Login failed' });
//         return { success: false, message: data.message || 'Login failed' };
//       }
//     } catch (error) {
//       const errorMessage = 'Network error. Please try again.';
//       dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
//       return { success: false, message: errorMessage };
//     }
//   };

//   const signup = async (userData: any): Promise<{ success: boolean; message: string }> => {
//     dispatch({ type: 'AUTH_START' });
    
//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Don't auto-login after signup, just show success
//         dispatch({ type: 'AUTH_FAILURE', payload: '' }); // Reset loading state
//         return { success: true, message: data.message || 'Account created successfully' };
//       } else {
//         dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Signup failed' });
//         return { success: false, message: data.message || 'Signup failed' };
//       }
//     } catch (error) {
//       const errorMessage = 'Network error. Please try again.';
//       dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
//       return { success: false, message: errorMessage };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//     router.push('/');
//   };

//   const updateUser = (userData: Partial<User>) => {
//     dispatch({ type: 'UPDATE_USER', payload: userData });
    
//     // Update localStorage
//     if (state.user) {
//       const updatedUser = { ...state.user, ...userData };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   const value: AuthContextType = {
//     ...state,
//     login,
//     logout,
//     signup,
//     updateUser,
//     checkAuth,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };










// src/context/AuthContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  isEmailVerified: boolean;
  profileImage?: string;
  totalBookings?: number;
  totalSpent?: number;
  lastLoginAt?: string;
  createdAt: string;
  isActive: boolean;
}

// Define a specific type for signup data
interface SignupData {
  name: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    dispatch({ type: 'AUTH_START' });

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'No token found' });
        return;
      }

      const response = await fetch('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData: User = await response.json();
        dispatch({ type: 'AUTH_SUCCESS', payload: userData });
      } else {
        // Token is invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid token' });
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication check failed' });
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch({ type: 'AUTH_SUCCESS', payload: data.user });

        return { success: true, message: data.message || 'Login successful' };
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Login failed' });
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch {
      const errorMessage = 'Network error. Please try again.';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Don't auto-login after signup, just show success
        dispatch({ type: 'AUTH_FAILURE', payload: '' }); // Reset loading state
        return { success: true, message: data.message || 'Account created successfully' };
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: data.message || 'Signup failed' });
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch {
      const errorMessage = 'Network error. Please try again.';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });

    // Update localStorage
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    signup,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


