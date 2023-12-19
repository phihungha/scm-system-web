'use client';
import { useQuery } from 'react-query';
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
import { getAllProducts, getAllProducts2 } from '../api/productApi';
import { IProductResponse } from '../types/product';
import { ItemInput, PriceInput } from '../types/sales';

interface ItemsProps {
  selectedPrice: PriceInput[];
  setSelectedPrice: (prices: PriceInput[]) => void;
}

export default function ItemsInfo(items: ItemsProps) {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts2(),
  });
  const [selectedProduct, setSelectedProduct] = useState<number[]>([]);
  const onAdd = () => {
    const currentItems: number[] = [];
    items.selectedPrice.forEach((item: PriceInput) => {
      currentItems.push(item.itemId);
    });
    const priceItems: PriceInput[] = [];
    selectedProduct.forEach((id: number) => {
      if (!currentItems.includes(id)) {
        priceItems.push(new PriceInput(id, 1, 1));
      }
    });
    items.setSelectedPrice(items.selectedPrice.concat(priceItems));
  };
  function handleDelete(id: number) {
    const newList = items.selectedPrice.filter((item) => item.itemId !== id);
    items.setSelectedPrice(newList);
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
            multiple
            onChange={(product: number[]) => setSelectedProduct(product)}
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
          <Button mt={4} onClick={onAdd} colorScheme="blue" size="lg">
            Add
          </Button>
        </FormControl>
      </Flex>

      <List pt={5} spacing={4}>
        {items.selectedPrice?.map((item: PriceInput) => (
          <ListItem>
            <div key={item.itemId}>
              <SelectedSalesItem price={item} handleDelete={handleDelete} />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
