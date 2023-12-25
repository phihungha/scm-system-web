'use client';
import {
  completeSalesOrder,
  finishSalesOrder,
  getSalesOrder,
  updateSalesOrder,
} from '@/app/api/sales-order';
import CancelSalesDialog from '@/app/components/CancelSalesDialog';
import CompletePaymentDialog from '@/app/components/CompletePaymentDialog';
import { ActionButton } from '@/app/components/buttons';
import { NormalSpinner } from '@/app/components/spinners';
import { SectionText, SubtitleText, TitleText } from '@/app/components/texts';
import { ProductionFacility } from '@/app/models/production-facility';
import { SalesOrder, SalesOrderItem } from '@/app/models/sales-order';
import { TransOrderEvent } from '@/app/models/trans-order';
import SalesOrderTotalsDisplay from '@/app/sales/orders/components/SalesOrderTotalsDisplay';
import {
  AbsoluteCenter,
  Button,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReturnSalesDialog from './components/ReturnSalesDialog';
import SalesOrderEventTimeline from './components/SalesOrderEventTimeline';
import SalesOrderInfo from './components/SalesOrderInfo';
import SalesOrderItemsEditor from './components/SalesOrderItemsEditor';

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
      onSuccess: (resp: SalesOrder) => {
        queryClient.setQueryData(queryKey, resp);
        toast({
          title: 'Item updated!',
          description: 'Item has been updated successfully!',
          duration: 2000,
          status: 'success',
        });
      },
    },
  );

  const { mutate: completeOrder } = useMutation(
    () => completeSalesOrder(orderId),
    {
      onSuccess: (resp: SalesOrder) => {
        queryClient.setQueryData(queryKey, resp);
      },
    },
  );

  const { mutate: finishOrderDelivery } = useMutation(
    () => finishSalesOrder(orderId),
    {
      onSuccess: (resp: SalesOrder) => {
        queryClient.setQueryData(queryKey, resp);
      },
    },
  );

  const onAddEvent = (event: TransOrderEvent) => {
    setEvents([...events, event]);
    refetch();
  };

  const isUpdateALlowed =
    order?.isExecutionInfoUpdateAllowed && items.length > 0;

  const [paymentDialog, SetPaymentDialog] = useState(false);
  const [cancelDialog, SetCancelDialog] = useState(false);
  const [returnDialog, SetReturnDialog] = useState(false);

  if (order === undefined) {
    return (
      <AbsoluteCenter>
        <NormalSpinner />
      </AbsoluteCenter>
    );
  }

  return (
    <div className="p-5">
      <Stack spacing={10} direction={'column'}>
        <Stack spacing={5}>
          <TitleText>Sales order #{order.id}</TitleText>
          <SubtitleText>
            Manage and view the details of this sales order.
          </SubtitleText>
        </Stack>

        <SalesOrderInfo
          order={order}
          facility={facility}
          onFacilitySelect={setFacility}
          toLocation={toLocation}
          onToLocationChange={setToLocation}
        />

        <SectionText>Items</SectionText>
        <SalesOrderItemsEditor items={items} onItemsChange={setItems} />

        <SectionText>Totals</SectionText>
        <SalesOrderTotalsDisplay items={items} vatRate={order.vatRate} />

        <SectionText>Progress</SectionText>
        <SalesOrderEventTimeline
          events={events}
          orderId={order.id}
          onAdd={onAddEvent}
        />

        <Stack spacing={5} direction="row">
          <Text as={'span'} fontWeight={'bold'} fontSize="3xl">
            Remaining Amount:
          </Text>
          <div className="flex grow items-end justify-end">
            <Text as={'span'} fontWeight={'bold'} fontSize="3xl">
              {order.remainingAmount}
            </Text>
          </div>
        </Stack>

        <div className="flex w-full flex-row justify-end gap-5 pt-10">
          <Button
            onClick={() => SetCancelDialog(true)}
            width={100}
            variant="solid"
            colorScheme="red"
            size="lg"
          >
            Cancel
          </Button>
          <CancelSalesDialog
            cancelDialog={cancelDialog}
            CancelClose={() => SetCancelDialog(false)}
            orderId={orderId}
          />

          <Button
            onClick={() => SetCancelDialog(true)}
            width={100}
            variant="solid"
            colorScheme="red"
            size="lg"
          >
            Return
          </Button>
          <ReturnSalesDialog
            orderId={orderId}
            returnDialog={returnDialog}
            returnClose={() => SetReturnDialog(false)}
          />

          <Button
            onClick={() => SetPaymentDialog(true)}
            variant="solid"
            colorScheme="purple"
            size="lg"
          >
            Complete Payment
          </Button>
          <CompletePaymentDialog
            orderId={orderId}
            paymentDialog={paymentDialog}
            handleClose={() => SetPaymentDialog(false)}
          />

          <Button
            onClick={() => finishOrderDelivery()}
            variant="solid"
            colorScheme="orange"
            size="lg"
          >
            Finish Delivery
          </Button>
          <Button
            width={100}
            variant="solid"
            colorScheme="green"
            size="lg"
            onClick={() => completeOrder()}
          >
            Complete
          </Button>

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
    </div>
  );
}
