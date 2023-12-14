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
import { getAllSalesOrders, getSalesOrder } from '@/app/api/salesApi';
import EventProgress from '@/app/components/EventProgress';
export default function SalesOrder() {
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
            <Stack spacing={{ base: 4, sm: 6 }} direction={'column'}>
              <SalesOrderInfo />
              <Stack spacing={6} direction="row">
                <Text mr={'1px'} as={'span'} fontWeight={'bold'}>
                  Finish Time:
                </Text>
                <Text>12/11/2023</Text>
              </Stack>
              <Stack spacing={2} direction="row">
                <Text as={'span'} fontWeight={'bold'}>
                  Delivery Time:
                </Text>
                <Text>12/11/2023</Text>
              </Stack>
              <Stack alignItems="center" spacing={12} direction="row">
                <Text as={'span'} fontWeight={'bold'}>
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
              <div className="flex flex-row justify-end gap-10 pt-10">
                <Button width={100} variant="solid" colorScheme="red">
                  Cancel
                </Button>
                <Button width={100} variant="solid" colorScheme="yellow">
                  Return
                </Button>
                <Button width={100} variant="solid" colorScheme="green">
                  Complete
                </Button>
                <Button
                  width={100}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
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
