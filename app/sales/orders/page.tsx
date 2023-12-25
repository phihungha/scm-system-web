'use client';

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
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { getSalesOrders } from '../../api/sales-order';
import {
  SalesOrder,
  SalesOrderQueryParams,
  SalesOrderSearchCriteria,
} from '../../models/sales-order';

function SalesOrderTableItem({ item }: { item: SalesOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.customer.name}</Td>
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
      <Td>
        <Link href={`/sales/orders/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function SalesOrderTable({
  items: items,
}: {
  items: SalesOrder[] | undefined;
}) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer name</Th>
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

interface SalesOrderSearchPanelProps {
  queryParams: SalesOrderQueryParams;
  setQueryParams: (params: SalesOrderQueryParams) => void;
}

function SalesOrderSearchPanel({
  queryParams,
  setQueryParams,
}: SalesOrderSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm);
  const [searchCriteria, setSearchCriteria] = useState(
    queryParams.searchCriteria as string,
  );

  const onSearchClick = () =>
    setQueryParams({
      ...queryParams,
      searchTerm,
      searchCriteria: searchCriteria as SalesOrderSearchCriteria,
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
          <option value="CustomerName">Customer Name</option>
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

export default function SalesOrdersPage() {
  const [queryParams, setQueryParams] = useState<SalesOrderQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    status: ['Processing', 'Executing', 'WaitingAcceptance', 'Completed'],
    paymentStatus: ['Pending', 'Due'],
  });

  const { data: items } = useQuery({
    queryKey: ['salesOrders', queryParams],
    queryFn: () => getSalesOrders(queryParams),
  });

  return (
    <Stack spacing={10}>
      <SalesOrderSearchPanel
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/sales/orders/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <SalesOrderTable items={items} />
    </Stack>
  );
}
