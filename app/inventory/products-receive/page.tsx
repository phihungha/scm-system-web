'use client';

import { getProductionOrdersToReceive } from '@/app/api/inventory';
import { InventoryOrderQueryParams } from '@/app/models/inventory';
import { ProductionOrder } from '@/app/models/production-order';
import { dateToFullFormat } from '@/app/utils/time-formats';
import {
  Button,
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
import { useQuery } from 'react-query';
import { InventoryOrderSearchPanel } from '../components/search-panels';
import { InventoryReceiveStatusBadge } from '../components/status-indicators';

function ProductionOrderTableItem({ item }: { item: ProductionOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>{dateToFullFormat(item.createTime)}</Td>
      <Td>
        <InventoryReceiveStatusBadge status={item.status} />
      </Td>
      <Td>
        <Link href={`/inventory/products-receive/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            Receive
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function ProductionOrderTable({
  items,
}: {
  items: ProductionOrder[] | undefined;
}) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Create user</Th>
            <Th>Create time</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <ProductionOrderTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function ProductsReceivePage() {
  const [facilityId, setFacilityId] = useState(0);
  const [queryParams, setQueryParams] = useState<InventoryOrderQueryParams>({
    id: undefined,
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['ProductionOrdersToReceive', facilityId, queryParams],
    queryFn: () => getProductionOrdersToReceive(facilityId, queryParams),
  });

  return (
    <Stack spacing={5}>
      <InventoryOrderSearchPanel
        queryParams={queryParams}
        facilityId={facilityId}
        setQueryParams={setQueryParams}
        setFacilityId={setFacilityId}
      />

      <ProductionOrderTable items={items} />
    </Stack>
  );
}
