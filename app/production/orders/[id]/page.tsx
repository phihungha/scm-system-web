'use client';
import {
  getProductionOrder,
  updateProductionOrder,
} from '@/app/api/production-order';
import { ActionButton } from '@/app/components/buttons';
import { LoadingPage } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import {
  ProductionOrderEvent,
  ProductionOrderItem,
  ProductionSupplyUsageItem,
} from '@/app/models/production-order';
import { DetailsPageProps } from '@/app/types/page-props';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Flex, Stack, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ProductionOrderItemsPanel from '../components/ProductionOrderItemsPanel';
import ProductionOrderTotalsPanel from '../components/ProductionOrderTotalsPanel';
import ProductionSupplyUsageItemsPanel from '../components/SupplyUsageItemCard';
import ProductionOrderActionPanel from './components/ProductionOrderActionPanel';
import ProductionOrderEventTimelinePanel from './components/ProductionOrderEventTimelinePanel';
import ProductionOrderInfoPanel from './components/ProductionOrderInfoPanel';

export default function ProductionOrderDetailsPage({
  params,
}: DetailsPageProps) {
  const orderId = params.id;

  const queryClient = useQueryClient();
  const toast = useToast();
  const [items, setItems] = useState<ProductionOrderItem[]>([]);
  const [supplyItems, setSupplyItems] = useState<ProductionSupplyUsageItem[]>(
    [],
  );
  const [events, setEvents] = useState<ProductionOrderEvent[]>([]);

  const queryKey = ['productionOrder', orderId];

  const { data: order, refetch } = useQuery({
    queryKey,
    queryFn: () => getProductionOrder(orderId),
    onSuccess: (resp) => {
      if (resp.events) {
        setEvents(resp.events);
      }
      if (resp.items) {
        setItems(resp.items);
      }
      if (resp.supplyUsageItems) {
        setSupplyItems(resp.supplyUsageItems);
      }
    },
  });

  const { mutate: updateOrder, isLoading } = useMutation(
    () =>
      updateProductionOrder({
        id: orderId,
        items: order?.isExecutionInfoUpdateAllowed ? items : undefined,
      }),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Update succeed!' });
      },
    },
  );

  const onAddEvent = (event: ProductionOrderEvent) => {
    setEvents([...events, event]);
    refetch();
  };

  const isUpdateALlowed = items.length > 0;

  if (order === undefined) {
    return <LoadingPage />;
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Production order #{order.id}</TitleText>
          <SubtitleText>
            Manage and view the details of this production order.
          </SubtitleText>
        </Stack>

        <ProductionOrderInfoPanel order={order} />
        <ProductionOrderItemsPanel
          isDisabled={!order.isExecutionInfoUpdateAllowed}
          items={items}
          onItemsChange={setItems}
        />
        <ProductionSupplyUsageItemsPanel props={supplyItems} />
        <ProductionOrderTotalsPanel items={items} />
        <ProductionOrderEventTimelinePanel
          events={events}
          order={order}
          onAdd={onAddEvent}
        />
        <ProductionOrderActionPanel order={order} />

        <Flex justify="end" mt={5} gap={5}>
          <Link href="/production/orders">
            <ActionButton size="lg">Close</ActionButton>
          </Link>

          <ActionButton
            size="lg"
            colorScheme="blue"
            isDisabled={isUpdateALlowed}
            isLoading={isLoading}
            onClick={() => updateOrder()}
          >
            Update
          </ActionButton>
        </Flex>
      </Stack>
    </Box>
  );
}
