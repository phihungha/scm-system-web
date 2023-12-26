import { Stack } from '@chakra-ui/react';
import { NavTabs } from '../components/nav';

const navTabItems = [
  { url: '/production/orders', name: 'Orders' },
  { url: '/production/facilities', name: 'Facilities' },
];

export default function ProductionLayout({
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
