'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

// Routes where the public Header/Footer should NOT appear
const APP_ROUTES = ['/login', '/shopkeeper', '/vendor', '/partner'];

export default function ClientRootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = APP_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));

  return (
    <>
      {!isAppRoute && <Header />}
      <main className={isAppRoute ? '' : 'pt-16'}>{children}</main>
      {!isAppRoute && <Footer />}
    </>
  );
}
