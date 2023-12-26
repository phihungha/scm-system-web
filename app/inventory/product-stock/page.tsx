'use client';

import { getProductStock, updateProductStock } from '@/app/api/inventory';
import { ActionButton } from '@/app/components/buttons';
import { SimpleItemQueryParams } from '@/app/models/general';
import {
  WarehouseItemUpdateParams,
  WarehouseProductItem,
} from '@/app/models/inventory';
import CurrencyFormat from '@/app/utils/currency-formats';
import { showSuccessToast } from '@/app/utils/toast-messages';
import {
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { WarehouseItemSearchPanel } from '../components/search-panels';

interface StockTableItemProps {
  item: WarehouseProductItem;
  onChange: (input: WarehouseItemUpdateParams) => void;
}

function StockTableItem({ item, onChange }: StockTableItemProps) {
  return (
    <Tr>
      <Td>{item.productId}</Td>
      <Td>{item.product.name}</Td>

      <Td>
        <NumberInput
          id={`quantity-${item.productId}`}
          name={`quantity-${item.productId}`}
          isRequired={true}
          min={1}
          value={item.quantity}
          onChange={(_, value) =>
            // Don't update if number box is empty.
            value && onChange({ id: item.productId, quantity: value })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Td>

      <Td>{item.unit}</Td>
      <Td>{CurrencyFormat.format(item.unitValue)}</Td>

      <Td>
        <Link
          href={`/product-stock/${item.productionFacilityId}/${item.productId}`}
        >
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

interface StockTableProps {
  items?: WarehouseProductItem[];
  onChange: (item: WarehouseItemUpdateParams) => void;
}

function StockTable({ items, onChange }: StockTableProps) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Unit</Th>
            <Th>Value</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <StockTableItem
              key={item.productId}
              item={item}
              onChange={onChange}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function SuppliesPage() {
  const toast = useToast();

  const [facilityId, setFacilityId] = useState(0);
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const [items, setItems] = useState<WarehouseProductItem[]>([]);

  const { refetch } = useQuery({
    queryKey: ['WarehouseProductItems', facilityId, queryParams],
    queryFn: () => getProductStock(facilityId, queryParams),
    onSuccess: (resp) => setItems(resp),
  });

  const [itemsToUpdate, setItemsToUpdate] = useState<
    WarehouseItemUpdateParams[]
  >([]);

  const onItemChange = (item: WarehouseItemUpdateParams) => {
    const newItems = [...items];
    const itemIdx = newItems.findIndex((i) => i.productId === item.id);
    newItems[itemIdx].quantity = item.quantity;
    setItems(newItems);

    const newItemsToUpdate = itemsToUpdate.filter((i) => i.id !== item.id);
    setItemsToUpdate([...newItemsToUpdate, item]);
  };

  const { mutate: updateStock, isLoading } = useMutation(
    () => updateProductStock({ facilityId, items: itemsToUpdate }),
    {
      onSuccess: () => {
        showSuccessToast(toast, { title: 'Stock updated!' });
      },
    },
  );

  return (
    <Stack gap={5}>
      <WarehouseItemSearchPanel
        facilityId={facilityId}
        onFacilityIdChange={setFacilityId}
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
      />

      <Flex justify="end" mt={5} gap={5}>
        <ActionButton size="lg" onClick={() => refetch()}>
          Reset
        </ActionButton>

        <ActionButton
          size="lg"
          colorScheme="blue"
          isLoading={isLoading}
          onClick={() => updateStock()}
        >
          Update
        </ActionButton>
      </Flex>

      <StockTable items={items} onChange={onItemChange} />
    </Stack>
  );
}
