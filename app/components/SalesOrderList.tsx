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
import ItemCard from './ItemCard';

export default function SalesOrderList() {
  return (
    <Stack spacing={10}>
      <Flex justifyContent="right">
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button>Create</Button>
          <IconButton icon={<FiPlus />} />
        </ButtonGroup>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th isNumeric>Total</Th>
              <Th>Status</Th>
              <Th>Create Time</Th>
              <Th>Employee</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td isNumeric>1000000</Td>
              <Td>Pending</Td>
              <Td>9/11/2023</Td>
              <Td>Ha Phi Hung</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td isNumeric>2000000</Td>
              <Td>Complete</Td>
              <Td>10/11/2023</Td>
              <Td>Le Quang Trung</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td isNumeric>3000000</Td>
              <Td>Pending</Td>
              <Td>11/11/2023</Td>
              <Td>Ha Phi Hung</Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td isNumeric>3000000</Td>
              <Td>Pending</Td>
              <Td>11/11/2023</Td>
              <Td>Ha Phi Hung</Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td isNumeric>3000000</Td>
              <Td>Pending</Td>
              <Td>11/11/2023</Td>
              <Td>Ha Phi Hung</Td>
            </Tr>
            <Tr>
              <Td>6</Td>
              <Td isNumeric>3000000</Td>
              <Td>Pending</Td>
              <Td>11/11/2023</Td>
              <Td>Ha Phi Hung</Td>
            </Tr>
            <Tr>
              <Td>7</Td>
              <Td isNumeric>3000000</Td>
              <Td>Pending</Td>
              <Td>11/11/2023</Td>
              <Td>Ha Phi Hung</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th isNumeric>Total</Th>
              <Th>Status</Th>
              <Th>Create Time</Th>
              <Th>Employee</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Stack>
  );
}
