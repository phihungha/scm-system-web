'use client';

import {
  Box,
  ChakraProvider,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import HeaderBar from './components/HeaderBar';
import QueryProvider from './components/QueryProvider';
import Sidebar from './components/SideBar';
import './globals.css';
import { RootLayoutProps } from './types/layout-props';

const inter = Inter({ subsets: ['latin'] });

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

interface BodyProps {
  children: React.ReactNode;
}

function Body({ children }: BodyProps) {
  const currentPath = usePathname();

  const loginBody = children;

  const mainBody = <MainBody>{children}</MainBody>;

  return (
    <div className={`${inter.className} flex min-h-screen flex-col p-0`}>
      {currentPath == '/sign-in' ? loginBody : mainBody}
    </div>
  );
}

function MainBody({ children }: RootLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <Sidebar onClose={onClose} display={{ base: 'none', md: 'block' }} />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <HeaderBar onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
