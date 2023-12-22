'use client';
import { getConfig } from '@/app/api/configApi';
import { getAllCustomers } from '@/app/api/customerApi';
import { getAllFacilities } from '@/app/api/facilityApi';
import { createSalesOrder } from '@/app/api/salesApi';
import ItemsInfo from '@/app/components/ItemsInfo';
import PaymentInfo from '@/app/components/PaymentInfo';
import { IFacilityResponse } from '@/app/types/productionFacility';
import {
  ICustomer,
  ISaleResponse,
  ItemInput,
  PriceInput,
  salesCreateInput,
} from '@/app/types/sales';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
export default function SalesOrder() {
  const [selectedPrice, setSelectedPrice] = useState<PriceInput[]>([]);
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [selectedFacility, setSelectedFacility] = useState(0);
  const sumTotal = (arr: PriceInput[]) =>
    arr.reduce((sum, { itemId, quantity, price }) => sum + price * quantity, 0);

  const { mutate: createSales } = useMutation(
    async (salesData: salesCreateInput) => await createSalesOrder(salesData),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace(`/sales/${response.id}`);
      },
    },
  );

  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig(),
  });
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers(),
  });

  const { data: facilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => getAllFacilities(),
  });

  if (config === undefined) {
    return <>Still loading...</>;
  }
  if (customers === undefined) {
    return <>Still loading...</>;
  }
  if (facilities === undefined) {
    return <>Still loading...</>;
  }

  const totalPrice = sumTotal(selectedPrice);
  const vatAmount = totalPrice * config.vatRate;
  const totalAmount = totalPrice + vatAmount;

  function onCreate(
    productionFacilityId: number,
    customerId: number,
    items: PriceInput[],
  ) {
    const newItems: ItemInput[] = [];
    items.forEach((item: PriceInput) => {
      newItems.push(new ItemInput(item.itemId, item.quantity));
    });
    const sale = new salesCreateInput(
      newItems,
      customerId,
      productionFacilityId,
    );
    createSales(sale);
  }
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
                  CREATE
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
                    onChange={(facilityId: number) =>
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
                    onChange={(customerId: number) =>
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
              <PaymentInfo
                totalPrice={totalPrice}
                totalAmount={totalAmount}
                vatAmount={vatAmount}
                vatRate={config.vatRate}
              />
              <div className="flex flex-row justify-end gap-10 pt-10">
                <Button variant="solid" colorScheme="red" size={'lg'}>
                  Close
                </Button>
                <Button
                  onClick={() =>
                    onCreate(selectedFacility, selectedCustomer, selectedPrice)
                  }
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
