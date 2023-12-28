'use client';

import { getPurchaseRequisition } from '@/app/api/purchase-requisition';
import { getSupplies } from '@/app/api/supply';
import { AutoCompleteItemPreview } from '@/app/components/auto-complete';
import { OrderItemEditCardProps } from '@/app/components/item-cards';
import {
  ItemsEditor,
  OrderItemsPanelProps,
} from '@/app/components/items-editor';
import { SectionText } from '@/app/components/texts';
import { PurchaseOrderItem } from '@/app/models/purchase-order';
import { PurchaseRequisitionItem } from '@/app/models/purchase-requisition';
import CurrencyFormat from '@/app/utils/currency-formats';
import {
  Box,
  Card,
  CardBody,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function PurchaseOrderItemsPanel(
  {props , purchaseRequisitionId} : {props : OrderItemsPanelProps<PurchaseOrderItem>, purchaseRequisitionId: number | undefined}
) {

  const items = props.items;
  const [requisitionItems, setRequisitionItems] = useState<PurchaseRequisitionItem[]>([]);

  const queryKey = ['purchaseRequisition', purchaseRequisitionId];
  const { data: supplies } = useQuery({
    queryKey: ['supplies'],
    queryFn: () => getSupplies(),
  });

  const { data: requisition, refetch } = useQuery({
    queryKey,
    queryFn: () => getPurchaseRequisition(purchaseRequisitionId),
    onSuccess: (resp) => {
      setRequisitionItems(resp.items);
    },
  });
  

  const createNewItem = (id: number): PurchaseOrderItem => {
    const supply = supplies?.find((i) => i.id === id);

    if (!supply) {
      throw new Error('Product ID not found.');
    }

    return {
      itemId: supply.id,
      supply,
      quantity: 1,
      unit: supply.unit,
      unitPrice: 0,
      totalPrice: 0,
      discount: 0,
      netPrice: 0,
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
        isDisabled={true}
        onItemsChange={props.onItemsChange}
        createNewItem={createNewItem}
      >
        {(onDiscountChange, onDelete) =>
          items.map((item) => (
            <PurchaseOrderItemEditCard
              key={item.itemId}
              item={item}
              isDisabled={props.isDisabled}
              onChange={onDiscountChange}
              onDelete={onDelete}
            />
          ))
        }
      </ItemsEditor>
    </Stack>
  );
}

function PurchaseOrderItemEditCard(
  props: OrderItemEditCardProps<PurchaseOrderItem>,
) {
  const item = props.item;
  const supply = props.item.supply;

  const onDiscountChange = (discount: number) =>
    props.onChange({
      ...item,
      discount,
      netPrice: item.totalPrice - item.discount,
    });

  return (
    <PurchaseItemEditCard
      id={supply.id}
      quantity={item.quantity}
      discount={item.discount}
      name={supply.name}
      unit={item.unit}
      imageUrl={supply.imageUrl}
      isDisabled={props.isDisabled}
      onChange={(_, discount) => onDiscountChange(discount)}
      onDelete={() => props.onDelete(item)}
    >
      <Text>Quantity: {item.quantity}</Text>
      <Text>Unit: {item.unit}</Text>
      <Text>Price: {CurrencyFormat.format(item.unitPrice)}</Text>
      <Text>Total price: {CurrencyFormat.format(item.totalPrice)}</Text>
      <Text>Net price: {CurrencyFormat.format(item.totalPrice)}</Text>
    </PurchaseItemEditCard>
  );
}

export interface PurchaseItemEditCardProps {
  id: number;
  quantity: number;
  discount: number;
  name: string;
  unit: string;
  imageUrl?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  onDelete: (id: number) => void;
  onChange: (id: number, quantity: number) => void;
}

export function PurchaseItemEditCard(props: PurchaseItemEditCardProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        w={{ base: '100%', sm: '200px' }}
        src={props.imageUrl}
        alt={props.name}
      />

      <CardBody>
        <Text fontWeight="bold" fontSize="xl">
          {props.name}
        </Text>

        <Stack mt={3} spacing={3}>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Text fontWeight="bold">Discount:</Text>
            <Box>
              <NumberInput
                id={`item-discount-${props.id}`}
                name={`item-discount-${props.id}`}
                isRequired={true}
                min={0}
                value={props.discount}
                isDisabled={props.isDisabled}
                onChange={(_, value) =>
                  // Don't update if number box is empty.
                  value && props.onChange(props.id, value)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Stack>

          {props.children}
        </Stack>
      </CardBody>
    </Card>
  );
}
