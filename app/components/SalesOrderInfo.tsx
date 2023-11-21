'use client';

import {
  Box,
  Text,
  List,
  ListItem,
  Select,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';
import AutoCompleteBox from '../components/AutoCompleteBox';

export default function SalesOrderInfo() {
  return (
    <Stack spacing={{ base: 6, md: 10 }}>
      <Box as={'header'}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
        >
          #1
        </Heading>
      </Box>
      <Box>
        <Text
          fontSize={{ base: '16px', lg: '18px' }}
          color={'black.500'}
          fontWeight={'500'}
          textTransform={'uppercase'}
          mb={'4'}
        >
          Order Details
        </Text>

        <List spacing={2}>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Employee:
            </Text>{' '}
            Ha Phi Hung
          </ListItem>

          <ListItem>
            <Stack spacing={5} direction="row">
              <Text mt="7px" as={'span'} fontWeight={'bold'}>
                Status:
              </Text>
              <Select placeholder="Select option" w="auto">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
          </ListItem>

          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Create Time:
            </Text>{' '}
            12/11/2023
          </ListItem>

          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Deliver time:
            </Text>{' '}
          </ListItem>

          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Finish time:
            </Text>{' '}
          </ListItem>

          <ListItem>
            <Stack spacing={12} direction="row">
              <Text mt="7px" as={'span'} fontWeight={'bold'}>
                Retailer:
              </Text>
              <AutoCompleteBox />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack spacing={10} direction="row">
              <Text mt="7px" as={'span'} fontWeight={'bold'}>
                Location:
              </Text>
              <Input />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack spacing={5} direction="row">
              <Text mt="7px" as={'span'} fontWeight={'bold'}>
                Warehouse:
              </Text>
              <AutoCompleteBox />
            </Stack>
          </ListItem>
        </List>
      </Box>
    </Stack>
  );
}
