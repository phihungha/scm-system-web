'use client';

import { getSupplies } from '@/app/api/supply';
import { ItemDisplayCard } from '@/app/components/item-cards';
import { SectionText } from '@/app/components/texts';
import { ProductionSupplyUsageItem } from '@/app/models/production-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import { Stack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

export default function ProductionSupplyUsageItemsPanel({
  props,
}: {
  props: ProductionSupplyUsageItem[];
}) {
  const items = props;

  const { data: supplies } = useQuery({
    queryKey: ['supplies'],
    queryFn: () => getSupplies(),
  });

  return (
    <Stack spacing={5}>
      <SectionText>Supply Usage Items</SectionText>
      {items?.map((item) => (
        <ProductionSupplyUsageItemCard key={item.supplyId} props={item} />
      ))}
    </Stack>
  );
}

function ProductionSupplyUsageItemCard({
  props,
}: {
  props: ProductionSupplyUsageItem;
}) {
  const item = props;
  const supply = props.supply;

  return (
    <ItemDisplayCard
      key={item.supplyId}
      name={supply.name}
      imageUrl={supply.imageUrl}
    >
      <Text>
        Quantity: {item.quantity} {item.unit}
      </Text>
      <Text>Cost: {CurrencyFormat.format(item.unitCost)}</Text>
      <Text>Total Cost: {CurrencyFormat.format(item.totalCost)}</Text>
    </ItemDisplayCard>
  );
}
