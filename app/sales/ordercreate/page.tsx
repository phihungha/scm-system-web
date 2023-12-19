'use client';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PaymentInfo from '@/app/components/PaymentInfo';
import ItemsInfo from '@/app/components/ItemsInfo';
import {
  Stack,
  Box,
  Button,
  Heading,
  Text,
  FormControl,
  Flex,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { Formik, Field } from 'formik';
import { getAllCustomers, getAllCustomers2 } from '@/app/api/customerApi';
import { ICustomer, ItemInput, PriceInput } from '@/app/types/sales';
import { IFacilityResponse } from '@/app/types/productionFacility';
import { getAllFacilities, getAllFacilities2 } from '@/app/api/facilityApi';
import { getConfig2 } from '@/app/api/configApi';
export default function SalesOrder() {
  const [selectedPrice, setSelectedPrice] = useState<PriceInput[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers2(),
  });

  const { data: facilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => getAllFacilities2(),
  });

  return (
    <div className="p-5">
      <Formik
        onSubmit={() => {
          alert(selectedCustomer);
        }}
      >
        {({}) => (
          <form>
            <Stack spacing={{ base: 4, sm: 6 }} direction={'column'}>
              <Box as={'header'}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={'5xl'}>
                  #1
                </Heading>
              </Box>
              <Box>
                <Text
                  fontSize={'3xl'}
                  color={'black.500'}
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                  mb={'4'}
                  pt={10}
                >
                  Order Details
                </Text>
              </Box>
              <Stack
                fontSize={'xl'}
                alignItems="center"
                spacing={8}
                direction="row"
              >
                <Text as={'span'} fontWeight={'bold'}>
                  Facility:
                </Text>
                <FormControl>
                  <AutoComplete
                    openOnFocus
                    value={selectedFacility}
                    onChange={(facilityId: string) =>
                      setSelectedFacility(facilityId)
                    }
                  >
                    <AutoCompleteInput variant="filled" />
                    <AutoCompleteList gap={5}>
                      {facilities?.map((facility: IFacilityResponse) => (
                        <AutoCompleteItem
                          key={facility.id}
                          label={facility.name}
                          value={facility.id}
                          textTransform="capitalize"
                        >
                          {facility.name}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                </FormControl>
              </Stack>
              <Stack
                fontSize={'xl'}
                alignItems="center"
                spacing={2}
                direction="row"
              >
                <Text mr={1} as={'span'} fontWeight={'bold'}>
                  Customer:
                </Text>
                <FormControl w="auto">
                  <AutoComplete
                    openOnFocus
                    value={selectedCustomer}
                    onChange={(customerId: string) =>
                      setSelectedCustomer(customerId)
                    }
                  >
                    <AutoCompleteInput variant="filled" />
                    <AutoCompleteList>
                      {customers?.map((customer: ICustomer) => (
                        <AutoCompleteItem
                          key={customer.id}
                          label={customer.contactPerson}
                          value={customer.id}
                          textTransform="capitalize"
                        >
                          {customer.contactPerson}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                </FormControl>
              </Stack>
              <ItemsInfo
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
              <div className="flex flex-row justify-end gap-10 pt-10">
                <Button variant="solid" colorScheme="red" size={'lg'}>
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  size={'lg'}
                >
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
