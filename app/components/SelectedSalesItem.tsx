'use client';
import React, { useState } from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Card,
  Stack,
  Image,
  CardBody,
  Heading,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import { BsXLg } from 'react-icons/bs';
import { getProduct2 } from '../api/productApi';
import { useQuery } from 'react-query';
import { ItemInput, PriceInput } from '../types/sales';

interface OrderProps {
  price : PriceInput;
  handleDelete: (id: number) => void;
}

export default function SelectedSalesItem(item: OrderProps) {
  const [quantity, setQuantity] = useState<number>(item.price.quantity);
  const { data: product } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct2(`${item.price.itemId}`),
  });
  if (product === undefined) {
    return <>Still loading...</>;
  }
  item.price.price = product.price;
  function handleChange(quantity: number) {
    item.price.quantity = quantity;
    setQuantity(quantity);
  }

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={product.imageUrl}
        alt={product.name}
      />

      <Stack width="full">
        <CardBody>
          <Heading size="lg">{product.name}</Heading>
          <Stack>
            <Stack pt={5} alignItems="center" direction={'row'}>
              <Text fontSize={'xl'}>Quantity:</Text>
              <Box>
                <NumberInput
                  value={quantity}
                  onChange={(quantity: number) => handleChange(quantity)}
                  min={1}
                  max={1000}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Stack>
            <Stack alignItems="center" direction={'row'}>
              <Text fontSize={'xl'}>Unit:</Text>
              <Text fontSize={'xl'}>{product.unit}</Text>
            </Stack>
            <Stack alignItems="center" direction={'row'}>
              <Text fontSize={'xl'}>Price:</Text>
              <Text fontSize={'xl'}>{product.price}</Text>
            </Stack>
          </Stack>
        </CardBody>
      </Stack>
      <div className="self-center p-5">
        <Button
          onClick={() => item.handleDelete(item.price.itemId)}
          variant="solid"
          colorScheme="white"
        >
          <BsXLg color="black" />
        </Button>
      </div>
    </Card>
  );
}
