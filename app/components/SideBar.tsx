'use client';

import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import LoggedNav from './LoggedNav';
import SidebarContent from './SidebarContent';
interface RootLayoutProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: RootLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      return <LoggedNav onOpen={onOpen} />;
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
export default Sidebar;
