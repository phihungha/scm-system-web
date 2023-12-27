'use client';

import { ActionButton } from '@/app/components/buttons';
import { Customer, CustomerCreateParams } from '@/app/models/customer';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { boolean, number, object, string } from 'yup';

export interface CustomerFormProps {
  item?: Customer;
  isLoading?: boolean;
  onSubmit: (input: CustomerCreateParams) => void;
}

export default function CustomerForm(props: CustomerFormProps) {
  const item = props.item;

  // Load các vendor để chọn trong combobox. Bỏ đoạn này đi nếu ko có combobox.

  // Các giá trị ban đầu của form.
  const initialFormValues = {
    name: item?.name ?? '',
    description: item?.name ?? '',
    defaultLocation: item?.defaultLocation ?? '',
    email: item?.email ?? '',
    phoneNumber: item?.phoneNumber ?? '',
    contactPerson: item?.contactPerson ?? '',
    isActive: item?.isActive ?? true,
  };

  // Validation rules.
  const formValidationSchema = object({
    name: string().label('Name').required(),
    description: string().label('Description').required(),
    defaultLocation: string().label('DefaultLocation').required(),
    email: string().label('Email').required(),
    phoneNumber: number().label('PhoneNumber'),
    contactPerson: string().label('ContactPerson').required(),
    isActive: boolean().label('Is active'),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(input) => props.onSubmit(input)}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <Stack spacing={5}>
            {/* Thay errors.name và touched.name thành property tương ứng */}
            <FormControl isInvalid={!!errors.name && touched.name}>
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="name">Name</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field as={Input} id="name" name="name" variant="filled" />
              {/* Thay errors.name thành property tương ứng */}
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.description && touched.description}
            >
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="description">Description</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field
                as={Input}
                id="description"
                name="description"
                variant="filled"
              />
              {/* Thay errors.name thành property tương ứng */}
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.defaultLocation && touched.defaultLocation}
            >
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="defaultLocation">DefaultLocation</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field
                as={Input}
                id="defaultLocation"
                name="defaultLocation"
                variant="filled"
              />
              {/* Thay errors.name thành property tương ứng */}
              <FormErrorMessage>{errors.defaultLocation}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email && touched.email}>
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="email">Email</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field as={Input} id="email" name="email" variant="filled" />
              {/* Thay errors.name thành property tương ứng */}
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.phoneNumber && touched.phoneNumber}
            >
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="phoneNumber">PhoneNumber</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field
                as={Input}
                id="phoneNumber"
                name="phoneNumber"
                variant="filled"
              />
              {/* Thay errors.name thành property tương ứng */}
              <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.contactPerson && touched.contactPerson}
            >
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="contactPerson">ContactPerson</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field
                as={Input}
                id="contactPerson"
                name="contactPerson"
                variant="filled"
              />
              {/* Thay errors.name thành property tương ứng */}
              <FormErrorMessage>{errors.contactPerson}</FormErrorMessage>
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
        </form>
      )}
    </Formik>
  );
}
