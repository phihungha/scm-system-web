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
import { getCustomers } from '../../api/customer';
import SimpleItemSearchPanel from '../../components/SimpleItemSearchPanel';
import { Customer } from '../../models/customer';
import { SimpleItemQueryParams } from '../../models/general';

function CustomerTableItem({ item }: { item: Customer }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.phoneNumber}</Td>
      <Td>{item.contactPerson}</Td>
      <Td>
        <Link href={`/sales/customers/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function CustomerTable({ items }: { items?: Customer[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone number</Th>
            <Th>Contact person</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <CustomerTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function CustomerPage() {
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['customers', queryParams],
    queryFn: () => getCustomers(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/sales/customers/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <CustomerTable items={items} />
    </Stack>
  );
}
