'use client';
import ItemEditCard from '@/app/components/ItemEditCard';
import { SalesOrderItem } from '@/app/models/sales-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import { Text } from '@chakra-ui/react';

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

  const onQuantityChange = (quantity: number) =>
    props.onQuantityChange({
      ...item,
      quantity,
      totalPrice: quantity * product.price,
    });

  return (
    <ItemEditCard
      id={product.id}
      quantity={item.quantity}
      onQuantityChange={(_, quantity) => onQuantityChange(quantity)}
      name={product.name}
      unit={item.unit}
      imageUrl={product.imageUrl}
      onDelete={() => props.onDelete(item)}
    >
      <Text>Price: {CurrencyFormat.format(item.unitPrice)}</Text>
      <Text>Total price: {CurrencyFormat.format(item.totalPrice)}</Text>
    </ItemEditCard>
  );
}
