'use client';

import { getVendors } from '@/app/api/vendor';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import ImageSelector from '@/app/components/image-selector';
import { NormalSpinner } from '@/app/components/spinners';
import { Supply, SupplyCreateParams } from '@/app/models/supply';
import { currencySymbol } from '@/app/utils/currency-formats';
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
import { Field, Formik } from 'formik';
import { useQuery } from 'react-query';
import { boolean, number, object, string } from 'yup';

export interface SupplyFormProps {
  item?: Supply;
  isLoading?: boolean;
  imageFile?: File | null;
  onImageFileSelected: (file?: File | null) => void;
  onSubmit: (input: SupplyCreateParams) => void;
}

export default function SupplyForm(props: SupplyFormProps) {
  const item = props.item;

  // Load các vendor để chọn trong combobox. Bỏ đoạn này đi nếu ko có combobox.
  const { data: vendors } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => getVendors(),
  });

  // Các giá trị ban đầu của form.
  const initialFormValues = {
    vendorId: item?.vendorId,
    expirationMonth: item?.expirationMonth ?? 12,
    name: item?.name ?? '',
    price: item?.price ?? 1000,
    unit: item?.unit ?? 'Item(s)',
    description: item?.description,
    isActive: item?.isActive ?? true,
  };

  // Validation rules.
  const formValidationSchema = object({
    vendorId: number().label('Vendor').required(),
    expirationMonth: number().label('Expiration month').required().min(1),
    name: string().label('Name').required(),
    price: number().label('Price').required().min(1000),
    unit: string().label('Unit').required(),
    description: string().label('Description'),
    isActive: boolean().label('Is active'),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(input) =>
        props.onSubmit({ ...input, vendorId: input.vendorId! })
      }
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <Flex gap={45}>
            <ImageSelector
              size={250}
              url={item?.imageUrl}
              name={item?.imageName}
              file={props.imageFile}
              onSelect={props.onImageFileSelected}
            />

            <Stack spacing={5} flex={1}>
              <FormControl isInvalid={!!errors.vendorId && touched.vendorId}>
                <FormLabel htmlFor="vendor">Vendor:</FormLabel>
                {vendors ? (
                  <AutoCompleteSelect
                    name="vendor"
                    items={vendors}
                    value={values.vendorId}
                    placeholder="Select a vendor..."
                    onChange={(i) => setFieldValue('vendorId', i)}
                  />
                ) : (
                  <NormalSpinner />
                )}
                <FormErrorMessage>{errors.vendorId}</FormErrorMessage>
              </FormControl>

              {/* Thay errors.name và touched.name thành property tương ứng */}
              <FormControl isInvalid={!!errors.name && touched.name}>
                {/* Thay tên field tương ứng */}
                <FormLabel htmlFor="name">Name</FormLabel>
                {/* Thay id và name thành property tương ứng */}
                <Field as={Input} id="name" name="name" variant="filled" />
                {/* Thay errors.name thành property tương ứng */}
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
                <Link href="/supplies">
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
