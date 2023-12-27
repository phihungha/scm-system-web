'use client';

import { createVendor } from '@/app/api/vendor';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import SupplyForm from '../../vendors/components/venderForm';

export default function VendorCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading } = useMutation(createVendor, {
    onSuccess: (resp) => {
      showSuccessToast(toast, { title: 'Vendor successfully created' });
      router.push(resp.id.toString());
    },
  });

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create Vendor</TitleText>
        <SubtitleText>
          Create a new Vendor. Please enter the information below.
        </SubtitleText>
      </Stack>

      <SupplyForm isLoading={isLoading} onSubmit={createItem} />
    </Stack>
  );
}
