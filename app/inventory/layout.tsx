import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/nav';

const navTabItems = [
  { url: '/inventory/productStock', name: 'Product stock' },
  { url: '/inventory/supplyStock', name: 'Supply stock' },
  { url: '/inventory/productsIssue', name: 'Products issue' },
  { url: '/inventory/productsReceive', name: 'Products receive' },
  { url: '/inventory/suppliesIssue', name: 'Supplies issue' },
  { url: '/inventory/suppliesReceive', name: 'Supplies receive' },
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
