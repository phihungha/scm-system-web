'use client';

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
} from '@chakra-ui/react';

interface OrderProps {
  name: string;
}

export default function SelectedSalesItem({ name }: OrderProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt={name}
      />

      <Stack width="full">
        <CardBody>
          <Heading size="md">{name}</Heading>
          <div className="py-5">
            <NumberInput defaultValue={1} min={1} max={20}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        </CardBody>
      </Stack>
    </Card>
  );
}
