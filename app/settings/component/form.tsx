'use client';

import { ActionButton } from '@/app/components/buttons';
import { Config, ConfigParams } from '@/app/models/config';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Stack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { number, object } from 'yup';

export interface SettingsFormProps {
  item: Config;
  isLoading?: boolean;
  onSubmit: (input: ConfigParams) => void;
}

export default function SettingsForm(props: SettingsFormProps) {
  const item = props.item;

  const initialFormValues = {
    vatRate: item.vatRate * 100,
  };

  const formValidationSchema = object({
    vatRate: number().label('vatRate'),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(input) => props.onSubmit({ vatRate: input.vatRate / 100 })}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.vatRate && touched.vatRate}>
              <FormLabel htmlFor="vatRate">vatRate</FormLabel>
              <InputGroup>
                <Field
                  as={Input}
                  id="vatRate"
                  name="vatRate"
                  variant="filled"
                />
                <InputRightAddon>%</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{errors.vatRate}</FormErrorMessage>
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
