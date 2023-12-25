'use client';

import { getConfig } from '@/app/api/config';
import { getCustomers } from '@/app/api/customer';
import { getProductionFacilities } from '@/app/api/production-facility';
import { createSalesOrder } from '@/app/api/sales-order';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import { NormalSpinner } from '@/app/components/spinners';
import {
  FormLabelText,
  FormValueText,
  SubtitleText,
  TitleText,
} from '@/app/components/texts';
import { Customer } from '@/app/models/customer';
import { ProductionFacility } from '@/app/models/production-facility';
import { SalesOrderItem } from '@/app/models/sales-order';
import { showSuccessToast } from '@/app/utils/toast-messages';
import {
  Box,
  Flex,
  Grid,
  Input,
  Link,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import SalesOrderItemsPanel from '../components/SalesOrderItemsPanel';
import SalesOrderTotalsPanel from '../components/SalesOrderTotalsPanel';

export default function SalesOrderCreatePage() {
  const toast = useToast();
  const router = useRouter();

  const [facility, setFacility] = useState<ProductionFacility | undefined>();
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [toLocation, setToLocation] = useState('');
  const [items, setItems] = useState<SalesOrderItem[]>([]);

  const { mutate: createOrder, isLoading } = useMutation(
    () =>
      createSalesOrder({
        items,
        customerId: customer!.id,
        toLocation,
        productionFacilityId: facility?.id,
      }),
    {
      onSuccess: (resp) => {
        router.push(resp.id.toString());
        showSuccessToast(toast, { title: 'Order successfully created!' });
      },
    },
  );

  const { data: facilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => getProductionFacilities(),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers(),
  });

  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig(),
  });

  const onFacilitySelect = (id: number) => {
    const facility = facilities!.find((i) => i.id === id)!;
    setFacility(facility);
  };

  const onCustomerSelect = (id: number) => {
    const customer = customers!.find((i) => i.id === id)!;
    setCustomer(customer);
    setToLocation(customer.defaultLocation);
  };

  const isCreateAllowed = customer !== undefined && items.length > 0;

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Create sales order</TitleText>
          <SubtitleText>
            Create a new sales order. Please enter the information below.
          </SubtitleText>
        </Stack>

        <Grid templateRows="repeat(4, 1fr)" templateColumns="300px 1fr" gap={5}>
          <FormLabelText>Production Facility:</FormLabelText>
          {facilities ? (
            <AutoCompleteSelect
              items={facilities}
              selectedId={facility?.id}
              placeholder="Production facility must be selected to start delivery..."
              onSelect={onFacilitySelect}
            />
          ) : (
            <NormalSpinner />
          )}

          <FormLabelText>From location:</FormLabelText>
          <FormValueText>{facility?.location ?? 'N/A'}</FormValueText>

          <FormLabelText>Customer:</FormLabelText>
          {customers ? (
            <AutoCompleteSelect
              items={customers}
              selectedId={customer?.id}
              placeholder="Customer must be selected..."
              onSelect={onCustomerSelect}
            />
          ) : (
            <NormalSpinner />
          )}

          <FormLabelText>To location:</FormLabelText>
          <Input
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />
        </Grid>

        <SalesOrderItemsPanel items={items} onItemsChange={setItems} />

        {config ? (
          <SalesOrderTotalsPanel items={items} vatRate={config.vatRate} />
        ) : (
          <NormalSpinner />
        )}

        <Flex justify="end" mt={5} gap={5}>
          <Link href="/sales/orders">
            <ActionButton size="lg">Close</ActionButton>
          </Link>

          <ActionButton
            size="lg"
            colorScheme="blue"
            isDisabled={!isCreateAllowed}
            isLoading={isLoading}
            onClick={() => createOrder()}
          >
            Create
          </ActionButton>
        </Flex>
      </Stack>
    </Box>
  );
}
