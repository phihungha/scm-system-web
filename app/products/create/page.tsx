'use client';

import { createProduct } from '@/app/api/product';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import ProductForm from '../components/ProductForm';

export default function ProductCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading } = useMutation(createProduct, {
    onSuccess: (resp) => {
      showSuccessToast(toast, { title: 'Item successfully created' });
      router.push(resp.id.toString());
    },
  });

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create product</TitleText>
        <SubtitleText>
          Create a new product. Please enter the information below.
        </SubtitleText>
      </Stack>

      <ProductForm isLoading={isLoading} onSubmit={createItem} />
    </Stack>
  );
}
