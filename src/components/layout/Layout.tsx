// // src/components/layout/Layout.tsx

import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { useAuth } from '@/context/AuthContext'; // Update path if needed

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, keywords }) => {
  const { isLoading } = useAuth();

  // Show loading spinner while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const defaultTitle = 'Travel Quench';
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || 'Your ultimate travel companion'} />
        <meta name="keywords" content={keywords || 'travel, vacation, holiday packages, flights, hotels, tours'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
