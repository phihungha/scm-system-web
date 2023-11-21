'use client';
import React from 'react';
import SalesOrderInfo from '../../components/SalesOrderInfo';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import { Stack, StackDivider, Button } from '@chakra-ui/react';

export default function SalesOrder() {
  return (
    <div className="p-5">
      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={'column'}
        divider={<StackDivider borderColor="gray.600" />}
      >
        <SalesOrderInfo />
        <ItemsInfo />
        <PaymentInfo />
      </Stack>
      <div className="flex flex-row justify-end gap-10 pt-10">
        <Button variant="solid" colorScheme="red">
          Cancel
        </Button>
        <Button variant="solid" colorScheme="blue">
          Update
        </Button>
      </div>
    </div>
  );
}
