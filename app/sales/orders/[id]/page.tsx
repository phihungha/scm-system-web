'use client';

import {
  createSalesOrderEvent,
  updateSalesOrderEvent,
} from '@/app/api/sales-order';
import { EventTimeline, EventUpdateData } from '@/app/components/events';
import {
  OrderEventDisplayProps,
  OrderEventTimelinePanelProps,
  TransOrderEventAddDialog,
  TransOrderEventDisplay,
} from '@/app/components/order-events';

import { getProductionFacilities } from '@/app/api/production-facility';
import {
  cancelSalesOrder,
  completeSalesOrder,
  completeSalesOrderPayment,
  finishSalesOrder,
  getSalesOrder,
  returnSalesOrder,
  updateSalesOrder,
} from '@/app/api/sales-order';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import {
  ActionButton,
  ActionButtonRow,
  ActionButtonSection,
} from '@/app/components/buttons';
import {
  OrderCancelDialog,
  OrderReturnDialog,
} from '@/app/components/order-dialogs';
import { PaymentPanel } from '@/app/components/payment';
import { LoadingPage, NormalSpinner } from '@/app/components/spinners';
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from '@/app/components/status-indicators';
import {
  FormLabelText,
  FormValueText,
  SectionText,
  SubtitleText,
  TitleText,
} from '@/app/components/texts';
import { ProductionFacility } from '@/app/models/production-facility';
import { SalesOrder, SalesOrderItem } from '@/app/models/sales-order';
import { TransOrderEvent } from '@/app/models/trans-order';
import SalesOrderTotalsPanel from '@/app/sales/orders/components/SalesOrderTotalsPanel';
import { DetailsPageProps } from '@/app/types/page-props';
import { dateToFullFormat } from '@/app/utils/time-formats';
import { showSuccessToast } from '@/app/utils/toast-messages';
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SalesOrderItemsPanel from '../components/SalesOrderItemsPanel';

