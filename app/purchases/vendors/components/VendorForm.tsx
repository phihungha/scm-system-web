'use client';

import { ActionButton } from '@/app/components/buttons';
import { Vendor, VendorCreateParams } from '@/app/models/vendor';
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

export interface VendorFormProps {
  item?: Vendor;
  isLoading?: boolean;
  onSubmit: (input: VendorCreateParams) => void;
}

export default function VendorForm(props: VendorFormProps) {
  const item = props.item;

  const initialFormValues = {
    name: item?.name ?? '',
    description: item?.name ?? '',
    defaultLocation: item?.defaultLocation ?? '',
    email: item?.email ?? '',
    phoneNumber: item?.phoneNumber ?? '',
    contactPerson: item?.contactPerson ?? '',
    isActive: item?.isActive ?? true,
  };

  const formValidationSchema = object({
    name: string().label('Name').required(),
    description: string().label('Description').required(),
    defaultLocation: string().label('Default location').required(),
    email: string().label('Email').required().email(),
    phoneNumber: number().label('Phone number'),
    contactPerson: string().label('Contact person').required(),
    isActive: boolean().label('Is active'),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(input) => props.onSubmit(input)}
    >
      {({ handleSubmit, errors, touched }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.name && touched.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Field as={Input} id="name" name="name" variant="filled" />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.description && touched.description}
            >
              <FormLabel htmlFor="description">Description</FormLabel>
              <Field
                as={Input}
                id="description"
                name="description"
                variant="filled"
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.defaultLocation && touched.defaultLocation}
            >
              <FormLabel htmlFor="defaultLocation">Default location</FormLabel>
              <Field
                as={Input}
                id="defaultLocation"
                name="defaultLocation"
                variant="filled"
              />
              <FormErrorMessage>{errors.defaultLocation}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field as={Input} id="email" name="email" variant="filled" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.phoneNumber && touched.phoneNumber}
            >
              <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
              <Field
                as={Input}
                id="phoneNumber"
                name="phoneNumber"
                variant="filled"
              />
              <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.contactPerson && touched.contactPerson}
            >
              <FormLabel htmlFor="contactPerson">Contact person</FormLabel>
              <Field
                as={Input}
                id="contactPerson"
                name="contactPerson"
                variant="filled"
              />
              <FormErrorMessage>{errors.contactPerson}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <HStack spacing={2}>
                <Field type="checkbox" id="isActive" name="isActive" />
                <Text>Active</Text>
              </HStack>
            </FormControl>
            <Flex justify="end" mt={5} gap={5}>
              <Link href="/purchases/vendors">
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
