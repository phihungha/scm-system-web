'use client';

import { ActionButton } from '@/app/components/buttons';
import {
  ProductionFacility,
  ProductionFacilityCreateParams,
} from '@/app/models/production-facility';
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

export interface FacilitiesFormProps {
  item?: ProductionFacility;
  isLoading?: boolean;
  onSubmit: (input: ProductionFacilityCreateParams) => void;
}

export default function SupplyForm(props: FacilitiesFormProps) {
  const item = props.item;

  const initialFormValues = {
    name: item?.name ?? '',
    description: item?.name ?? '',
    location: item?.location ?? '',
    email: item?.email ?? '',
    phoneNumber: item?.phoneNumber ?? '',
    isActive: item?.isActive ?? true,
  };

  const formValidationSchema = object({
    name: string().label('Name').required(),
    description: string().label('Description').required(),
    location: string().label('Location').required(),
    email: string().label('Email').required().email(),
    phoneNumber: number().label('PhoneNumber'),
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
            <FormControl isInvalid={!!errors.location && touched.location}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Field
                as={Input}
                id="location"
                name="location"
                variant="filled"
              />
              <FormErrorMessage>{errors.location}</FormErrorMessage>
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

            <FormControl>
              <HStack spacing={2}>
                <Field type="checkbox" id="isActive" name="isActive" />
                <Text>Active</Text>
              </HStack>
            </FormControl>
            <Flex justify="end" mt={5} gap={5}>
              <Link href="/production/facilities">
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
