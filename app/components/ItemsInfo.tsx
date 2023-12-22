'use client';
import { Box, Button, Flex, FormControl, Stack, Text } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getAllProducts } from '../api/productApi';
import OrderItem from '../components/OrderItem';
import SelectedSalesItem from '../sales/components/SelectedSalesItem';
import { IProductResponse } from '../types/product';
import { PriceInput } from '../types/sales';

interface ItemsProps {
  selectedPrice: PriceInput[];
  setSelectedPrice: (value: PriceInput[]) => void;
}

export default function ItemsInfo(items: ItemsProps) {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const onAdd = () => {
    const newItem = new PriceInput(selectedProduct, 1, 0);
    const currentId: number[] = [];
    items.selectedPrice.forEach((item: PriceInput) => {
      currentId.push(item.itemId);
    });
    if (!currentId.includes(selectedProduct)) {
      items.setSelectedPrice(items.selectedPrice.concat(newItem));
    }
  };
  function handleDelete(id: number) {
    const newList = items.selectedPrice.filter((item) => item.itemId !== id);
    items.setSelectedPrice(newList);
  }

  function handleRefresh() {
    const newList: PriceInput[] = [];
    items.setSelectedPrice([]);
    items.setSelectedPrice(items.selectedPrice.concat(newList));
  }

  return (
    <Box pt={10}>
      <Text
        fontSize={'3xl'}
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
            onChange={(product: number) => setSelectedProduct(product)}
          >
            <AutoCompleteInput variant="filled"></AutoCompleteInput>
            <AutoCompleteList>
              {products?.map((product: IProductResponse) => (
                <AutoCompleteItem
                  key={product.id}
                  label={product.name}
                  value={product.id}
                  textTransform="capitalize"
                >
                  <OrderItem product={product} />
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
          <Button mt={4} onClick={() => onAdd()} colorScheme="blue" size="lg">
            Add
          </Button>
        </FormControl>
      </Flex>

      <Stack pt={5} spacing={4}>
        {items.selectedPrice?.map((item: PriceInput) => (
          <SelectedSalesItem
            key={item.itemId}
            handleRefresh={handleRefresh}
            price={item}
            handleDelete={handleDelete}
          />
        ))}
      </Stack>
    </Box>
  );
}
