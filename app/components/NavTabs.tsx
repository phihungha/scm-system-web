import { Tab, TabList, Tabs } from '@chakra-ui/react';
import Link from 'next/link';

export interface NavTabsProps {
  items: { url: string; name: string }[];
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
