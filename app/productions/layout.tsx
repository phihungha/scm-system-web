import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/nav';

const navTabItems = [
  { url: '/sales/orders', name: 'Orders' },
  { url: '/sales/customers', name: 'Customers' },
  { url: '/production/orders', name: 'ProductionOrders' },
];

export default function SalesLayout({
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
