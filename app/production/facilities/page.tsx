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
import { getProductionFacilities } from '../../api/production-facility';
import SimpleItemSearchPanel from '../../components/SimpleItemSearchPanel';
import { SimpleItemQueryParams } from '../../models/general';
import { ProductionFacility } from '../../models/production-facility';

function FacilityTableItem({ item }: { item: ProductionFacility }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.location}</Td>
      <Td>{item.email}</Td>
      <Td>{item.phoneNumber}</Td>
      <Td>
        <Link href={`/production/facilities/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function FacilityTable({ items }: { items?: ProductionFacility[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Location</Th>
            <Th>Email</Th>
            <Th>PhoneNumber</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <FacilityTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function ProductionFacilitiesPage() {
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['productionFacilities', queryParams],
    queryFn: () => getProductionFacilities(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SimpleItemSearchPanel
        queryParams={queryParams}
        onQueryParamsChange={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/production/facilities/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <FacilityTable items={items} />
    </Stack>
  );
}
