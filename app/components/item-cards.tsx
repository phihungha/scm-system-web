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
import { BsXLg } from 'react-icons/bs';
import { fallbackImageUrl } from '../values';

export interface ItemDisplayCardProps {
  name: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

export function ItemDisplayCard(props: ItemDisplayCardProps) {
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
        {props.children}
      </CardBody>
    </Card>
  );
}

export interface OrderItemEditCardProps<T> {
  item: T;
  isDisabled?: boolean;
  onDelete: (item: T) => void;
  onChange: (item: T) => void;
}

export interface ItemEditCardProps {
  id: number;
  quantity: number;
  name: string;
  unit: string;
  imageUrl?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  onDelete: (id: number) => void;
  onChange: (id: number, quantity: number) => void;
}

export function ItemEditCard(props: ItemEditCardProps) {
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
        fallbackSrc={fallbackImageUrl}
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
                id={`item-quantity-${props.id}`}
                name={`item-quantity-${props.id}`}
                allowMouseWheel
                step={10}
                isRequired={true}
                min={1}
                value={props.quantity}
                isDisabled={props.isDisabled}
                onChange={(_, value) =>
                  // Don't update if number box is empty.
                  value && props.onChange(props.id, value)
                }
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
          isDisabled={props.isDisabled}
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
