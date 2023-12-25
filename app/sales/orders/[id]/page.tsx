'use client';
import { getSalesOrder, updateSalesOrder } from '@/app/api/sales-order';
import { ActionButton } from '@/app/components/buttons';
import { LoadingPage } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { ProductionFacility } from '@/app/models/production-facility';
import { SalesOrderItem } from '@/app/models/sales-order';
import { TransOrderEvent } from '@/app/models/trans-order';
import SalesOrderTotalsPanel from '@/app/sales/orders/components/SalesOrderTotalsPanel';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Stack, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SalesOrderItemsPanel from '../components/SalesOrderItemsPanel';
import SalesOrderActionPanel from './components/SalesOrderActionPanel';
import SalesOrderEventTimelinePanel from './components/SalesOrderEventTimelinePanel';
import SalesOrderInfoPanel from './components/SalesOrderInfoPanel';
import SalesOrderPaymentPanel from './components/SalesOrderPaymentPanel';

interface SalesOrderDetailsPageProps {
  params: {
    id: number;
  };
}

export default function SalesOrderDetailsPage({
  params,
}: SalesOrderDetailsPageProps) {
  const orderId = params.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const [facility, setFacility] = useState<ProductionFacility | undefined>();
  const [toLocation, setToLocation] = useState('');
  const [items, setItems] = useState<SalesOrderItem[]>([]);
  const [events, setEvents] = useState<TransOrderEvent[]>([]);

  const queryKey = ['salesOrder', orderId];

  const { data: order, refetch } = useQuery({
    queryKey,
    queryFn: () => getSalesOrder(orderId),
    onSuccess: (resp) => {
      setFacility(resp.productionFacility);
      setToLocation(resp.toLocation);

      if (resp.events) {
        setEvents(resp.events);
      }

      if (resp.items) {
        setItems(resp.items);
      }
    },
  });

  const { mutate: updateOrder } = useMutation(
    () =>
      updateSalesOrder({
        id: orderId,
        items,
        toLocation,
        productionFacilityId: facility?.id,
      }),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    },
  );

  const onAddEvent = (event: TransOrderEvent) => {
    setEvents([...events, event]);
    refetch();
  };

  const isUpdateALlowed =
    order?.isExecutionInfoUpdateAllowed && items.length > 0;

  if (order === undefined) {
    return <LoadingPage />;
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Sales order #{order.id}</TitleText>
          <SubtitleText>
            Manage and view the details of this sales order.
          </SubtitleText>
        </Stack>

        <SalesOrderInfoPanel
          order={order}
          facility={facility}
          onFacilitySelect={setFacility}
          toLocation={toLocation}
          onToLocationChange={setToLocation}
        />

        <SalesOrderItemsPanel
          isDisabled={!order.isExecutionInfoUpdateAllowed}
          items={items}
          onItemsChange={setItems}
        />

        <SalesOrderTotalsPanel items={items} vatRate={order.vatRate} />

        <SalesOrderPaymentPanel order={order} />

        <SalesOrderEventTimelinePanel
          events={events}
          order={order}
          onAdd={onAddEvent}
        />

        <SalesOrderActionPanel order={order} />

        <div className="flex w-full flex-row justify-end gap-5 pt-10">
          <Link href="/sales/orders">
            <ActionButton>Close</ActionButton>
          </Link>

          <ActionButton
            colorScheme="blue"
            isDisabled={!isUpdateALlowed}
            onClick={() => updateOrder()}
          >
            Update
          </ActionButton>
        </div>
      </Stack>
    </Box>
  );
}
