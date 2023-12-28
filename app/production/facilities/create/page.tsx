'use client';

import { createProductionFacility } from '@/app/api/production-facility';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import FacilitiesForm from '../../components/FacilitiesForm';

export default function FacilitiesCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading } = useMutation(
    createProductionFacility,
    {
      onSuccess: (resp) => {
        showSuccessToast(toast, { title: 'Item successfully created' });
        router.push(resp.id.toString());
      },
    },
  );

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create Production Facility</TitleText>
        <SubtitleText>
          Create a new Production Facility. Please enter the information below.
        </SubtitleText>
      </Stack>

      <FacilitiesForm isLoading={isLoading} onSubmit={createItem} />
    </Stack>
  );
}