export default function SalesOrderDetailsPage({ params }: DetailsPageProps) {
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

  // Info
  const { mutate: updateOrder, isLoading: isUpdateLoading } = useMutation(
    () =>
      updateSalesOrder({
        id: orderId,
        items: order?.isExecutionInfoUpdateAllowed ? items : undefined,
        toLocation,
        productionFacilityId: order?.isExecutionInfoUpdateAllowed
          ? facility?.id
          : undefined,
      }),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Update succeed!' });
      },
    },
  );

  // Payment
  const [displayCompletePaymentDialog, setDisplayCompletePaymentDialog] =
    useState(false);

  const { mutate: completePayment, isLoading: isPaymentCompleteLoading } =
    useMutation(completeSalesOrderPayment, {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayCompletePaymentDialog(false);
      },
    });

  // Actions

  const [displayCancelDialog, setDisplayCancelDialog] = useState(false);
  const [displayReturnDialog, setDisplayReturnDialog] = useState(false);

  const {
    mutate: finishOrderDelivery,
    isLoading: isFinishOrderDeliveryLoading,
  } = useMutation(() => finishSalesOrder(orderId), {
    onSuccess: (resp) => {
      queryClient.setQueryData(queryKey, resp);
      showSuccessToast(toast);
    },
  });

  const { mutate: completeOrder, isLoading: isCompleteOrderLoading } =
    useMutation(() => completeSalesOrder(orderId), {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    });

  const { mutate: returnOrder, isLoading: isReturnOrderLoading } = useMutation(
    returnSalesOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayReturnDialog(false);
      },
    },
  );

  const { mutate: cancelOrder, isLoading: isCancelOrderLoading } = useMutation(
    cancelSalesOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayCancelDialog(false);
      },
    },
  );

  // Info
  const { data: facilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => getProductionFacilities(),
  });

  const onFacilitySelect = (id: number) => {
    const facility = facilities!.find((i) => i.id === id)!;
    setFacility(facility);
  };

  // Progress
  const onAddEvent = (event: TransOrderEvent) => {
    setEvents([...events, event]);
    refetch();
  };

  const isUpdateALlowed =
    (order?.isExecutionInfoUpdateAllowed || order?.isToLocationUpdateAllowed) &&
    items.length > 0;

  if (order === undefined) {
    return <LoadingPage />;
  }

  // Info
  const facilitySelectComponent = facilities ? (
    <AutoCompleteSelect
      id="facility"
      name="facility"
      items={facilities}
      value={facility?.id}
      placeholder="Production facility must be selected to start delivery..."
      isDisabled={!order.isExecutionInfoUpdateAllowed}
      onChange={onFacilitySelect}
    />
  ) : (
    <NormalSpinner />
  );

  // Payment
  let description = '';
  switch (order.paymentStatus) {
    case 'Pending':
      description = 'Payment information is pending.';
      break;
    case 'Due':
      description = 'You have due payment for this order!';
      break;
    case 'Completed':
      description = 'Payment for this order has been completed.';
      break;
    case 'Canceled':
      description = 'Payment for this order has been canceled.';
      break;
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

        {/* Information */}
        <Stack>
          <Grid
            templateRows="repeat(12, 1fr)"
            templateColumns="300px 1fr"
            gap={5}
          >
            <FormLabelText>Production Facility:</FormLabelText>
            {order.isExecutionInfoUpdateAllowed ? (
              facilitySelectComponent
            ) : (
              <FormValueText>{facility?.name}</FormValueText>
            )}

            <FormLabelText>From location:</FormLabelText>
            <FormValueText>{facility?.location ?? 'N/A'}</FormValueText>

            <FormLabelText>Customer:</FormLabelText>
            <FormValueText>{order.customer.name}</FormValueText>

            <FormLabelText>To location:</FormLabelText>
            {order.isToLocationUpdateAllowed ? (
              <Input
                id="toLocation"
                name="toLocation"
                value={toLocation}
                isDisabled={!order.isToLocationUpdateAllowed}
                onChange={(e) => setToLocation(e.target.value)}
              />
            ) : (
              <FormValueText>{toLocation}</FormValueText>
            )}

            <FormLabelText>Status:</FormLabelText>
            <FormValueText>
              <OrderStatusBadge status={order.status} />
            </FormValueText>

            <FormLabelText>Payment status:</FormLabelText>
            <FormValueText>
              <PaymentStatusBadge status={order.paymentStatus} />
            </FormValueText>

            <FormLabelText>Create user:</FormLabelText>
            <FormValueText>{order.createUser.name}</FormValueText>

            <FormLabelText>Create time:</FormLabelText>
            <FormValueText>{dateToFullFormat(order.createTime)}</FormValueText>

            <FormLabelText>Update time:</FormLabelText>
            <FormValueText>
              {order.updateTime
                ? dateToFullFormat(order.updateTime)
                : 'Will be available after order has been updated.'}
            </FormValueText>

            <FormLabelText>Delivery time:</FormLabelText>
            <FormValueText>
              {order.executionFinishTime
                ? dateToFullFormat(order.executionFinishTime)
                : 'Will be available if order has finished delivery.'}
            </FormValueText>

            <FormLabelText>End user:</FormLabelText>
            <FormValueText>
              {order.endUser?.name ??
                'Will be available after order has ended.'}
            </FormValueText>

            <FormLabelText>End time:</FormLabelText>
            <FormValueText>
              {order.endTime
                ? dateToFullFormat(order.endTime)
                : 'Will be available after order has ended.'}
            </FormValueText>
          </Grid>
        </Stack>

        {/* Items */}
        <SalesOrderItemsPanel
          isDisabled={!order.isExecutionInfoUpdateAllowed}
          items={items}
          onItemsChange={setItems}
        />

        {/* Totals */}
        <SalesOrderTotalsPanel items={items} vatRate={order.vatRate} />

        {/* Payment */}
        <PaymentPanel
          status={order.paymentStatus}
          remainingAmount={order.remainingAmount}
          isLoading={isPaymentCompleteLoading}
          isDisabled={!order.isPaymentCompleteAllowed}
          onPay={(payAmount) => completePayment({ id: orderId, payAmount })}
        />

        {/* Progress */}
        <SalesOrderEventTimelinePanel
          events={events}
          order={order}
          onAdd={onAddEvent}
        />

        {/* Action */}
        <ActionButtonSection>
          <SectionText>Delivery</SectionText>
          <ActionButtonRow
            colorScheme="blue"
            buttonText="Finish delivery"
            isDisabled={!order.isExecutionFinishAllowed}
            isLoading={isFinishOrderDeliveryLoading}
            onClick={() => finishOrderDelivery()}
          >
            Mark the delivery of this order as finished.
          </ActionButtonRow>
        </ActionButtonSection>

        <ActionButtonSection>
          <SectionText>Customer acceptance</SectionText>
          <ActionButtonRow
            colorScheme="green"
            buttonText="Complete"
            isDisabled={!order.isAcceptAllowed}
            isLoading={isCompleteOrderLoading}
            onClick={() => completeOrder()}
          >
            Confirm that the customer has accepted the delivery and completed
            the order.
          </ActionButtonRow>

          <OrderReturnDialog
            display={displayReturnDialog}
            onClose={() => setDisplayReturnDialog(false)}
            isLoading={isReturnOrderLoading}
            onSubmit={(problem) => returnOrder({ id: orderId, problem })}
          />
          <ActionButtonRow
            colorScheme="purple"
            buttonText="Return"
            isDisabled={!order.isAcceptAllowed}
            onClick={() => setDisplayReturnDialog(true)}
          >
            Mark order as returned due to problems by the customer.
          </ActionButtonRow>
        </ActionButtonSection>

        <ActionButtonSection>
          <SectionText>Cancel</SectionText>
          <OrderCancelDialog
            display={displayCancelDialog}
            onClose={() => setDisplayCancelDialog(false)}
            isLoading={isCancelOrderLoading}
            onSubmit={(problem) => cancelOrder({ id: orderId, problem })}
          />
          <ActionButtonRow
            isDisabled={!order.isCancelAllowed}
            colorScheme="red"
            buttonText="Cancel"
            onClick={() => setDisplayCancelDialog(true)}
          >
            Cancel the order. This action cannot be undone!
          </ActionButtonRow>
        </ActionButtonSection>

        <Flex justify="end" mt={5} gap={5}>
          <Link href="/sales/orders">
            <ActionButton size="lg">Close</ActionButton>
          </Link>

          <ActionButton
            size="lg"
            colorScheme="blue"
            isDisabled={!isUpdateALlowed}
            isLoading={isUpdateLoading}
            onClick={() => updateOrder()}
          >
            Update
          </ActionButton>
        </Flex>
      </Stack>
    </Box>
  );
}

