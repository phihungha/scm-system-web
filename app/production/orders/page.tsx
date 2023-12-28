'use client';

import { getProductionOrders } from '@/app/api/production-order';
import {
  ApprovalStatusBadge,
  OrderStatusBadge,
} from '@/app/components/status-indicators';
import { ApprovalStatus } from '@/app/models/general';
import { OrderStatus } from '@/app/models/order';
import {
  ProductionOrder,
  ProductionOrderQueryParams,
  ProductionOrderSearchCriteria,
} from '@/app/models/production-order';
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

function ProductionOrderTableItem({ item }: { item: ProductionOrder }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.productionFacility?.name ?? '<None>'}</Td>
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
      <Td>
        <Link href={`/production/orders/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
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
            <Th>Facility</Th>
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

interface ProductionOrderSearchPanelProps {
  queryParams: ProductionOrderQueryParams;
  setQueryParams: (params: ProductionOrderQueryParams) => void;
}

function ProductionOrderSearchPanel({
  queryParams,
  setQueryParams,
}: ProductionOrderSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm);
  const [searchCriteria, setSearchCriteria] = useState(
    queryParams.searchCriteria as string,
  );

  const onSearchClick = () =>
    setQueryParams({
      ...queryParams,
      searchTerm,
      searchCriteria: searchCriteria as ProductionOrderSearchCriteria,
    });

  const onStatusFiltersChange = (input: (string | number)[]) =>
    setQueryParams({ ...queryParams, status: input as OrderStatus[] });

  const onApprovalStatusFiltersChange = (input: (string | number)[]) =>
    setQueryParams({
      ...queryParams,
      approvalStatus: input as ApprovalStatus[],
    });

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
          <Text>Approval Statuses</Text>
        </GridItem>
        <GridItem>
          <CheckboxGroup
            value={queryParams.approvalStatus}
            onChange={onApprovalStatusFiltersChange}
          >
            <Flex gap={4} wrap="wrap">
              <Checkbox value="Approved">
                <ApprovalStatusBadge status="Approved" />
              </Checkbox>
              <Checkbox value="PendingApproval">
                <ApprovalStatusBadge status="PendingApproval" />
              </Checkbox>
              <Checkbox value="Rejected">
                <ApprovalStatusBadge status="Rejected" />
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </GridItem>
      </Grid>
    </Stack>
  );
}

export default function SalesOrdersPage() {
  const [queryParams, setQueryParams] = useState<ProductionOrderQueryParams>({
    searchTerm: '',
    searchCriteria: 'Id',
    status: ['Processing', 'Executing', 'WaitingAcceptance'],
    approvalStatus: ['Approved', 'PendingApproval'],
  });

  const { data: items } = useQuery({
    queryKey: ['ProductionOrders', queryParams],
    queryFn: () => getProductionOrders(queryParams),
  });

  return (
    <Stack spacing={5}>
      <ProductionOrderSearchPanel
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/production/orders/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <ProductionOrderTable items={items} />
    </Stack>
  );
}
