'use client';

import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import SalesOrderList from './components/SalesOrderList';
import {
  Stack,
  Box,
  TabList,
  Select,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  Tabs,
  Text,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import {
  createSalesOrder,
  getAllSalesOrders,
  getSalesOrder,
} from '../api/salesApi';
import { useQuery, useMutation } from 'react-query';
import { ItemInput, LoginInput } from '../types/sales';
import { signInUser } from '../api/authApi';

export default function Sales() {
  const [startDate, setStartDate] = useState(new Date());
  const { mutate: loginUser } = useMutation(
    (userData: LoginInput) => signInUser(userData),
    {
      onSuccess: () => {
        console.log('You successfully logged in');
      },
    },
  );

  return (
    <div>
      <Stack spacing={5}>
        <Tabs>
          <TabList>
            <Tab>Sales Orders</Tab>
            <Tab>Retailers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SalesOrderList></SalesOrderList>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </div>
  );
}
