// Create a temporary simplified Layout
// src/components/layout/SimpleLayout.tsx
import React from 'react';
import Head from 'next/head';

interface SimpleLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children, title = 'Travel Quench' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
};

export default SimpleLayout;