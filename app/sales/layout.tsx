import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/NavTabs';

const navTabItems = [
  { url: '/sales/orders', name: 'Orders' },
  { url: '/sales/customers', name: 'Customers' },
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
