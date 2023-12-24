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
  imageUrl?: string;
  children: React.ReactNode;
  onDelete: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

export default function ItemEditCard(props: ItemEditCardProps) {
  return (
    <Card>
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={props.imageUrl}
        alt={props.name}
      />

      <Stack width="full">
        <CardBody>
          <Heading size="lg">{props.name}</Heading>
          <Stack>
            <Stack alignItems="center" direction={'row'}>
              <Text fontSize="xl">Quantity:</Text>
              <Box>
                <NumberInput
                  value={props.quantity}
                  onChange={(_, value) =>
                    props.onQuantityChange(props.id, value)
                  }
                  min={1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Stack>

            {props.children}
          </Stack>
        </CardBody>
      </Stack>

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
