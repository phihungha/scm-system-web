'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import QueryProvider from './components/QueryProvider';
import Sidebar from './components/SideBar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface BodyProps {
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

function Body({ children }: BodyProps) {
  const currentPath = usePathname();

  const loginBody = children;

  const mainBody = <Sidebar>{children}</Sidebar>;

  return (
    <div className={`${inter.className} flex min-h-screen flex-col p-0`}>
      {currentPath == '/sign-in' ? loginBody : mainBody}
    </div>
  );
}
