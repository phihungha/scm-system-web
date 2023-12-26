import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/nav';

const navTabItems = [
  { url: '/purchases/requisitions', name: 'Requisitions' },
  { url: '/purchases/orders', name: 'Orders' },
  { url: '/purchases/vendors', name: 'Vendors' },
];

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack spacing={5}>
      <NavTabs items={navTabItems} />
      {children}
    </Stack>
  );
}
