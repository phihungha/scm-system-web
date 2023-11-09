'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiSearch, FiCalendar } from 'react-icons/fi';
import SalesOrderList from '../components/SalesOrderList';
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

export default function Sales() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <Stack spacing={5}>
        <div>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputRightElement>
            <Input />
          </InputGroup>
        </div>

        <Stack spacing={4} direction="row">
          <Text mt="7px" fontSize="md">
            Search by:
          </Text>
          <Select placeholder="Select option" w="auto">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>
        <Stack spacing={4} direction="row">
          <Text mt="5px" fontSize="md">
            Create on:
          </Text>
          <Box w="150px" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              icon={FiCalendar}
            />
          </Box>
        </Stack>

        <Stack spacing={10} direction="row">
          <Text mt="7px" fontSize="md">
            Status:
          </Text>
          <Select placeholder="Select option" w="auto">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>

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
