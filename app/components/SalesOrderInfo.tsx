'use client';

import {
  Box,
  Text,
  List,
  ListItem,
  NumberInputStepper,
  Card,
  Stack,
  Image,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

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
            <Text as={'span'} fontWeight={'bold'}>
              Status:
            </Text>{' '}
            Pending
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
            <Text as={'span'} fontWeight={'bold'}>
              Retailer:
            </Text>{' '}
            ABC
          </ListItem>

          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Location:
            </Text>{' '}
            123 Ly Tu Trong
          </ListItem>
        </List>
      </Box>
    </Stack>
  );
}
