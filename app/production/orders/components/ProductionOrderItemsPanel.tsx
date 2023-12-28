'use client';

import { getProducts } from '@/app/api/product';
import { AutoCompleteItemPreview } from '@/app/components/auto-complete';
import {
  ItemEditCard,
  OrderItemEditCardProps,
} from '@/app/components/item-cards';
import {
  ItemsEditor,
  OrderItemsPanelProps,
} from '@/app/components/items-editor';
import { SectionText } from '@/app/components/texts';
import { ProductionOrderItem } from '@/app/models/production-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import { Stack, Text } from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import { useQuery } from 'react-query';

export default function ProductionOrderItemsPanel(
  props: OrderItemsPanelProps<ProductionOrderItem>,
) {
  const items = props.items;

  const { data: products } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProducts(),
  });

  const createNewItem = (id: number): ProductionOrderItem => {
    const product = products?.find((i) => i.id === id);

    if (!product) {
      throw new Error('Product ID not found.');
    }

    return {
      itemId: product.id,
      product,
      quantity: 1,
      unit: product.unit,
      totalCost: product.cost,
      totalValue: product.price,
      unitValue: product.price,
      unitCost: product.cost,
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
        items={items}
        getItemId={(i) => i.itemId}
        itemAddSelections={itemAddSelections}
        isDisabled={props.isDisabled}
        onItemsChange={props.onItemsChange}
        createNewItem={createNewItem}
      >
        {(onQuantityChange, onDelete) =>
          items.map((item) => (
            <ProductionOrderItemEditCard
              key={item.itemId}
              item={item}
              isDisabled={props.isDisabled}
              onChange={onQuantityChange}
              onDelete={onDelete}
            />
          ))
        }
      </ItemsEditor>
    </Stack>
  );
}

function ProductionOrderItemEditCard(
  props: OrderItemEditCardProps<ProductionOrderItem>,
) {
  const item = props.item;
  const product = props.item.product;

  const onQuantityChange = (quantity: number) =>
    props.onChange({
      ...item,
      quantity,
      totalValue: quantity * product.price,
      totalCost: quantity * product.cost,
    });

  return (
    <ItemEditCard
      id={product.id}
      quantity={item.quantity}
      name={product.name}
      unit={item.unit}
      imageUrl={product.imageUrl}
      isDisabled={props.isDisabled}
      onChange={(_, quantity) => onQuantityChange(quantity)}
      onDelete={() => props.onDelete(item)}
    >
      <Text>Value: {CurrencyFormat.format(item.unitValue)}</Text>
      <Text>Total Value: {CurrencyFormat.format(item.totalValue)}</Text>
      <Text>Cost: {CurrencyFormat.format(item.unitCost)}</Text>
      <Text>Total Cost: {CurrencyFormat.format(item.totalCost)}</Text>
    </ItemEditCard>
  );
}
