'use client';
import ItemEditCard from '@/app/components/ItemEditCard';
import { SalesOrderItem } from '@/app/models/sales-order';
import { Stack, Text } from '@chakra-ui/react';

export interface SalesOrderItemEditCardProps {
  item: SalesOrderItem;
  onDelete: (item: SalesOrderItem) => void;
  onQuantityChange: (item: SalesOrderItem) => void;
}

export default function SalesOrderItemEditCard(
  props: SalesOrderItemEditCardProps,
) {
  const item = props.item;
  const product = props.item.product;
  const totalPrice = props.item.quantity * product.price;

  return (
    <ItemEditCard
      id={product.id}
      quantity={item.quantity}
      onQuantityChange={() => props.onQuantityChange({ ...item, totalPrice })}
      name={product.name}
      imageUrl={product.imageUrl}
      onDelete={(i) => props.onDelete(item)}
    >
      <Stack alignItems="center" direction={'row'}>
        <Text fontSize={'xl'}>Unit:</Text>
        <Text fontSize={'xl'}>{product.unit}</Text>
      </Stack>

      <Stack alignItems="center" direction={'row'}>
        <Text fontSize={'xl'}>Price:</Text>
        <Text fontSize={'xl'}>{product.price}</Text>
      </Stack>
    </ItemEditCard>
  );
}
