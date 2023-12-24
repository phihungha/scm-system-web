'use client';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useState } from 'react';

export type OnItemChangeFunc<T> = (item: T) => void;

export interface ItemsEditorProps<T> {
  items: T[];
  onItemsChange: (value: T[]) => void;
  createNewItem: (id: number) => T;
  getItemId: (item: T) => number;
  itemAddSelections: React.ReactNode;
  children: (
    onQuantityChange: OnItemChangeFunc<T>,
    onDelete: OnItemChangeFunc<T>,
  ) => React.ReactNode[];
}

export default function ItemsEditor<T>(props: ItemsEditorProps<T>) {
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
            placeholder="Enter name of the item to add..."
            h={50}
            variant="filled"
          />
          <AutoCompleteList>{props.itemAddSelections}</AutoCompleteList>
        </AutoComplete>

        <Button onClick={onItemAdd} colorScheme="blue" size="lg">
          Add
        </Button>
      </Flex>

      <Stack pt={5} spacing={4}>
        {props.children(onItemQuantityChange, onItemDelete)}
      </Stack>
    </Box>
  );
}
