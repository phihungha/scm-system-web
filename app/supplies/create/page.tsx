'use client';

import { uploadFile } from '@/app/api/file-upload';
import { createSupply, getSupplyImageUploadInfo } from '@/app/api/supply';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { SupplyCreateParams } from '@/app/models/supply';
import { showFailToast, showSuccessToast } from '@/app/utils/toast-messages';
import { Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import SupplyForm from '../components/SupplyForm';

export default function SupplyCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading: isCreateLoading } = useMutation(
    createSupply,
    {
      onSuccess: (resp) => {
        showSuccessToast(toast, { title: 'Item successfully created' });
        router.push(resp.id.toString());
      },
    },
  );

  const [imageFile, setImageFile] = useState<File | null | undefined>();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onSubmit = async (input: SupplyCreateParams) => {
    let imageName = undefined;

    if (imageFile) {
      const uploadInfo = await getSupplyImageUploadInfo();

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
        <TitleText>Create supply</TitleText>
        <SubtitleText>
          Create a new supply. Please enter the information below.
        </SubtitleText>
      </Stack>

      <SupplyForm
        isLoading={isLoading}
        imageFile={imageFile}
        onImageFileSelected={setImageFile}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
