'use client';

import { getProducts } from '@/app/api/product';
import { AutoCompleteItemPreview } from '@/app/components/auto-complete';
import {
  ItemEditCard,
  ItemsEditor,
  OrderItemEditCardProps,
  OrderItemsPanelProps,
} from '@/app/components/items-editor';
import { SectionText } from '@/app/components/texts';
import { SalesOrderItem } from '@/app/models/sales-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import { Stack, Text } from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import { useQuery } from 'react-query';

export default function SalesOrderItemsPanel(
  props: OrderItemsPanelProps<SalesOrderItem>,
) {
  const items = props.items;

  const { data: products } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProducts(),
  });

  const createNewItem = (id: number): SalesOrderItem => {
    const product = products?.find((i) => i.id === id);

    if (!product) {
      throw new Error('Product ID not found.');
    }

    return {
      itemId: product.id,
      product,
      quantity: 1,
      unit: product.unit,
      unitPrice: product.price,
      totalPrice: product.price,
    };
  };

  const alreadyAddedItemIds = new Set(items.map((i) => i.itemId));

  const itemAddSelections = products
    ?.filter(({ id }) => !alreadyAddedItemIds.has(id))
    .map((product) => (
      <AutoCompleteItem
        key={product.id}
        label={product.name}
        value={product.id}
        textTransform="capitalize"
      >
        <AutoCompleteItemPreview
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      </AutoCompleteItem>
    ));

  return (
    <Stack spacing={5}>
      <SectionText>Items</SectionText>

      <ItemsEditor
        id="items"
        name="items"
        items={items}
        getItemId={(i) => i.itemId}
        itemAddSelections={itemAddSelections}
        isDisabled={props.isDisabled}
        onItemsChange={props.onItemsChange}
        createNewItem={createNewItem}
      >
        {(onQuantityChange, onDelete) =>
          items.map((item) => (
            <SalesOrderItemEditCard
              key={item.itemId}
              item={item}
              isDisabled={props.isDisabled}
              onQuantityChange={onQuantityChange}
              onDelete={onDelete}
            />
          ))
        }
      </ItemsEditor>
    </Stack>
  );
}

function SalesOrderItemEditCard(props: OrderItemEditCardProps<SalesOrderItem>) {
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
      name={product.name}
      unit={item.unit}
      imageUrl={product.imageUrl}
      isDisabled={props.isDisabled}
      onQuantityChange={(_, quantity) => onQuantityChange(quantity)}
      onDelete={() => props.onDelete(item)}
    >
      <Text>Price: {CurrencyFormat.format(item.unitPrice)}</Text>
      <Text>Total price: {CurrencyFormat.format(item.totalPrice)}</Text>
    </ItemEditCard>
  );
}
