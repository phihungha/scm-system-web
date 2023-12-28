'use client';

import {
  Button,
  Flex,
  Image,
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
import { fallbackImageUrl } from '../values';

function SupplyTableItem({ item }: { item: Supply }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>
        <Image
          boxSize="150"
          src={item.imageUrl}
          fallbackSrc={fallbackImageUrl}
        />
      </Td>
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

function SupplyTable({ items }: { items?: Supply[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Image</Th>
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
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['supplies', queryParams],
    queryFn: () => getSupplies(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
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
