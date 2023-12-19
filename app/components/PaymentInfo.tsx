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
  selectedPrice: PriceInput[];
}

export default function PaymentInfo({
  selectedPrice,
}: {
  selectedPrice: PriceInput[];
}) {
  var totalPrice: number;
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig2(),
  });
  if (config === undefined) {
    return <>Still loading...</>;
  }
  const vatRate = config.vatRate * 100;
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
                  <Text fontSize={'xl'} as={'span'}></Text>
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
                  <Text fontSize={'xl'} as={'span'}></Text>
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
            110
          </Text>
        </div>
      </Stack>
    </Stack>
  );
}