function SalesOrderEventTimelinePanel(
  props: OrderEventTimelinePanelProps<SalesOrder, TransOrderEvent>,
) {
  const events = props.events;
  const orderId = props.order.id;

  const toast = useToast();
  const [displayAddDialog, setDisplayAddDialog] = useState(false);

  const { mutate: createEvent, isLoading } = useMutation(
    createSalesOrderEvent,
    {
      onSuccess: (resp) => {
        props.onAdd(resp);
        toast({
          title: 'Event created!',
          description: 'A new event has been added.',
          duration: 2000,
          status: 'success',
        });
        setDisplayAddDialog(false);
      },
    },
  );

  return (
    <Stack spacing={5}>
      <SectionText>Progress</SectionText>

      <EventTimeline lastId={events.length - 1}>
        {events.map((event) => (
          <SalesOrderEventDisplay
            key={event.id}
            orderId={orderId}
            initEvent={event}
          />
        ))}
      </EventTimeline>

      <Button
        width={200}
        colorScheme="blue"
        alignSelf="start"
        isDisabled={!props.order.isExecuting}
        onClick={() => setDisplayAddDialog(true)}
      >
        Add event
      </Button>

      <TransOrderEventAddDialog
        onSubmit={(result) => createEvent({ orderId, ...result })}
        isLoading={isLoading}
        display={displayAddDialog}
        onClose={() => setDisplayAddDialog(false)}
      />
    </Stack>
  );
}

function SalesOrderEventDisplay({
  orderId,
  initEvent,
}: OrderEventDisplayProps<TransOrderEvent>) {
  const [event, setEvent] = useState(initEvent);

  const { mutate: updateEvent } = useMutation(updateSalesOrderEvent, {
    onSuccess: setEvent,
  });

  const onChange = (input: EventUpdateData) => {
    console.log(input);
    updateEvent({
      orderId: orderId,
      id: event.id,
      location: input.location,
      message: input.message,
    });
  };

  return <TransOrderEventDisplay event={event} onChange={onChange} />;
}
