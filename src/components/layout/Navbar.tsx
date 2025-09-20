

// src/components/layout/Navbar.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, User, LogOut, Settings, Heart, Calendar, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/utils/constants';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'About', href: ROUTES.ABOUT },
    { name: 'International Packages', href: ROUTES.INTERNATIONAL_PACKAGES },
    { name: 'Indian Packages', href: ROUTES.INDIAN_PACKAGES },
    { name: 'Testimonials', href: ROUTES.TESTIMONIALS },
    { name: 'Customize', href: ROUTES.CUSTOMIZE },
  ];

  // Customer menu items
  const customerMenuItems = [
    { name: 'Profile', href: ROUTES.PROFILE, icon: User },
    { name: 'Bookings', href: ROUTES.BOOKINGS, icon: Calendar },
    { name: 'Wishlist', href: ROUTES.WISHLIST, icon: Heart },
  ];

  // Admin menu items
  const adminMenuItems = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'Package Management', href: '/admin/packages', icon: Settings },
    { name: 'User Management', href: '/admin/users', icon: User },
    { name: 'Booking Management', href: '/admin/bookings', icon: Calendar },
  ];

  // Get appropriate menu items based on user role
  const getUserMenuItems = () => {
    if (user?.role === 'admin') {
      return [...adminMenuItems, ...customerMenuItems];
    }
    return customerMenuItems;
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push(ROUTES.HOME);
  };

  const getInitials = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    if (user?.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return user.name.slice(0, 2);
    }
    return 'U';
  };

  const getDisplayName = (user: any) => {
    return user?.firstName || user?.name?.split(' ')[0] || 'User';
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo - Increased size and spacing */}
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Travel Quench Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-gray-900 hidden sm:block">
                  Travel Quench
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  router.pathname === item.href
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-orange-600 hover:border-b-2 hover:border-orange-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user?.role === 'admin' 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                      : 'bg-gradient-to-r from-orange-500 to-red-600'
                  }`}>
                    <span className="text-white text-sm font-medium">
                      {getInitials(user)}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{getDisplayName(user)}</span>
                    {user?.role === 'admin' && (
                      <span className="text-xs text-purple-600 font-semibold flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    )}
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-900">
                        {user?.name || `${user?.firstName} ${user?.lastName}`}
                      </div>
                      <div className="text-sm text-gray-600">{user?.email}</div>
                      {user?.role === 'admin' && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            <Shield className="w-3 h-3 mr-1" />
                            Administrator
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {getUserMenuItems().map((item, index) => {
                        const isAdminItem = adminMenuItems.some(adminItem => adminItem.name === item.name);
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-2 text-sm transition-colors ${
                              isAdminItem
                                ? 'text-purple-700 hover:bg-purple-50 hover:text-purple-800'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm" className="hover:text-orange-600">
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.SIGNUP}>
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600 transition-colors p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  router.pathname === item.href
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-orange-600 hover:border-b-2 hover:border-orange-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-1">
                  {/* User Info */}
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user?.role === 'admin' 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                          : 'bg-gradient-to-r from-orange-500 to-red-600'
                      }`}>
                        <span className="text-white text-sm font-medium">
                          {getInitials(user)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {getDisplayName(user)}
                        </div>
                        {user?.role === 'admin' && (
                          <div className="flex items-center text-xs text-purple-600 font-semibold">
                            <Shield className="w-3 h-3 mr-1" />
                            Administrator
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  {getUserMenuItems().map((item) => {
                    const isAdminItem = adminMenuItems.some(adminItem => adminItem.name === item.name);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-base font-medium transition-colors ${
                          isAdminItem
                            ? 'text-purple-700 hover:bg-purple-50'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Link href={ROUTES.LOGIN} onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center hover:text-orange-600">
                      Login
                    </Button>
                  </Link>
                  <Link href={ROUTES.SIGNUP} onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;