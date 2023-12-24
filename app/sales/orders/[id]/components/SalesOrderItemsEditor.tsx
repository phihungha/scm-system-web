'use client';

import { getProducts } from '@/app/api/product';
import ItemsEditor from '@/app/components/ItemsEditor';
import { SalesOrderItem } from '@/app/models/sales-order';
import { Box, Text } from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import { useQuery } from 'react-query';
import SalesOrderItemEditCard from './SalesOrderItemEditCard';

export interface SalesOrderItemsEditorProps {
  items: SalesOrderItem[];
  onItemsChange: (value: SalesOrderItem[]) => void;
}

export default function SalesOrderItemsEditor({
  items,
  onItemsChange,
}: SalesOrderItemsEditorProps) {
  const { data: products } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProducts(),
  });

  const createNewItem = (id: number): SalesOrderItem => {
    const product = products?.find((i) => i.id === id);

    if (!product) {
      throw new Error('Product ID not found.');
    }

    return {
      itemId: product.id,
      product,
      quantity: 1,
      unit: product.unit,
      unitPrice: product.price,
      totalPrice: product.price,
    };
  };

  const itemAddSelections = products?.map((product) => (
    <AutoCompleteItem
      key={product.id}
      label={product.name}
      value={product.id}
      textTransform="capitalize"
    ></AutoCompleteItem>
  ));

  return (
    <Box pt={10}>
      <Text
        fontSize={'3xl'}
        color={'black.500'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        mb={'4'}
        pb={4}
      >
        Items Details
      </Text>

      <ItemsEditor
        items={items}
        onItemsChange={onItemsChange}
        createNewItem={createNewItem}
        getItemId={(i) => i.itemId}
        itemAddSelections={itemAddSelections}
      >
        {(onQuantityChange, onDelete) =>
          items.map((item) => (
            <SalesOrderItemEditCard
              key={item.itemId}
              item={item}
              onQuantityChange={onQuantityChange}
              onDelete={onDelete}
            />
          ))
        }
      </ItemsEditor>
    </Box>
  );
}
