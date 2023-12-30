'use client';
import { getSupplyStock, updateSupplyStock } from '@/app/api/inventory';
import { ActionButton } from '@/app/components/buttons';
import { SimpleItemQueryParams } from '@/app/models/general';
import {
  WarehouseItemUpdateParams,
  WarehouseSupplyItem,
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
  item: WarehouseSupplyItem;
  onChange: (input: WarehouseItemUpdateParams) => void;
}

function StockTableItem({ item, onChange }: StockTableItemProps) {
  return (
    <Tr>
      <Td>{item.supplyId}</Td>
      <Td>{item.supply.name}</Td>

      <Td>
        <NumberInput
          id={`quantity-${item.supplyId}`}
          name={`quantity-${item.supplyId}`}
          allowMouseWheel
          step={50}
          isRequired={true}
          min={0}
          value={item.quantity}
          onChange={(_, value) =>
            // Don't update if number box is empty.
            value && onChange({ id: item.supplyId, quantity: value })
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
          href={`/inventory/supply-stock/${item.productionFacilityId}/${item.supplyId}`}
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
  items?: WarehouseSupplyItem[];
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
              key={item.supplyId}
              item={item}
              onChange={onChange}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function SupplyStockPage() {
  const toast = useToast();

  const [facilityId, setFacilityId] = useState(0);
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const [items, setItems] = useState<WarehouseSupplyItem[]>([]);

  const { refetch } = useQuery({
    queryKey: ['WarehouseSupplyItems', facilityId, queryParams],
    queryFn: () => getSupplyStock(facilityId, queryParams),
    onSuccess: (resp) => setItems(resp),
  });

  const [itemsToUpdate, setItemsToUpdate] = useState<
    WarehouseItemUpdateParams[]
  >([]);

  const onItemChange = (item: WarehouseItemUpdateParams) => {
    const newItems = [...items];
    const itemIdx = newItems.findIndex((i) => i.supplyId === item.id);
    newItems[itemIdx].quantity = item.quantity;
    setItems(newItems);

    const newItemsToUpdate = itemsToUpdate.filter((i) => i.id !== item.id);
    setItemsToUpdate([...newItemsToUpdate, item]);
  };

  const { mutate: updateStock, isLoading } = useMutation(
    () => updateSupplyStock({ facilityId, items: itemsToUpdate }),
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
