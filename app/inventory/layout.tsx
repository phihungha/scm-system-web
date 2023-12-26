import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/nav';

const navTabItems = [
  { url: '/inventory/product-stock', name: 'Product stock' },
  { url: '/inventory/supply-stock', name: 'Supply stock' },
  { url: '/inventory/products-issue', name: 'Products issue' },
  { url: '/inventory/products-receive', name: 'Products receive' },
  { url: '/inventory/supplies-issue', name: 'Supplies issue' },
  { url: '/inventory/supplies-receive', name: 'Supplies receive' },
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
