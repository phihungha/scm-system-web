'use client';

import { createCustomer } from '@/app/api/customer';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import CustomerForm from '../components/CustomerForm';

export default function CustomerCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading } = useMutation(createCustomer, {
    onSuccess: (resp) => {
      showSuccessToast(toast, { title: 'Customer successfully created' });
      router.push(resp.id.toString());
    },
  });

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create Customer</TitleText>
        <SubtitleText>
          Create a new Customer. Please enter the information below.
        </SubtitleText>
      </Stack>

      <CustomerForm isLoading={isLoading} onSubmit={createItem} />
    </Stack>
  );
}
