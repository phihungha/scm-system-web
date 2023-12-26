import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/nav';

const navTabItems = [
  { url: '/reports/sales', name: 'Sales' },
  { url: '/reports/purchases', name: 'Purchases' },
  { url: '/reports/production', name: 'Production' },
];

export default function InventoryLayout({
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
