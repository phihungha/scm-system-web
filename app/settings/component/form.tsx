'use client';

import { ActionButton } from '@/app/components/buttons';
import { Config, ConfigParams } from '@/app/models/config';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { number, object } from 'yup';

export interface VendorFormProps {
  item?: Config;
  isLoading?: boolean;
  onSubmit: (input: ConfigParams) => void;
}

export default function VendorForm(props: VendorFormProps) {
  const item = props.item;

  // Load các vendor để chọn trong combobox. Bỏ đoạn này đi nếu ko có combobox.

  // Các giá trị ban đầu của form.
  const initialFormValues = {
    vatRate: item?.vatRate ?? 0,
  };

  // Validation rules.
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
            {/* Thay errors.name và touched.name thành property tương ứng */}
            <FormControl isInvalid={!!errors.vatRate && touched.vatRate}>
              {/* Thay tên field tương ứng */}
              <FormLabel htmlFor="vatRate">vatRate</FormLabel>
              {/* Thay id và name thành property tương ứng */}
              <Field as={Input} id="vatRate" name="vatRate" variant="filled" />
              {/* Thay errors.name thành property tương ứng */}
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
