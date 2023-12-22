'use client';

import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { signInUser } from '../api/authApi';
import { LoginInput } from '../types/sales';
import SalesOrderList from './components/SalesOrderList';

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
