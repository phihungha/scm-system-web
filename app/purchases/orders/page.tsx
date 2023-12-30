'use client';

import { getPurchaseOrders } from '@/app/api/purchase-order';
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from '@/app/components/status-indicators';
import { OrderStatus } from '@/app/models/order';
import { PaymentStatus } from '@/app/models/trans-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
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
import { FiSearch } from 'react-icons/fi';
import { useQuery } from 'react-query';
import {
  PurchaseOrder,
  PurchaseOrderQueryParams,
  PurchaseOrderSearchCriteria,
} from '../../models/purchase-order';

function PurchaseOrderTableItem({ item }: { item: PurchaseOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.vendor.name}</Td>
      <Td>{item.productionFacility?.name ?? '<None>'}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>
        <OrderStatusBadge status={item.status}></OrderStatusBadge>
      </Td>
      <Td>
        <PaymentStatusBadge status={item.paymentStatus}></PaymentStatusBadge>
      </Td>
      <Td>{CurrencyFormat.format(item.discountAmount)}</Td>
      <Td>{CurrencyFormat.format(item.discountSubtotal)}</Td>
      <Td>
        <Link href={`/purchases/orders/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
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
            <Th>Vendor name</Th>
            <Th>Create User</Th>
            <Th>Facility</Th>
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

interface PurchaseOrderSearchPanelProps {
  queryParams: PurchaseOrderQueryParams;
  setQueryParams: (params: PurchaseOrderQueryParams) => void;
}

function SalesOrderSearchPanel({
  queryParams,
  setQueryParams,
}: PurchaseOrderSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm);
  const [searchCriteria, setSearchCriteria] = useState(
    queryParams.searchCriteria as string,
  );

  const onSearchClick = () =>
    setQueryParams({
      ...queryParams,
      searchTerm,
      searchCriteria: searchCriteria as PurchaseOrderSearchCriteria,
    });

  const onStatusFiltersChange = (input: (string | number)[]) =>
    setQueryParams({ ...queryParams, status: input as OrderStatus[] });

  const onPaymentStatusFiltersChange = (input: (string | number)[]) =>
    setQueryParams({ ...queryParams, paymentStatus: input as PaymentStatus[] });

  return (
    <Stack spacing={5}>
      <HStack spacing={3}>
        <InputGroup>
          <Input
            placeholder="Enter something to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchClick();
              }
            }}
          />
          <InputRightAddon>
            <IconButton
              mx={5}
              aria-label="Search"
              icon={<FiSearch color="gray.300" />}
              onClick={onSearchClick}
            />
          </InputRightAddon>
        </InputGroup>

        <Select
          w={330}
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        >
          <option value="Id">ID</option>
          <option value="VendorName">Vendor Name</option>
          <option value="CreateUserName">Create user name</option>
          <option value="ProductionFacilityName">
            Production facility name
          </option>
        </Select>
      </HStack>

      <Grid templateColumns="150px 1fr" gap={5}>
        <GridItem>
          <Text>Statuses</Text>
        </GridItem>
        <GridItem>
          <CheckboxGroup
            value={queryParams.status}
            onChange={onStatusFiltersChange}
          >
            <Flex gap={4} wrap="wrap">
              <Checkbox value="Processing">
                <OrderStatusBadge status="Processing" />
              </Checkbox>
              <Checkbox value="Executing">
                <OrderStatusBadge status="Executing" />
              </Checkbox>
              <Checkbox value="WaitingAcceptance">
                <OrderStatusBadge status="WaitingAcceptance" />
              </Checkbox>
              <Checkbox value="Completed">
                <OrderStatusBadge status="Completed" />
              </Checkbox>
              <Checkbox value="Canceled">
                <OrderStatusBadge status="Canceled" />
              </Checkbox>
              <Checkbox value="Returned">
                <OrderStatusBadge status="Returned" />
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </GridItem>

        <GridItem>
          <Text>Payment Statuses</Text>
        </GridItem>
        <GridItem>
          <CheckboxGroup
            value={queryParams.paymentStatus}
            onChange={onPaymentStatusFiltersChange}
          >
            <Flex gap={4} wrap="wrap">
              <Checkbox value="Pending">
                <PaymentStatusBadge status="Pending" />
              </Checkbox>
              <Checkbox value="Due">
                <PaymentStatusBadge status="Due" />
              </Checkbox>
              <Checkbox value="Completed">
                <PaymentStatusBadge status="Completed" />
              </Checkbox>
              <Checkbox value="Canceled">
                <PaymentStatusBadge status="Canceled" />
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </GridItem>
      </Grid>
    </Stack>
  );
}

export default function PurchasesOrdersPage() {
  const [queryParams, setQueryParams] = useState<PurchaseOrderQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    status: ['Processing', 'Executing', 'WaitingAcceptance', 'Completed'],
    paymentStatus: ['Pending', 'Due'],
  });

  const { data: items } = useQuery({
    queryKey: ['purchaseOrders', queryParams],
    queryFn: () => getPurchaseOrders(queryParams),
  });

  return (
    <Stack spacing={5}>
      <SalesOrderSearchPanel
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <PurchaseOrderTable items={items} />
    </Stack>
  );
}
