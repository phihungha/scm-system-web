'use client';
import React from 'react';
import SalesOrderInfo from '../../components/SalesOrderInfo';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import {
  Stack,
  StackDivider,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
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
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              </Stack>

              <ItemsInfo />

              <PaymentInfo />
              <div className="flex flex-row justify-end gap-10 pt-10">
                <Button variant="solid" colorScheme="red">
                  Cancel
                </Button>
                <Button type="submit" variant="solid" colorScheme="blue">
                  Create
                </Button>
              </div>
            </Stack>
          </form>
        )}
      </Formik>
    </div>
  );
}
