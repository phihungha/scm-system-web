'use client';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import {
  Box,
  Text,
  List,
  ListItem,
  Button,
  Flex,
  FormControl,
} from '@chakra-ui/react';
import OrderItem from '../components/OrderItem';
import SelectedSalesItem from '../components/SelectedSalesItem';
import React, { useState } from 'react';
const products = [
  'Aroduct11',
  'Broduct12',
  'Croduct13',
  'Droduct14',
  'Eroduct15',
];

export default function ItemsInfo() {
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
    <Box pt={10}>
      <Text
        fontSize={{ base: '16px', lg: '20px' }}
        color={'black.500'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        mb={'4'}
        pb={4}
      >
        Items Details
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

      <List pt={5} spacing={4}>
        {selectedProducts.map((product) => (
          <ListItem>
            <div>
              <SelectedSalesItem name={product} />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
