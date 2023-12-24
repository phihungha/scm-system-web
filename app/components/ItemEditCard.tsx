import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
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
        <Heading size="lg">{props.name}</Heading>
        <Stack mt={5} spacing={3}>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Text fontWeight="bold" fontSize="xl">
              Quantity:
            </Text>
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
            <Text fontSize={'xl'}>{props.unit}</Text>
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
