'use client';

import { getConfig } from '@/app/api/config';
import { createProductionOrder } from '@/app/api/production-order';
import { ActionButton } from '@/app/components/buttons';
import { NormalSpinner } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { ProductionOrderItem } from '@/app/models/production-order';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Flex, Link, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import ProductionOrderItemsPanel from '../components/ProductionOrderItemsPanel';
import ProductionOrderTotalsPanel from '../components/ProductionOrderTotalsPanel';

export default function SalesOrderCreatePage() {
  const toast = useToast();
  const router = useRouter();
  const [items, setItems] = useState<ProductionOrderItem[]>([]);

  const { mutate: createOrder, isLoading } = useMutation(
    () =>
      createProductionOrder({
        items,
      }),
    {
      onSuccess: (resp) => {
        router.push(resp.id.toString());
        showSuccessToast(toast, { title: 'Order successfully created!' });
      },
    },
  );

  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig(),
  });

  const isCreateAllowed = items.length > 0;

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Create Production order</TitleText>
          <SubtitleText>
            Create a new production order. Please enter the information below.
          </SubtitleText>
        </Stack>

        <ProductionOrderItemsPanel items={items} onItemsChange={setItems} />

        {config ? (
          <ProductionOrderTotalsPanel items={items} />
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
