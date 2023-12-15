'use client';
import React from 'react';
import SalesOrderInfo from '../../components/SalesOrderInfo';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import {
  Stack,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import EventProgress from '@/app/components/EventProgress';
import AutoCompleteBox from '@/app/components/AutoCompleteBox';
import CompletePaymentDialog from '@/app/components/CompletePaymentDialog';
import CancelSalesDialog from '@/app/components/CancelSalesDialog';
export default function SalesOrder() {
  const [paymentDiaglog, SetPaymentDialog] = React.useState(false);
  const [cancelDiaglog, SetCancelDialog] = React.useState(false);
  const CompletePayment = async () => {
    SetPaymentDialog(true);
  };
  function handleClose() {
    SetPaymentDialog(false);
  };

  const CancelPayment = async () => {
    SetCancelDialog(true);
  };
  function CancelClose() {
    SetCancelDialog(false);
  };
  const paymentDiaglogProps = { paymentDiaglog, handleClose};
  const cancelDiaglogProps = {cancelDiaglog, CancelClose};
  function validateLocation(value) {
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
              <Stack alignItems="center" spacing={20} direction="row">
                <Text mr={7} fontSize={'xl'} as={'span'} fontWeight={'bold'}>
                  Facility:
                </Text>
                <FormControl>
                  <AutoCompleteBox/>
                </FormControl>
              </Stack>
              <Stack alignItems="center" spacing={20} direction="row">
                <Text fontSize={'xl'} mr={3} as={'span'} fontWeight={'bold'}>
                  Location:
                </Text>
                <FormControl>
                  <Field
                    as={Input}
                    id="location"
                    name="location"
                    type="location"
                    variant="filled"
                    validate={validateLocation}
                  />
                  <FormErrorMessage>{errors.location}</FormErrorMessage>
                </FormControl>
              </Stack>

              <ItemsInfo />
              <EventProgress />
              <PaymentInfo />
              <Stack alignItems="center" spacing={1} direction="row">
                <Text fontSize="xl" width={170} fontWeight={'bold'}>
                  Pay Amount:
                </Text>
                <FormControl>
                  <Field
                    as={Input}
                    id="amount"
                    name="amount"
                    variant="filled"
                    textAlign={'right'}
                  />
                  <FormErrorMessage>{errors.location}</FormErrorMessage>
                </FormControl>
              </Stack>
              <div className="flex flex-row justify-end gap-5 pt-10">
                <Button onClick={CancelPayment} width={100} variant="solid" colorScheme="red" size='lg'>
                  Cancel
                </Button>
                <CancelSalesDialog open={cancelDiaglogProps}/>
                <Button onClick={CompletePayment} variant="solid" colorScheme="purple" size='lg'>
                  Complete Payment
                </Button>
                <CompletePaymentDialog open={paymentDiaglogProps} />
                <Button variant="solid" colorScheme="orange" size='lg'>
                  Finish Delivery
                </Button>
                <Button width={100} variant="solid" colorScheme="green" size='lg'>
                  Complete
                </Button>
                <Button
                  width={100}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  size='lg'
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
