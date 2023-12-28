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
import { getProducts } from '../api/product';
import SimpleItemSearchPanel from '../components/SimpleItemSearchPanel';
import { SimpleItemQueryParams } from '../models/general';
import { Product } from '../models/product';
import CurrencyFormat from '../utils/currency-formats';
import { fallbackImageUrl } from '../values';

function ProductTableItem({ item }: { item: Product }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>
        <Image
          boxSize="150"
          objectFit="contain"
          src={item.imageUrl}
          fallbackSrc={fallbackImageUrl}
        />
      </Td>
      <Td>{item.name}</Td>
      <Td>{item.expirationMonth}</Td>
      <Td>{CurrencyFormat.format(item.cost)}</Td>
      <Td>{CurrencyFormat.format(item.price)}</Td>
      <Td>
        <Link href={`/products/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function ProductTable({ items }: { items?: Product[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Expiration month</Th>
            <Th>Production cost</Th>
            <Th>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => <ProductTableItem key={item.id} item={item} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function ProductsPage() {
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/products/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <ProductTable items={items} />
    </Stack>
  );
}
