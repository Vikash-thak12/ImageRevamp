import Sidebar from '@/components/shared/Sidebar';
import React from 'react';
import type { Metadata } from 'next';
import MobileNav from '@/components/shared/MobileNav';

export const metadata: Metadata = {
  title: "ImageRevamp",
  description: "An advanced photo editing platform",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
