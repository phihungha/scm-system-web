'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Tfoot,
  TableContainer,
  ButtonGroup,
  Button,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { getAllSalesOrders } from '../api/salesApi';
import { ISaleResponse, ISalesResponse } from '../types/sales';
import { useQuery } from 'react-query';
import SalesListItem from '../sales/components/SalesListItem';

export default function SalesOrderList() {
  const {
    data: sales,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getAllSalesOrders(),
  });

console.log(sales);
  const router = useRouter();
  const onCreate = async () => {
    router.replace('/sales/ordercreate');
  };

  return (
    <Stack spacing={10}>
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
              <Th>Payment Status</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Create Time</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales?.map((sale: ISaleResponse) => (
              <SalesListItem sales={sale} />
            ))}
          </Tbody>
          <Tfoot>
          <Tr>
              <Th>Id</Th>
              <Th>Create User</Th>
              <Th>Payment Status</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Create Time</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Stack>
  );
}
