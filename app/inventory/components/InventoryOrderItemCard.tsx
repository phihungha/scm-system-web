'use client';

import { ItemDisplayCard } from '@/app/components/item-cards';
import CurrencyFormat from '@/app/utils/currency-formats';
import { Text } from '@chakra-ui/react';

export interface InventoryOrderItemDisplayCardProps {
  imageUrl?: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export default function InventoryOrderDisplayItemCard(
  props: InventoryOrderItemDisplayCardProps,
) {
  return (
    <ItemDisplayCard imageUrl={props.imageUrl} name={props.name}>
      <Text>
        Quantity: {props.quantity} {props.unit}
      </Text>
      <Text>Price: {CurrencyFormat.format(props.unitPrice)}</Text>
      <Text>Total price: {CurrencyFormat.format(props.totalPrice)}</Text>
    </ItemDisplayCard>
  );
}
