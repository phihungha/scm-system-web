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
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { getUsers } from '../api/user';
import SimpleItemSearchPanel from '../components/SimpleItemSearchPanel';
import { SimpleItemQueryParams } from '../models/general';
import { User } from '../models/user';
import { fallbackImageUrl } from '../values';

function UserTableItem({ item }: { item: User }) {
  return (
    <Tr>
      <Td maxWidth={200}>
        <Text overflow="hidden" textOverflow="ellipsis">
          {item.id}
        </Text>
      </Td>
      <Td>
        <Image
          boxSize="150"
          objectFit="contain"
          src={item.imageUrl}
          alt={item.name}
          fallbackSrc={fallbackImageUrl}
        />
      </Td>
      <Td>{item.name}</Td>
      <Td>{item.email ?? 'None'}</Td>
      <Td>{item.phoneNumber ?? 'None'}</Td>
      <Td>{item.productionFacility?.name ?? 'None'}</Td>
      <Td>
        <Link href={`/users/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function UserTable({ items }: { items?: User[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone number</Th>
            <Th>Production facility</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => <UserTableItem key={item.id} item={item} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function UsersPage() {
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['supplies', queryParams],
    queryFn: () => getUsers(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/users/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <UserTable items={items} />
    </Stack>
  );
}
