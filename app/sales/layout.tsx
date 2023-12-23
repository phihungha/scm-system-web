import { Stack, Tab, TabList, Tabs } from '@chakra-ui/react';
import Link from 'next/link';

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack spacing={5}>
      <Tabs>
        <TabList>
          <Link href="/sales/orders">
            <Tab>Orders</Tab>
          </Link>
          <Link href="/sales/customers">
            <Tab>Customers</Tab>
          </Link>
        </TabList>
      </Tabs>
      {children}
    </Stack>
  );
}
