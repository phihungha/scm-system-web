'use client';

import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Icon,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FiBarChart,
  FiBox,
  FiCpu,
  FiDownload,
  FiDroplet,
  FiGrid,
  FiHome,
  FiSettings,
  FiUpload,
  FiUser,
} from 'react-icons/fi';

interface NavItemProps {
  href: string;
  icon: IconType;
  children: React.ReactNode;
}

function NavItem({ href, icon, children }: NavItemProps) {
  return (
    <Link href={href}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
        {children}
      </Flex>
    </Link>
  );
}

const navbarItems = [
  { href: '/', name: 'Home', icon: FiHome },
  { href: '/purchases/orders', name: 'Purchases', icon: FiDownload },
  { href: '/production/orders', name: 'Production', icon: FiCpu },
  { href: '/sales/orders', name: 'Sales', icon: FiUpload },
  { href: '/inventory/productStock', name: 'Inventory', icon: FiGrid },
  { href: '/reports/sales', name: 'Reports', icon: FiBarChart },
  { href: '/products', name: 'Products', icon: FiBox },
  { href: '/supplies', name: 'Supplies', icon: FiDroplet },
  { href: '/users', name: 'Users', icon: FiUser },
  { href: '/settings', name: 'Settings', icon: FiSettings },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export default function Sidebar({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {navbarItems.map((navbarItem) => (
        <NavItem key={navbarItem.href} {...navbarItem}>
          {navbarItem.name}
        </NavItem>
      ))}
    </Box>
  );
}

export interface NavTabsProps {
  items: NavTabProps[];
}

export function NavTabs({ items }: NavTabsProps) {
  return (
    <Tabs>
      <TabList>
        {items.map((item) => (
          <NavTab key={item.url} url={item.url} name={item.name} />
        ))}
      </TabList>
    </Tabs>
  );
}

interface NavTabProps {
  url: string;
  name: string;
}

function NavTab({ url, name }: NavTabProps) {
  return (
    <Link href={url}>
      <Tab>{name}</Tab>
    </Link>
  );
}
