'use client';
import {
  cancelPurchaseOrder,
  createPurchaseOrderEvent,
  finishPurchaseOrder,
  getPurchaseOrder,
  startPurchaseOrder,
  updatePurchaseOrder,
  updatePurchaseOrderEvent,
} from '@/app/api/purchase-order';
import { AutoCompleteItemPreview } from '@/app/components/auto-complete';
import {
  ActionButton,
  ActionButtonRow,
  ActionButtonSection,
} from '@/app/components/buttons';
import { EventTimeline, EventUpdateData } from '@/app/components/events';
import { OrderItemEditCardProps } from '@/app/components/item-cards';
import { ItemsEditor } from '@/app/components/items-editor';
import { OrderCancelDialog } from '@/app/components/order-dialogs';
import {
  OrderEventDisplayProps,
  OrderEventTimelinePanelProps,
  TransOrderEventAddDialog,
  TransOrderEventCard,
} from '@/app/components/order-events';
import { LoadingPage } from '@/app/components/spinners';
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from '@/app/components/status-indicators';
import {
  BigTotalValueRow,
  FormLabelText,
  FormValueText,
  SectionText,
  SmallTotalValueRow,
  SubtitleText,
  TitleText,
} from '@/app/components/texts';
import { PurchaseOrder, PurchaseOrderItem } from '@/app/models/purchase-order';
import { TransOrderEvent } from '@/app/models/trans-order';
import { DetailsPageProps } from '@/app/types/page-props';
import CurrencyFormat, { currencySymbol } from '@/app/utils/currency-formats';
import { toPercentage } from '@/app/utils/percentage-formats';
import { dateToFullFormat } from '@/app/utils/time-formats';
import { showSuccessToast } from '@/app/utils/toast-messages';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function PurchaseOrderDetailsPage({ params }: DetailsPageProps) {
  const orderId = params.id;
  const queryClient = useQueryClient();
  const toast = useToast();
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);
  const [fromLocation, setFromLocation] = useState('');
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [events, setEvents] = useState<TransOrderEvent[]>([]);
  const queryKey = ['purchaseOrder', orderId];
  const { data: order, refetch } = useQuery({
    queryKey,
    queryFn: () => getPurchaseOrder(orderId),
    onSuccess: (resp) => {
      setFromLocation(resp.toLocation);
      if (resp.events) {
        setEvents(resp.events);
      }
      if (resp.items) {
        setItems(resp.items);
      }
    },
  });

  const createNewItem = (id: number): PurchaseOrderItem => {
    const item = items?.find((i) => i.itemId === id);

    if (!item) {
      throw new Error('Product ID not found.');
    }

    return item;
  };
  const alreadyAddedItemIds = new Set(items.map((i) => i.itemId));
  const itemAddSelections = items
    ?.filter(({ itemId }) => !alreadyAddedItemIds.has(itemId))
    .map((item) => (
      <AutoCompleteItem
        key={item.itemId}
        label={item.supply.name}
        value={item.itemId}
        textTransform="capitalize"
      >
        <AutoCompleteItemPreview
          name={item.supply.name}
          price={item.unitPrice}
          imageUrl={item.supply.imageUrl}
        />
      </AutoCompleteItem>
    ));

  const onAddEvent = (event: TransOrderEvent) => {
    setEvents([...events, event]);
    refetch();
  };
  const [displayCancelDialog, setDisplayCancelDialog] = useState(false);
  const { mutate: startOrderDelivery, isLoading: isStartOrderDeliveryLoading } =
    useMutation(() => startPurchaseOrder(orderId), {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    });

  const {
    mutate: finishOrderDelivery,
    isLoading: isFinishOrderDeliveryLoading,
  } = useMutation(() => finishPurchaseOrder(orderId), {
    onSuccess: (resp) => {
      queryClient.setQueryData(queryKey, resp);
      showSuccessToast(toast);
    },
  });

  const { mutate: cancelOrder, isLoading: isCancelOrderLoading } = useMutation(
    cancelPurchaseOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayCancelDialog(false);
      },
    },
  );

  const { mutate: updateOrder, isLoading: isUpdateLoading } = useMutation(
    () =>
      updatePurchaseOrder({
        id: orderId,
        items: items,
        fromLocation: fromLocation,
        additionalDiscount: additionalDiscount,
      }),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Update succeed!' });
      },
    },
  );
  if (order === undefined) {
    return <LoadingPage />;
  }
  const subTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountSubtotal = items.reduce((sum, item) => sum + item.discount, 0);

  const discountAmount = discountSubtotal + additionalDiscount;
  const netSubtotal = subTotal - discountAmount;

  const vatRate = 0.05;
  const vatAmount = netSubtotal * vatRate;
  const totalAmount = netSubtotal + vatAmount;

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Purchase order #{orderId}</TitleText>
          <SubtitleText>
            Manage and view the details of this purchase order.
          </SubtitleText>
          <Grid
            templateRows="repeat(12, 1fr)"
            templateColumns="300px 1fr"
            gap={5}
          >
            <FormLabelText>From location:</FormLabelText>

            <Input
              id="fromLocation"
              name="fromLocation"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            />
            <FormLabelText>To Location:</FormLabelText>
            <FormValueText>{order.toLocation}</FormValueText>
            <FormLabelText>Facility:</FormLabelText>
            <FormValueText>{order.productionFacility.name}</FormValueText>
            <FormLabelText>Vendor:</FormLabelText>
            <FormValueText>{order.vendor.name}</FormValueText>

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

            <FormLabelText>Problem:</FormLabelText>
            <FormValueText>
              {order.problem ? order.problem : 'N/A'}
            </FormValueText>
          </Grid>
        </Stack>
        <Stack spacing={5}>
          <SectionText>Items</SectionText>
          <ItemsEditor
            id="items"
            name="items"
            items={items}
            getItemId={(i) => i.itemId}
            itemAddSelections={itemAddSelections}
            isDisabled={true}
            onItemsChange={setItems}
            createNewItem={createNewItem}
          >
            {(onDiscountChange, onDelete) =>
              items.map((item) => (
                <PurchaseOrderItemEditCard
                  key={item.itemId}
                  item={item}
                  isDisabled={!order.isDiscountUpdateAllowed}
                  onChange={onDiscountChange}
                  onDelete={onDelete}
                />
              ))
            }
          </ItemsEditor>
        </Stack>

        <Stack spacing={5}>
          <SectionText>Totals</SectionText>
          <Stack spacing={5} divider={<StackDivider borderColor="black.600" />}>
            <Stack spacing={5}>
              <SmallTotalValueRow
                label="Subtotal"
                value={CurrencyFormat.format(subTotal).toString()}
              />
              <SmallTotalValueRow
                label="Discount subtotal"
                value={CurrencyFormat.format(discountSubtotal).toString()}
              />

              <Flex justify="space-between" align="center">
                <Text fontSize="lg" fontWeight={'bold'}>
                  Additional discount
                </Text>
                <InputGroup w={250}>
                  <NumberInput
                    id="additional-discount"
                    name="additional-discount"
                    allowMouseWheel
                    min={0}
                    step={10000}
                    value={additionalDiscount}
                    isDisabled={!order.isDiscountUpdateAllowed}
                    onChange={(_, value) => setAdditionalDiscount(value)}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <InputRightAddon>{currencySymbol}</InputRightAddon>
                </InputGroup>
              </Flex>

              <SmallTotalValueRow
                label="Net subtotal"
                value={CurrencyFormat.format(netSubtotal).toString()}
              />
              <SmallTotalValueRow
                label="VAT rate"
                value={toPercentage(vatRate).toString() + '%'}
              />
              <SmallTotalValueRow
                label="VAT amount"
                value={CurrencyFormat.format(vatAmount).toString()}
              />
            </Stack>
            <BigTotalValueRow
              label="Total amount"
              value={CurrencyFormat.format(totalAmount).toString()}
            />
          </Stack>
        </Stack>
        <PurchaseOrderEventTimelinePanel
          events={events}
          order={order}
          onAdd={onAddEvent}
        />
        <ActionButtonSection>
          <SectionText>Delivery</SectionText>
          <ActionButtonRow
            colorScheme="blue"
            buttonText="Start delivery"
            isDisabled={!order.isExecutionStartAllowed}
            isLoading={isStartOrderDeliveryLoading}
            onClick={() => startOrderDelivery()}
          >
            Mark the delivery of this order as started.
          </ActionButtonRow>

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
          <Link href="/purchases/orders">
            <ActionButton size="lg">Close</ActionButton>
          </Link>

          <ActionButton
            size="lg"
            colorScheme="blue"
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

