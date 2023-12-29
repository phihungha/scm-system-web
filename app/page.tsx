'use client';
import {
  ApprovalStatusBadge,
  OrderStatusBadge,
  PaymentStatusBadge,
} from '@/app/components/status-indicators';
import { SectionText } from '@/app/components/texts';
import { ProductionOrder } from '@/app/models/production-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import {
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { SalesOrder } from '../app/models/sales-order';
import { GetHome } from './api/home';
import { LoadingPage } from './components/spinners';
import { PurchaseOrder } from './models/purchase-order';
export default function Home() {
  const { data: items } = useQuery({
    queryKey: ['Home'],
    queryFn: () => GetHome(),
  });
  if (items === undefined) {
    return <LoadingPage />;
  }
  return (
    <main className="w-full">
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Our company is expanding, you could be too.
      </chakra.h1>
      <SimpleGrid w="full" p={10} columns={3} spacing={10}>
        <Stat>
          <StatLabel>Active Purchase Order Count</StatLabel>
          <StatNumber>{items.activePurchaseOrderCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Active Production Order Count</StatLabel>
          <StatNumber>{items.activeProductionOrderCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Active Sales Order Count</StatLabel>
          <StatNumber>{items.activeSalesOrderCount}</StatNumber>
        </Stat>
      </SimpleGrid>
      <SimpleGrid w="full" p={10} columns={3} spacing={10}>
        <Stack gap={10} pt={10}>
          <SectionText>Active Purchase Orders</SectionText>
          <PurchaseOrderTable items={items.activePurchaseOrders} />
        </Stack>
        <Stack gap={10} pt={10}>
          <SectionText>Active Production Orders</SectionText>
          <ProductionOrderTable items={items.activeProductionOrders} />
        </Stack>
        <Stack gap={10} pt={10}>
          <SectionText>Active Sales Orders</SectionText>
          <SalesOrderTable items={items.activeSalesOrders} />
        </Stack>
      </SimpleGrid>
    </main>
  );
}

function PurchaseOrderTableItem({ item }: { item: PurchaseOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>
        <OrderStatusBadge status={item.status}></OrderStatusBadge>
      </Td>
      <Td>
        <PaymentStatusBadge status={item.paymentStatus}></PaymentStatusBadge>
      </Td>
      <Td>{CurrencyFormat.format(item.discountAmount)}</Td>
      <Td>{CurrencyFormat.format(item.discountSubtotal)}</Td>
    </Tr>
  );
}

function PurchaseOrderTable({ items: items }: { items?: PurchaseOrder[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Create User</Th>
            <Th>Status</Th>
            <Th>Payment status</Th>
            <Th>Discount Amount</Th>
            <Th>Total Discount</Th>
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

function ProductionOrderTableItem({ item }: { item: ProductionOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>
        <OrderStatusBadge status={item.status}></OrderStatusBadge>
      </Td>
      <Td>
        <ApprovalStatusBadge status={item.approvalStatus}></ApprovalStatusBadge>
      </Td>
      <Td>{CurrencyFormat.format(item.totalCost)}</Td>
      <Td>{CurrencyFormat.format(item.totalProfit)}</Td>
      <Td>{CurrencyFormat.format(item.totalValue)}</Td>
    </Tr>
  );
}

function ProductionOrderTable({
  items: items,
}: {
  items: ProductionOrder[] | undefined;
}) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Create User</Th>
            <Th>Status</Th>
            <Th>Approval status</Th>
            <Th>Total Cost</Th>
            <Th>Total Profit</Th>
            <Th>Total Value</Th>
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

function SalesOrderTableItem({ item }: { item: SalesOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.productionFacility?.name ?? '<None>'}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>
        <OrderStatusBadge status={item.status}></OrderStatusBadge>
      </Td>
      <Td>
        <PaymentStatusBadge status={item.paymentStatus}></PaymentStatusBadge>
      </Td>
      <Td>{CurrencyFormat.format(item.totalAmount)}</Td>
      <Td>{CurrencyFormat.format(item.remainingAmount)}</Td>
    </Tr>
  );
}

function SalesOrderTable({ items: items }: { items?: SalesOrder[] }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Create User</Th>
            <Th>Facility</Th>
            <Th>Status</Th>
            <Th>Payment status</Th>
            <Th>Total</Th>
            <Th>Remaining</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <SalesOrderTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
