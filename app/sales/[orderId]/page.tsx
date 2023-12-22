'use client';
import {
  completeSalesOrder,
  finishSalesOrder,
  getSalesOrder,
  updateSalesOrder,
} from '@/app/api/salesApi';
import CancelSalesDialog from '@/app/components/CancelSalesDialog';
import CompletePaymentDialog from '@/app/components/CompletePaymentDialog';
import EventProgress from '@/app/components/EventProgress';
import ItemsInfo from '@/app/components/ItemsInfo';
import PaymentInfo from '@/app/components/PaymentInfo';
import {
  Event,
  ISaleResponse,
  Item,
  ItemInput,
  PriceInput,
  SaleDetailsProps,
  UpdateInput,
} from '@/app/types/sales';
import { Button, Stack, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import ReturnSalesDialog from '../components/ReturnSalesDialog';
import SalesOrderInfo from '../components/SalesOrderInfo';

export default function SalesOrder({ params }: SaleDetailsProps) {
  const router = useRouter();
  const [paymentDialog, SetPaymentDialog] = React.useState(false);
  const [cancelDialog, SetCancelDialog] = React.useState(false);
  const [returnDialog, SetReturnDialog] = React.useState(false);
  const [selectedPrice, setSelectedPrice] = useState<PriceInput[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState(0);
  const [toLocation, setToLocation] = useState('');
  const [remainAmount, setRemainAmount] = useState('');
  const [vatRate, setVatRate] = useState(0);

  const sumTotal = (arr: PriceInput[]) =>
    arr.reduce((sum, { itemId, quantity, price }) => sum + price * quantity, 0);

  const { data: salesOrder } = useQuery({
    queryKey: ['salesOrder'],
    queryFn: () => getSalesOrder(params.orderId),
    onSuccess: (response: ISaleResponse) => {
      setSelectedFacilityId(response.productionFacilityId);
      setToLocation(response.toLocation);
      setEvents(events.concat(response.events));
      response.items.forEach((item: Item) => {
        const newItem = new PriceInput(
          item.product.id,
          item.quantity,
          item.product.price,
        );
        selectedPrice.push(newItem);
      });
      setSelectedPrice(selectedPrice);
      setVatRate(response.vatRate);
      setRemainAmount(response.remainingAmount);
    },
  });

  const { mutate: updateSales } = useMutation(
    async (salesData: UpdateInput) =>
      await updateSalesOrder(params.orderId, salesData),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace('/sales');
      },
    },
  );

  const { mutate: completeSales } = useMutation(
    async () => await completeSalesOrder(params.orderId),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace('/sales');
      },
    },
  );

  const { mutate: finishSales } = useMutation(
    async () => await finishSalesOrder(params.orderId),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace('/sales');
      },
    },
  );

  if (salesOrder === undefined) {
    return <>Still loading...</>;
  }

  const currentOrder: ISaleResponse = salesOrder;

  function onUpdate(
    productionFacilityId: number,
    toLocation: string,
    items: PriceInput[],
  ) {
    const newItems: ItemInput[] = [];
    items.forEach((item: PriceInput) => {
      newItems.push(new ItemInput(item.itemId, item.quantity));
    });
    const sale = new UpdateInput(newItems, toLocation, productionFacilityId);
    updateSales(sale);
  }

  const CompletePayment = async () => {
    SetPaymentDialog(true);
  };
  function handleClose() {
    SetPaymentDialog(false);
  }

  const CancelPayment = async () => {
    SetCancelDialog(true);
  };
  function CancelClose() {
    SetCancelDialog(false);
  }

  const returnOrder = async () => {
    SetReturnDialog(true);
  };
  function returnClose() {
    SetReturnDialog(false);
  }

  const totalPrice = sumTotal(selectedPrice);
  const vatAmount = totalPrice * vatRate;
  const totalAmount = totalPrice + vatAmount;

  return (
    <div className="p-5">
      <Formik>
        {() => (
          <form>
            <Stack spacing={5} direction={'column'}>
              <SalesOrderInfo
                toLocation={toLocation}
                currentOrder={currentOrder}
                setToLocation={setToLocation}
                setSelectedFacilityId={setSelectedFacilityId}
              />
              <ItemsInfo
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
              <EventProgress
                events={events}
                setEvents={setEvents}
                orderId={currentOrder.id}
              />
              <PaymentInfo
                totalPrice={totalPrice}
                totalAmount={totalAmount}
                vatAmount={vatAmount}
                vatRate={vatRate}
              />
              <Stack spacing={5} direction="row">
                <Text as={'span'} fontWeight={'bold'} fontSize="3xl">
                  Remaining Amount:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text as={'span'} fontWeight={'bold'} fontSize="3xl">
                    {remainAmount}
                  </Text>
                </div>
              </Stack>
              <div className="flex w-full flex-row justify-end gap-5 pt-10">
                <Button
                  onClick={CancelPayment}
                  width={100}
                  variant="solid"
                  colorScheme="red"
                  size="lg"
                >
                  Cancel
                </Button>
                <CancelSalesDialog
                  cancelDialog={cancelDialog}
                  CancelClose={CancelClose}
                  orderId={params.orderId}
                />
                <Button
                  onClick={returnOrder}
                  width={100}
                  variant="solid"
                  colorScheme="red"
                  size="lg"
                >
                  Return
                </Button>
                <ReturnSalesDialog
                  orderId={params.orderId}
                  returnDialog={returnDialog}
                  returnClose={returnClose}
                />
                <Button
                  onClick={CompletePayment}
                  variant="solid"
                  colorScheme="purple"
                  size="lg"
                >
                  Complete Payment
                </Button>
                <CompletePaymentDialog
                  orderId={params.orderId}
                  paymentDialog={paymentDialog}
                  handleClose={handleClose}
                />
                <Button
                  onClick={() => finishSales()}
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
                  onClick={() => completeSales()}
                >
                  Complete
                </Button>
                <Button
                  width={100}
                  variant="solid"
                  colorScheme="blue"
                  size="lg"
                  onClick={() =>
                    onUpdate(selectedFacilityId, toLocation, selectedPrice)
                  }
                >
                  Update
                </Button>
              </div>
            </Stack>
          </form>
        )}
      </Formik>
    </div>
  );
}
