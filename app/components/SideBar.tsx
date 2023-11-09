'use client';

import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import NormalNav from './NormalNav';
import LoggedNav from './LoggedNav';
import { usePathname } from 'next/navigation';
interface RootLayoutProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: RootLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const path = usePathname();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      {(() => {
        if (path == '/login') {
          return <NormalNav onOpen={onOpen} />;
        } else {
          return <LoggedNav onOpen={onOpen} />;
        }
      })()}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
export default Sidebar;
