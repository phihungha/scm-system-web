'use client';

import { getPurchaseOrdersToReceive } from '@/app/api/inventory';
import { InventoryOrderQueryParams } from '@/app/models/inventory';
import { PurchaseOrder } from '@/app/models/purchase-order';
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

function PurchaseOrderTableItem({ item }: { item: PurchaseOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>{dateToFullFormat(item.createTime)}</Td>
      <Td>
        <InventoryReceiveStatusBadge status={item.status} />
      </Td>
      <Td>
        <Link href={`/inventory/supplies-receive/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            Receive
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function PurchaseOrderTable({ items }: { items: PurchaseOrder[] | undefined }) {
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
            <PurchaseOrderTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function SuppliesReceivePage() {
  const [facilityId, setFacilityId] = useState(0);
  const [queryParams, setQueryParams] = useState<InventoryOrderQueryParams>({
    id: undefined,
    all: false,
  });

  const { data: items } = useQuery({
    queryKey: ['PurchaseOrdersToReceive', facilityId, queryParams],
    queryFn: () => getPurchaseOrdersToReceive(facilityId, queryParams),
  });

  return (
    <Stack spacing={5}>
      <InventoryOrderSearchPanel
        queryParams={queryParams}
        facilityId={facilityId}
        setQueryParams={setQueryParams}
        setFacilityId={setFacilityId}
      />

      <PurchaseOrderTable items={items} />
    </Stack>
  );
}
