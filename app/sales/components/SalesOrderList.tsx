'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  InputGroup,
  Stack,
  Tfoot,
  TableContainer,
  ButtonGroup,
  Button,
  IconButton,
  Flex,
  InputRightElement,
  Input,
  Text,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { getAllSalesOrders } from '../../api/salesApi';
import { ISaleResponse } from '../../types/sales';
import { useQuery } from 'react-query';
import SalesListItem from './SalesListItem';
import { FiSearch } from 'react-icons/fi';
import React from 'react';

export default function SalesOrderList() {
  const { data: sales } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getAllSalesOrders(),
  });

  const router = useRouter();
  const [searchBy, setSearchBy] = React.useState('');
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const [status, setStatus] = React.useState('');
  const onCreate = async () => {
    router.replace('/sales/ordercreate');
  };

  return (
    <Stack spacing={10}>
      <div>
        <InputGroup>
          <InputRightElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputRightElement>
          <Input />
        </InputGroup>
      </div>
      <Grid w={550} templateColumns="repeat(2, 1fr)" gap={5}>
        <GridItem>
          <Text mt={1.5} fontSize="lg">
            Search by:
          </Text>
        </GridItem>
        <GridItem>
          <Select
            value={searchBy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchBy(e.target.value)
            }
            w="auto"
          >
            <option value="Id">Id</option>
            <option value="CustomerName">Customer Name</option>
            <option value="CreateUserName">CreateUserName</option>
            <option value="ProductionFacilityName">
              Production Facility Name
            </option>
            <option value="">None</option>
          </Select>
        </GridItem>

        <GridItem>
          <Text mt={1.5} fontSize="lg">
            Payment Status:
          </Text>
        </GridItem>
        <GridItem>
          <Select
            value={paymentStatus}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPaymentStatus(e.target.value)
            }
            w="auto"
          >
            <option value="Due">Due</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="">None</option>
          </Select>
        </GridItem>

        <GridItem>
          <Text mt={1.5} fontSize="lg">
            Status:
          </Text>
        </GridItem>
        <GridItem>
          <Select
            value={status}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStatus(e.target.value)
            }
            w="auto"
          >
            <option value="">None</option>
            <option value="Processing">Processing</option>
            <option value="Executing">Executing</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
            <option value="Returned">Returned</option>
            <option value="WaitingAcceptance">Waiting Acceptance</option>
          </Select>
        </GridItem>
      </Grid>

      <Flex justifyContent="right">
        <ButtonGroup size="md" isAttached variant="outline">
          <Button onClick={onCreate}>Create</Button>
          <IconButton icon={<FiPlus />} />
        </ButtonGroup>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Create User</Th>
              <Th>Create Time</Th>
              <Th>Payment Status</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales?.map((sale: ISaleResponse) => (
              <SalesListItem key={sale.id} sales={sale} />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th>Create User</Th>
              <Th>Create Time</Th>
              <Th>Payment Status</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Stack>
  );
}
