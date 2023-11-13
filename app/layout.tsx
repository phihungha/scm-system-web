'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryProvider from './utils/QueryProvider';
import NavBar from './components/NavBar';
import Sidebar from './components/SideBar';
import { ChakraProvider } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ChakraProvider>
            <Body>{children}</Body>
          </ChakraProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

function Body({ children }: RootLayoutProps) {
  const path = usePathname();
  return (
    <div className={`${inter.className} flex min-h-screen flex-col p-0`}>
      {(() => {
        if (path == '/login') {
          return (
            <div>
              <NavBar />
              {children}
            </div>
          );
        } else {
          return <Sidebar>{children}</Sidebar>;
        }
      })()}
    </div>
  );
}
