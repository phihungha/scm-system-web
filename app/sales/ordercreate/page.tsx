'use client';
import React from 'react';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import {
  Stack,
  Box,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Input,
  FormControl
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import EventProgress from '@/app/components/EventProgress';
import AutoCompleteBox from '@/app/components/AutoCompleteBox';
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
              <Box as={'header'}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={'3xl'}>
                  #1
                </Heading>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '20px' }}
                  color={'black.500'}
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                  mb={'4'}
                  pt={10}
                >
                  Order Details
                </Text>
              </Box>
              <Stack alignItems="center" spacing={8} direction="row">
                <Text as={'span'} fontWeight={'bold'}>
                  Facility:
                </Text>
                <FormControl>
                  <AutoCompleteBox/>
                </FormControl>
              </Stack>
              <Stack alignItems="center" spacing={2} direction="row">
                <Text mr={1} as={'span'} fontWeight={'bold'}>
                  Customer:
                </Text>
                <FormControl>
                  <AutoCompleteBox/>
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
