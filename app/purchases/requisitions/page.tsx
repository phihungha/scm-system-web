'use client';

import { getPurchaseRequisitions } from '@/app/api/purchase-requisition';
import {
  ApprovalStatusBadge,
  RequisitionStatusBadge,
} from '@/app/components/status-indicators';
import { ApprovalStatus } from '@/app/models/general';
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
import {
  PurchaseRequisition,
  PurchaseRequisitionCriteria,
  PurchaseRequisitionQueryParams,
  PurchaseRequisitionStatus,
} from '../../models/purchase-requisition';

function PurchaseRequisitionTableItem({ item }: { item: PurchaseRequisition }) {
  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.vendor?.name ?? '<None>'}</Td>
      <Td>{item.productionFacility?.name ?? '<None>'}</Td>
      <Td>{item.createUser.name}</Td>
      <Td>
        <RequisitionStatusBadge status={item.status}></RequisitionStatusBadge>
      </Td>
      <Td>
        <ApprovalStatusBadge status={item.approvalStatus}></ApprovalStatusBadge>
      </Td>
      <Td>{CurrencyFormat.format(item.totalAmount)}</Td>
      <Td>
        <Link href={`/purchases/requisitions/${item.id}`}>
          <Button variant="solid" colorScheme="blue">
            View
          </Button>
        </Link>
      </Td>
    </Tr>
  );
}

function PurchaseRequisitionTable({
  items: items,
}: {
  items?: PurchaseRequisition[];
}) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Vendor</Th>
            <Th>Facility</Th>
            <Th>Create User</Th>
            <Th>Status</Th>
            <Th>Approval status</Th>
            <Th>Total</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <PurchaseRequisitionTableItem key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

interface PurchaseRequisitionSearchPanelProps {
  queryParams: PurchaseRequisitionQueryParams;
  setQueryParams: (params: PurchaseRequisitionQueryParams) => void;
}

function RequisitionSearchPanel({
  queryParams,
  setQueryParams,
}: PurchaseRequisitionSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm);
  const [searchCriteria, setSearchCriteria] = useState(
    queryParams.searchCriteria as string,
  );

  const onSearchClick = () =>
    setQueryParams({
      ...queryParams,
      searchTerm,
      searchCriteria: searchCriteria as PurchaseRequisitionCriteria,
    });

  const onStatusFiltersChange = (input: (string | number)[]) =>
    setQueryParams({
      ...queryParams,
      status: input as PurchaseRequisitionStatus[],
    });

  const onPaymentStatusFiltersChange = (input: (string | number)[]) =>
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
                <RequisitionStatusBadge status="Processing" />
              </Checkbox>
              <Checkbox value="Purchasing">
                <RequisitionStatusBadge status="Purchasing" />
              </Checkbox>
              <Checkbox value="Delayed">
                <RequisitionStatusBadge status="Delayed" />
              </Checkbox>
              <Checkbox value="Completed">
                <RequisitionStatusBadge status="Completed" />
              </Checkbox>
              <Checkbox value="Canceled">
                <RequisitionStatusBadge status="Canceled" />
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
            onChange={onPaymentStatusFiltersChange}
          >
            <Flex gap={4} wrap="wrap">
              <Checkbox value="Approved">
                <ApprovalStatusBadge status="Approved" />
              </Checkbox>
              <Checkbox value="Rejected">
                <ApprovalStatusBadge status="Rejected" />
              </Checkbox>
              <Checkbox value="PendingApproval">
                <ApprovalStatusBadge status="PendingApproval" />
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </GridItem>
      </Grid>
    </Stack>
  );
}

export default function PurchaseRequisitionsPage() {
  const [queryParams, setQueryParams] =
    useState<PurchaseRequisitionQueryParams>({
      searchTerm: '',
      searchCriteria: 'Id',
      status: ['Processing', 'Purchasing', 'Delayed'],
      approvalStatus: ['Approved', 'PendingApproval'],
    });

  const { data: items } = useQuery({
    queryKey: ['purchaseRequisition', queryParams],
    queryFn: () => getPurchaseRequisitions(queryParams),
  });

  return (
    <Stack spacing={5}>
      <RequisitionSearchPanel
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <Flex justifyContent="right">
        <Link href="/purchases/requisitions/create">
          <Button variant="solid" colorScheme="blue" leftIcon={<FiPlus />}>
            Create
          </Button>
        </Link>
      </Flex>

      <PurchaseRequisitionTable items={items} />
    </Stack>
  );
}
