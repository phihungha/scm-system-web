'use client';

import { Image, Card, Text, CardBody, Heading, Stack } from '@chakra-ui/react';
import { IProductResponse } from '../types/product';

interface ProductProps {
  product: IProductResponse;
}

export default function OrderItem({ product }: ProductProps) {
  return (
    <Card
      width="full"
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt={product.name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{product.name}</Heading>
          <Text pt={5}>Unit: {product.unit}</Text>
          <Text>Price: {product.price}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
}
