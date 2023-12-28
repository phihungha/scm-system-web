'use client';

import { getSupplies } from '@/app/api/supply';
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
import { PurchaseRequisitionItem } from '@/app/models/purchase-requisition';
import CurrencyFormat from '@/app/utils/currency-formats';
import { Stack, Text } from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import { useQuery } from 'react-query';

export default function PurchaseRequisitionItemsPanel(
  props: OrderItemsPanelProps<PurchaseRequisitionItem>,
) {
  const items = props.items;

  const { data: supplies } = useQuery({
    queryKey: ['supplies'],
    queryFn: () => getSupplies(),
  });

  const createNewItem = (id: number): PurchaseRequisitionItem => {
    const supply = supplies?.find((i) => i.id === id);

    if (!supply) {
      throw new Error('Supply ID not found.');
    }
    return {
      itemId: id,
      supply,
      quantity: 1,
      unit: supply.unit,
      unitPrice: supply.price,
      totalPrice: supply.price,
    };
  };

  const alreadyAddedItemIds = new Set(items.map((i) => i.itemId));

  const itemAddSelections = supplies
    ?.filter(({ id }) => !alreadyAddedItemIds.has(id))
    .map((supply) => (
      <AutoCompleteItem
        key={supply.id}
        label={supply.name}
        value={supply.id}
        textTransform="capitalize"
      >
        <AutoCompleteItemPreview
          name={supply.name}
          price={supply.price}
          imageUrl={supply.imageUrl}
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
            <PurchaseRequisitionItemEditCard
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

function PurchaseRequisitionItemEditCard(
  props: OrderItemEditCardProps<PurchaseRequisitionItem>,
) {
  const item = props.item;
  const supply = props.item.supply;

  const onQuantityChange = (quantity: number) =>
    props.onChange({
      ...item,
      quantity,
      totalPrice: quantity * item.unitPrice,
    });

  return (
    <ItemEditCard
      id={item.itemId}
      quantity={item.quantity}
      name={supply.name}
      unit={item.unit}
      imageUrl={supply.imageUrl}
      isDisabled={props.isDisabled}
      onChange={(_, quantity) => onQuantityChange(quantity)}
      onDelete={() => props.onDelete(item)}
    >
      <Text>Price: {CurrencyFormat.format(item.unitPrice)}</Text>
      <Text>Total price: {CurrencyFormat.format(item.totalPrice)}</Text>
    </ItemEditCard>
  );
}
