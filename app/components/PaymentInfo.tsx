'use client';

import {
  Box,
  Text,
  List,
  ListItem,
  Button,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { ItemInput, PriceInput } from '../types/sales';
import { useQuery } from 'react-query';
import { getConfig2 } from '../api/configApi';
import { getProduct2 } from '../api/productApi';

interface ItemsProps {
  totalPrice: number;
  totalAmount: number;
  vatAmount: number;
  vatRate: number;
}

export default function PaymentInfo(prices: ItemsProps) {
  const vatRate = prices.vatRate * 100;

  return (
    <Stack
      pt={10}
      spacing={5}
      direction={'column'}
      divider={<StackDivider borderColor="black.600" />}
    >
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box>
          <div className="flex flex-row place-content-between items-center gap-10 whitespace-nowrap">
            <Text
              pt={1}
              fontSize={'3xl'}
              color={'black.500'}
              fontWeight={'bold'}
              textTransform={'uppercase'}
              mb={'4'}
            >
              Payment Details
            </Text>
          </div>
          <List pt={5} spacing={2}>
            <ListItem>
              <Stack spacing={5} direction="row">
                <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
                  Total Price:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text fontSize={'xl'} as={'span'}>
                    {prices.totalPrice}
                  </Text>
                </div>
              </Stack>
            </ListItem>

            <ListItem>
              <Stack spacing={5} direction="row">
                <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
                  VAT rate:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text fontSize={'xl'} as={'span'}>
                    {vatRate}%
                  </Text>
                </div>
              </Stack>
            </ListItem>

            <ListItem>
              <Stack spacing={5} direction="row">
                <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
                  VAT Amount:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text fontSize={'xl'} as={'span'}>
                    {prices.vatAmount}
                  </Text>
                </div>
              </Stack>
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Stack spacing={5} direction="row">
        <Text as={'span'} fontWeight={'bold'} fontSize="xl">
          Total Amount:
        </Text>
        <div className="flex grow items-end justify-end">
          <Text as={'span'} fontWeight={'bold'} fontSize="xl">
            {prices.totalAmount}
          </Text>
        </div>
      </Stack>
    </Stack>
  );
}
