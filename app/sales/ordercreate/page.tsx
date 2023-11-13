'use client';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag
} from '@choc-ui/chakra-autocomplete';
import React from 'react';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import SalesOrderItem from '../../components/SelectedSalesItem';
import OrderItem from '../../components/OrderItem';
import SalesOrderInfo from '../../components/SalesOrderInfo';
import {
  Stack,
  Box,
  StackDivider,
  Button,
  Flex,
  FormControl,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

const products = [
  'Aroduct11',
  'Broduct12',
  'Croduct13',
  'Droduct14',
  'Eroduct15',
];

export default function SalesOrder() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const onAdd = async () => {
    selectedProducts.splice(0);
    //if (!selectedProducts.includes(selectedProduct)) {
      setSelectedProducts(selectedProducts.concat(selectedProduct));
    //}
    
    console.log(selectedProducts);
  };

  return (
    <div className="p-5">
      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={'column'}
        divider={<StackDivider borderColor="gray.600" />}
      >
        <SalesOrderInfo />
        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={'black.500'}
            fontWeight={'500'}
            textTransform={'uppercase'}
            mb={'4'}
          >
            Items
          </Text>

          <Flex justify="center" align="center" w="full">
            <FormControl>
              <AutoComplete
                openOnFocus
                multiple
                onChange={(product) => setSelectedProduct(product)}
              >
            <AutoCompleteInput variant="filled">
            {({ tags }) =>
              tags.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  onRemove={tag.onRemove}
                />
              ))
            }
          </AutoCompleteInput>
                <AutoCompleteList>
                  {products.map((product, cid) => (
                    <AutoCompleteItem
                      key={`option-${cid}`}
                      value={product}
                      textTransform="capitalize"
                    >
                      <OrderItem name={product} />
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
              <Button mt={4} onClick={onAdd} colorScheme="blue">
                Add
              </Button>
            </FormControl>
          </Flex>

          <List pt={5}>
            <ListItem>
              {selectedProducts.map((product) => (
                <ListItem>
                  <div className="py-2">
                    <SalesOrderItem name={product} />
                  </div>
                </ListItem>
              ))}
            </ListItem>
          </List>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={<StackDivider borderColor="black.600" />}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box>
              <div className="flex flex-row place-content-between gap-10 whitespace-nowrap">
                <Text
                  pt={1}
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'black.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Payment Details
                </Text>
                <div>
                  <Button variant="solid" colorScheme="blue">
                    Generate Invoice
                  </Button>
                </div>
              </div>
              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Total Price:
                  </Text>{' '}
                  100
                </ListItem>

                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    VAT:
                  </Text>{' '}
                  10
                </ListItem>
              </List>
            </Box>
          </Stack>
          <Text as={'span'} fontWeight={'bold'} fontSize="md">
            Total Amount: 110
          </Text>{' '}
        </Stack>
      </Stack>
      <div className="flex flex-row justify-end gap-10 pt-10">
        <Button variant="solid" colorScheme="red">
          Cancel
        </Button>
        <Button variant="solid" colorScheme="blue">
          Update
        </Button>
      </div>
    </div>
  );
}
