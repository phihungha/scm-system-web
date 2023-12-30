'use client';

import { getSupplies } from '@/app/api/supply';
import { AutoCompleteItemPreview } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import ImageSelector from '@/app/components/image-selector';
import {
  ItemEditCard,
  OrderItemEditCardProps,
} from '@/app/components/item-cards';
import {
  ItemsEditor,
  OrderItemsPanelProps,
} from '@/app/components/items-editor';
import {
  Product,
  ProductCreateParams,
  SupplyCostItem,
} from '@/app/models/product';
import CurrencyFormat, { currencySymbol } from '@/app/utils/currency-formats';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import { Field, Formik } from 'formik';
import { useQuery } from 'react-query';
import { array, boolean, number, object, string } from 'yup';

export interface ProductFormProps {
  item?: Product;
  isLoading?: boolean;
  imageFile?: File | null;
  onImageFileSelected: (file?: File | null) => void;
  onSubmit: (input: ProductCreateParams) => void;
}

export default function ProductForm(props: ProductFormProps) {
  const item = props.item;

  const initialFormValues = {
    name: item?.name ?? '',
    imageName: item?.imageName,
    price: item?.price ?? 1000,
    unit: item?.unit ?? 'Item(s)',
    expirationMonth: item?.expirationMonth ?? 12,
    netWeight: item?.netWeight ?? 1,
    supplyCostItems: item?.supplyCostItems ?? [],
    miscCost: item?.miscCost ?? 1000,
    description: item?.description,
    isActive: item?.isActive ?? true,
  };

  const formValidationSchema = object({
    expirationMonth: number().label('Expiration month').required().min(1),
    name: string().label('Name').required(),
    price: number().label('Price').required().min(1000),
    netWeight: number().label('Net weight').required().min(1),
    supplyCostItems: array().label('Supply cost items').required().min(1),
    miscCost: number().label('Price').required().min(1000),
    unit: string().label('Unit').required(),
    description: string().label('Description'),
    isActive: boolean().label('Is active'),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={props.onSubmit}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <Flex gap={45}>
            <ImageSelector
              size={250}
              url={item?.imageUrl}
              file={props.imageFile}
              onSelect={props.onImageFileSelected}
            />

            <Stack flex={1} spacing={5}>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" variant="filled" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.price && touched.price}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <InputGroup>
                  <Field as={Input} id="price" name="price" variant="filled" />
                  <InputRightAddon>{currencySymbol}</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors.price}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.netWeight && touched.netWeight}>
                <FormLabel htmlFor="netWeight">Net weight</FormLabel>
                <InputGroup>
                  <Field
                    as={Input}
                    id="netWeight"
                    name="netWeight"
                    variant="filled"
                  />
                  <InputRightAddon>Kg</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors.netWeight}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={values.supplyCostItems.length < 1}>
                <FormLabel htmlFor="supplyCosts">Supply cost items:</FormLabel>
                <SupplyCostItemsPanel
                  items={values.supplyCostItems}
                  onItemsChange={(i) => setFieldValue('supplyCostItems', i)}
                />
                <FormErrorMessage>
                  {values.supplyCostItems.length < 1 &&
                    'A product must consume supplies to produce'}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.miscCost && touched.miscCost}>
                <FormLabel htmlFor="miscCost">Miscellaneous cost</FormLabel>
                <InputGroup>
                  <Field
                    as={Input}
                    id="miscCost"
                    name="miscCost"
                    variant="filled"
                  />
                  <InputRightAddon>{currencySymbol}</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors.miscCost}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.unit && touched.unit}>
                <FormLabel htmlFor="unit">Unit</FormLabel>
                <Field as={Input} id="unit" name="unit" variant="filled" />
                <FormErrorMessage>{errors.unit}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.expirationMonth && touched.expirationMonth}
              >
                <FormLabel htmlFor="expirationMonth">
                  Expiration month
                </FormLabel>
                <NumberInput
                  id="expirationMonth"
                  name="expirationMonth"
                  allowMouseWheel
                  min={1}
                  value={values.expirationMonth}
                  onChange={(_, value) =>
                    // Don't update if number box is empty.
                    value && setFieldValue('expirationMonth', value)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{errors.expirationMonth}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.description && touched.description}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Field
                  as={Textarea}
                  height="250"
                  id="description"
                  name="description"
                  variant="filled"
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <HStack spacing={2}>
                  <Field type="checkbox" id="isActive" name="isActive" />
                  <Text>Active</Text>
                </HStack>
              </FormControl>

              <Flex justify="end" mt={5} gap={5}>
                <Link href="/products">
                  <ActionButton size="lg">Close</ActionButton>
                </Link>

                <ActionButton
                  type="submit"
                  size="lg"
                  colorScheme="blue"
                  isLoading={props.isLoading}
                >
                  Save
                </ActionButton>
              </Flex>
            </Stack>
          </Flex>
        </form>
      )}
    </Formik>
  );
}

function SupplyCostItemsPanel(props: OrderItemsPanelProps<SupplyCostItem>) {
  const items = props.items;

  const { data: supplies } = useQuery({
    queryKey: ['supplies'],
    queryFn: () => getSupplies(),
  });

  const createNewItem = (id: number): SupplyCostItem => {
    const supply = supplies?.find((i) => i.id === id);

    if (!supply) {
      throw new Error('Supply ID not found.');
    }

    return {
      supplyId: supply.id,
      supply: supply,
      quantity: 1,
      unit: supply.unit,
      unitCost: supply.price,
      totalCost: supply.price,
    };
  };

  const addedItemIds = new Set(items.map((i) => i.supplyId));

  const itemAddSelections = supplies
    ?.filter(({ id }) => !addedItemIds.has(id))
    .map((supply) => (
      <AutoCompleteItem
        key={supply.id}
        label={supply.name}
        value={supply.id}
        textTransform="capitalize"
      >
        <AutoCompleteItemPreview
          name={supply.name}
          price={supply.price}
          imageUrl={supply.imageUrl}
        />
      </AutoCompleteItem>
    ));

  return (
    <Stack spacing={5}>
      <ItemsEditor
        id="items"
        name="items"
        items={items}
        getItemId={(i) => i.supplyId}
        itemAddSelections={itemAddSelections}
        onItemsChange={props.onItemsChange}
        createNewItem={createNewItem}
      >
        {(onQuantityChange, onDelete) =>
          items.map((item) => (
            <SupplyCostItemEditCard
              key={item.supplyId}
              item={item}
              isDisabled={props.isDisabled}
              onChange={onQuantityChange}
              onDelete={onDelete}
            />
          ))
        }
      </ItemsEditor>
    </Stack>
  );
}

function SupplyCostItemEditCard(props: OrderItemEditCardProps<SupplyCostItem>) {
  const item = props.item;
  const supply = props.item.supply;

  const onQuantityChange = (quantity: number) =>
    props.onChange({
      ...item,
      quantity,
      totalCost: quantity * item.unitCost,
    });

  return (
    <ItemEditCard
      id={supply.id}
      quantity={item.quantity}
      name={supply.name}
      unit={item.unit}
      imageUrl={supply.imageUrl}
      onChange={(_, quantity) => onQuantityChange(quantity)}
      onDelete={() => props.onDelete(item)}
    >
      <Text>Cost: {CurrencyFormat.format(item.unitCost)}</Text>
      <Text>Total cost: {CurrencyFormat.format(item.totalCost)}</Text>
    </ItemEditCard>
  );
}
