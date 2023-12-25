'use client';

import { createSupply } from '@/app/api/supply';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import SupplyForm from '../components/SupplyForm';

export default function SupplyCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading } = useMutation(createSupply, {
    onSuccess: (resp) => {
      showSuccessToast(toast, { title: 'Item successfully created' });
      router.push(resp.id.toString());
    },
  });

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create supply</TitleText>
        <SubtitleText>
          Create a new supply. Please enter the information below.
        </SubtitleText>
      </Stack>

      <SupplyForm isLoading={isLoading} onSubmit={createItem} />
    </Stack>
  );
}
