'use client';
import { ActionButton } from '@/app/components/buttons';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { number, object } from 'yup';
import { getConfig, setConfig } from '../api/config';
import { ConfigParams } from '../models/config';

import { showSuccessToast } from '@/app/utils/toast-messages';
import { useToast } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { SimpleItemQueryParams } from '../models/general';
export default function CustomerPage() {
  const [initialFormValues, setInitialFormValues] = useState<ConfigParams>({
    vatRate: 0,
  });
  const [formValidationSchema, setFormValidationSchema] = useState(
    object({
      vatrate: number().label('Vatrate').required(),
    }),
  );
  const toast = useToast();
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<SimpleItemQueryParams>({
    searchTerm: '',
  });

  const { mutate: createItem, isLoading } = useMutation(setConfig, {
    onSuccess: (resp) => {
      showSuccessToast(toast, { title: 'update successfully created' });
    },
  });
  const { data: items } = useQuery({
    queryKey: ['config', queryParams],
    queryFn: () => getConfig(),
  });

  useEffect(() => {
    if (items) {
      setInitialFormValues({
        vatRate: items.vatRate * 100 ?? 1,
      });
    }
  }, [items]);

  return (
    <Stack spacing={5}>
      {items && (
        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={(input: ConfigParams) => createItem(input)}
        >
          {({ handleSubmit, errors, touched, values, setFieldValue }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <Input
                  style={{ width: '100px' }}
                  value={items?.vatRate * 100}
                ></Input>
                <FormControl isInvalid={!!errors.vatRate && touched.vatRate}>
                  {/* Thay tên field tương ứng */}
                  <FormLabel htmlFor="vatrate">Vatrate</FormLabel>
                  {/* Thay id và name thành property tương ứng */}
                  <Field
                    as={Input}
                    id="vatrate"
                    name="vatrate"
                    variant="filled"
                  />
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
                    isLoading={isLoading}
                  >
                    Save
                  </ActionButton>
                </Flex>
              </Stack>
            </form>
          )}
        </Formik>
      )}
    </Stack>
  );
}
