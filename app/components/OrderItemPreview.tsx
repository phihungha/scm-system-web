'use client';

import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Product } from '../models/product';

interface ProductProps {
  product: Product;
}

export default function OrderItemPreview({ product }: ProductProps) {
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
        src={product.imageUrl}
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
