'use client';
import React from 'react';
import SalesOrderInfo from '../../components/SalesOrderInfo';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import { Stack, Button, Text } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import EventProgress from '@/app/components/EventProgress';
import AutoCompleteBox from '@/app/components/AutoCompleteBox';
import CompletePaymentDialog from '@/app/components/CompletePaymentDialog';
import CancelSalesDialog from '@/app/components/CancelSalesDialog';
export default function SalesOrder() {
  const [paymentDialog, SetPaymentDialog] = React.useState(false);
  const [cancelDialog, SetCancelDialog] = React.useState(false);
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
  function validateLocation(value: string) {
    let error;
    if ((value = '')) {
      error = 'Location is required';
    }
    return error;
  }

  return (
    <div className="p-5">
      <Formik
        initialValues={{
          location: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} direction={'column'}>
              <SalesOrderInfo />
              <ItemsInfo />
              <EventProgress />
              <PaymentInfo />
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
