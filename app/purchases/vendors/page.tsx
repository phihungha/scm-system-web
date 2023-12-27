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
import { getVendors } from '../../api/vendor';
import SimpleItemSearchPanel from '../../components/SimpleItemSearchPanel';
import { SimpleItemQueryParams } from '../../models/general';
import { Vendor } from '../../models/vendor';
import { dateToDateFormat } from '../../utils/time-formats';

function VendorTableItem({ item }: { item: Vendor }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.description}</Td>
      <Td>{item.defaultLocation}</Td>
      <Td>{item.email}</Td>
      <Td>{item.phoneNumber}</Td>
      <Td>{dateToDateFormat(item.createTime)}</Td>
      <Td>{item.updateTime ? dateToDateFormat(item.updateTime) : ''}</Td>
      <Td>{item.contactPerson}</Td>
      <Td>
        <Link href={`/purchases/vendors/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

// id: number;
// name: string;
// description: string;
// location: string;
// email: string;
// phoneNumber: string;
// contactPerson: string;
function VendorTable({ items }: { items?: Vendor[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>DESCRIPTION</Th>
            <Th>location</Th>
            <Th>email</Th>
            <Th>phoneNumber</Th>
            <Td>createTime</Td>
            <Td>updateTime</Td>
            <Th>contactPerson</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => <VendorTableItem key={item.id} item={item} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function VendorPage() {
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['vendors', queryParams],
    queryFn: () => getVendors(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/purchases/vendors/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <VendorTable items={items} />
    </Stack>
  );
}
