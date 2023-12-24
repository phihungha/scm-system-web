import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BsXLg } from 'react-icons/bs';

export interface ItemEditCardProps {
  id: number;
  quantity: number;
  name: string;
  unit: string;
  imageUrl?: string;
  children: React.ReactNode;
  onDelete: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

export default function ItemEditCard(props: ItemEditCardProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        w={{ base: '100%', sm: '200px' }}
        src={props.imageUrl}
        alt={props.name}
      />

      <CardBody>
        <Text fontWeight="bold" fontSize="xl">
          {props.name}
        </Text>

        <Stack mt={3} spacing={3}>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Text fontWeight="bold">Quantity:</Text>
            <Box>
              <NumberInput
                value={props.quantity}
                onChange={(_, value) =>
                  // Don't update if number box is empty.
                  value && props.onQuantityChange(props.id, value)
                }
                isRequired={true}
                min={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Text>{props.unit}</Text>
          </Stack>

          {props.children}
        </Stack>
      </CardBody>

      <div className="self-center p-5">
        <Button
          onClick={() => props.onDelete(props.id)}
          variant="solid"
          colorScheme="white"
        >
          <BsXLg color="black" />
        </Button>
      </div>
    </Card>
  );
}
