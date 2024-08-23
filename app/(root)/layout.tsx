import Sidebar from '@/components/shared/Sidebar';
import React from 'react';
import type { Metadata } from 'next';
import MobileNav from '@/components/shared/MobileNav';
import { Toaster } from '@/components/ui/toaster';

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
      <Toaster />
    </main>
  );
};

export default Layout;
