'use client';

import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import CurrencyFormat from '../utils/currency-formats';

interface AutoCompleteItemPreviewProps {
  name: string;
  price: number;
  imageUrl?: string;
}

export default function AutoCompleteItemPreview(
  props: AutoCompleteItemPreviewProps,
) {
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
        src={props.imageUrl}
        alt={props.name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{props.name}</Heading>
          <Text>Price: {CurrencyFormat.format(props.price)}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
}
