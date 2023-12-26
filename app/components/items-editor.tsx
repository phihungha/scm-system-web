'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useState } from 'react';
import { BsXLg } from 'react-icons/bs';

export interface OrderItemsPanelProps<T> {
  items: T[];
  isDisabled?: boolean;
  onItemsChange: (value: T[]) => void;
}

export type OnItemChangeFunc<T> = (item: T) => void;

export interface ItemsEditorProps<T> {
  name?: string;
  id?: string;
  items: T[];
  isDisabled?: boolean;
  onItemsChange: (value: T[]) => void;
  createNewItem: (id: number) => T;
  getItemId: (item: T) => number;
  itemAddSelections: React.ReactNode;
  children: (
    onQuantityChange: OnItemChangeFunc<T>,
    onDelete: OnItemChangeFunc<T>,
  ) => React.ReactNode[];
}

export function ItemsEditor<T>(props: ItemsEditorProps<T>) {
  const items = props.items;
  const getId = props.getItemId;
  const onItemsChange = props.onItemsChange;

  const [newItemId, setNewItemId] = useState<number | undefined>();

  const onItemAdd = () => {
    if (newItemId) {
      onItemsChange([...items, props.createNewItem(newItemId)]);
    }
  };

  function onItemDelete(item: T) {
    const updatedItems = items.filter((i) => getId(i) !== getId(item));
    onItemsChange(updatedItems);
  }

  function onItemQuantityChange(item: T) {
    const updatedItems = [...items];
    const updatedItemIdx = updatedItems.findIndex(
      (i) => getId(i) == getId(item),
    );
    updatedItems[updatedItemIdx] = item;
    onItemsChange(updatedItems);
  }

  return (
    <Box>
      <Flex align="center" gap={3}>
        <AutoComplete openOnFocus onChange={(id: string) => setNewItemId(+id)}>
          <AutoCompleteInput
            id={props.id}
            name={props.name}
            placeholder="Enter name of the item to add..."
            h={50}
            variant="filled"
            isDisabled={props.isDisabled}
          />
          <AutoCompleteList>{props.itemAddSelections}</AutoCompleteList>
        </AutoComplete>

        <Button
          colorScheme="blue"
          size="lg"
          isDisabled={props.isDisabled}
          onClick={onItemAdd}
        >
          Add
        </Button>
      </Flex>

      <Stack pt={5} spacing={4}>
        {props.children(onItemQuantityChange, onItemDelete)}
      </Stack>
    </Box>
  );
}

export interface OrderItemEditCardProps<T> {
  item: T;
  isDisabled?: boolean;
  onDelete: (item: T) => void;
  onQuantityChange: (item: T) => void;
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
  onQuantityChange: (id: number, quantity: number) => void;
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
                isRequired={true}
                min={1}
                value={props.quantity}
                isDisabled={props.isDisabled}
                onChange={(_, value) =>
                  // Don't update if number box is empty.
                  value && props.onQuantityChange(props.id, value)
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
