'use client';

import {
  Button,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { getSupplies } from '../api/supply';
import SimpleItemSearchPanel from '../components/SimpleItemSearchPanel';
import { SimpleItemQueryParams } from '../models/general';
import { Supply } from '../models/supply';
import CurrencyFormat from '../utils/currency-formats';

function SupplyTableItem({ item }: { item: Supply }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.vendor.name}</Td>
      <Td>{item.expirationMonth}</Td>
      <Td>{CurrencyFormat.format(item.price)}</Td>
      <Td>
        <Link href={`/supplies/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function SupplyTable({ items }: { items: Supply[] | undefined }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Vendor</Th>
            <Th>Expiration month</Th>
            <Th>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => <SupplyTableItem key={item.id} item={item} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function SuppliesPage() {
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
  });

  const { data: items } = useQuery({
    queryKey: ['supplies', queryParams],
    queryFn: () => getSupplies(queryParams),
  });

  return (
    <Stack spacing={10}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/supplies/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <SupplyTable items={items} />
    </Stack>
  );
}
