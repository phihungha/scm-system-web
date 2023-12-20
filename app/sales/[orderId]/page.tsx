'use client';
import React, { useState } from 'react';
import SalesOrderInfo from '../../components/SalesOrderInfo';
import { getSalesOrder } from '@/app/api/salesApi';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import { Stack, Button, Text } from '@chakra-ui/react';
import { useQuery, useMutation } from 'react-query';
import { Formik } from 'formik';
import EventProgress from '@/app/components/EventProgress';
import CompletePaymentDialog from '@/app/components/CompletePaymentDialog';
import CancelSalesDialog from '@/app/components/CancelSalesDialog';
import {
  ISaleResponse,
  PriceInput,
  SaleDetailsProps,
  Event,
  Item,
} from '@/app/types/sales';
import { useRouter } from 'next/navigation';

export default function SalesOrder({ params }: SaleDetailsProps) {
  const router = useRouter();
  const [paymentDialog, SetPaymentDialog] = React.useState(false);
  const [cancelDialog, SetCancelDialog] = React.useState(false);
  const [selectedPrice, setSelectedPrice] = useState<PriceInput[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);
  const [selectedFacilityId, setSelectedFacilityId] = useState(0);
  const [toLocation, setToLocation] = useState('');
  const [vatRate, setVatRate] = useState(0);

  const sumTotal = (arr: PriceInput[]) =>
    arr.reduce((sum, { itemId, quantity, price }) => sum + price * quantity, 0);

  const { data: salesOrder } = useQuery({
    queryKey: ['salesOrder'],
    queryFn: () => getSalesOrder(params.orderId),
    onSuccess: (response: ISaleResponse) => {
      setSelectedCustomerId(response.customerId);
      setSelectedFacilityId(response.productionFacilityId);
      setToLocation(response.customer.defaultLocation);
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
    },
  });

  if (salesOrder === undefined) {
    return <>Still loading...</>;
  }

  const currentOrder: ISaleResponse = salesOrder;

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
  const paymentDialogProps = { paymentDialog, handleClose };
  const cancelDialogProps = { cancelDialog, CancelClose };
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
                setSelectedCustomerId={setSelectedCustomerId}
                setSelectedFacilityId={setSelectedFacilityId}
              />
              <ItemsInfo
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
              <EventProgress events={events} orderId={currentOrder.id} />
              <PaymentInfo
                totalPrice={totalPrice}
                totalAmount={totalAmount}
                vatAmount={vatAmount}
                vatRate={vatRate}
              />
              <Stack spacing={5} direction="row">
                <Text as={'span'} fontWeight={'bold'} fontSize="xl">
                  Remaining Amount:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text as={'span'} fontWeight={'bold'} fontSize="xl">
                    110
                  </Text>
                </div>
              </Stack>
              <div className="flex flex-row justify-end gap-5 pt-10">
                <Button
                  onClick={CancelPayment}
                  width={100}
                  variant="solid"
                  colorScheme="red"
                  size="lg"
                >
                  Cancel
                </Button>
                <CancelSalesDialog open={cancelDialogProps} />
                <Button
                  onClick={CompletePayment}
                  variant="solid"
                  colorScheme="purple"
                  size="lg"
                >
                  Complete Payment
                </Button>
                <CompletePaymentDialog open={paymentDialogProps} />
                <Button variant="solid" colorScheme="orange" size="lg">
                  Finish Delivery
                </Button>
                <Button
                  width={100}
                  variant="solid"
                  colorScheme="green"
                  size="lg"
                >
                  Complete
                </Button>
                <Button
                  width={100}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  size="lg"
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
