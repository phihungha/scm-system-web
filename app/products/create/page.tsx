'use client';

import { uploadFile } from '@/app/api/file-upload';
import { createProduct, getProductImageUploadInfo } from '@/app/api/product';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { ProductCreateParams } from '@/app/models/product';
import { showFailToast, showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import ProductForm from '../components/ProductForm';

export default function ProductCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading: isCreateLoading } = useMutation(
    createProduct,
    {
      onSuccess: (resp) => {
        showSuccessToast(toast, { title: 'Item successfully created' });
        router.push(resp.id.toString());
      },
    },
  );

  const [imageFile, setImageFile] = useState<File | null | undefined>();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onSubmit = async (input: ProductCreateParams) => {
    let imageName = undefined;

    if (imageFile) {
      const uploadInfo = await getProductImageUploadInfo();

      setIsImageUploading(true);
      const resp = await uploadFile(uploadInfo.uploadUrl, imageFile);
      setIsImageUploading(false);

      if (!resp.ok) {
        return showFailToast(toast, { title: 'Failed to upload image.' });
      }

      setImageFile(undefined);
      imageName = uploadInfo.name;
    }

    createItem({ ...input, imageName });
  };

  const isLoading = isCreateLoading || isImageUploading;

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create product</TitleText>
        <SubtitleText>
          Create a new product. Please enter the information below.
        </SubtitleText>
      </Stack>

      <ProductForm
        isLoading={isLoading}
        imageFile={imageFile}
        onImageFileSelected={setImageFile}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