function PurchaseOrderItemEditCard(
  props: OrderItemEditCardProps<PurchaseOrderItem>,
) {
  const item = props.item;
  const supply = props.item.supply;

  const onDiscountChange = (discount: number) => {
    const totalPrice = item.quantity * item.unitPrice;

    props.onChange({
      ...item,
      discount,
      totalPrice,
      netPrice: totalPrice - discount,
    });
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        w={{ base: '100%', sm: '200px' }}
        src={supply.imageUrl}
        alt={supply.name}
      />

      <CardBody>
        <Text fontWeight="bold" fontSize="xl">
          {supply.name}
        </Text>

        <Stack mt={3} spacing={3}>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Text fontWeight="bold">Discount:</Text>
            <Box>
              <NumberInput
                id={`item-discount-${item.itemId}`}
                name={`item-discount-${item.itemId}`}
                allowMouseWheel
                step={10000}
                isRequired={true}
                min={0}
                value={item.discount}
                isDisabled={props.isDisabled}
                onChange={(_, value) =>
                  // Don't update if number box is empty.
                  value && onDiscountChange(value)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Stack>
          <Text>Unit: {item.unit}</Text>
          <Text>Price: {CurrencyFormat.format(item.unitPrice)}</Text>
          <Text>Total price: {CurrencyFormat.format(item.totalPrice)}</Text>
          <Text>Net price: {CurrencyFormat.format(item.netPrice)}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

function PurchaseOrderEventTimelinePanel(
  props: OrderEventTimelinePanelProps<PurchaseOrder, TransOrderEvent>,
) {
  const events = props.events;
  const orderId = props.order.id;

  const toast = useToast();
  const [displayAddDialog, setDisplayAddDialog] = useState(false);

  const { mutate: createEvent, isLoading } = useMutation(
    createPurchaseOrderEvent,
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
          <PurchaseOrderEventDisplay
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

function PurchaseOrderEventDisplay({
  orderId,
  initEvent,
}: OrderEventDisplayProps<TransOrderEvent>) {
  const [event, setEvent] = useState(initEvent);

  const { mutate: updateEvent } = useMutation(updatePurchaseOrderEvent, {
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

  return <TransOrderEventCard event={event} onChange={onChange} />;
}
