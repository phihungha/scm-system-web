'use client';

import { uploadFile } from '@/app/api/file-upload';
import {
  getSupply,
  getSupplyImageUploadInfo,
  updateSupply,
} from '@/app/api/supply';
import { LoadingPage } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { SupplyCreateParams } from '@/app/models/supply';
import { DetailsPageProps } from '@/app/types/page-props';
import { dateToFullFormat } from '@/app/utils/time-formats';
import { showFailToast, showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SupplyForm from '../components/SupplyForm';

export default function SupplyDetailsPage({ params }: DetailsPageProps) {
  const itemId = params.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const queryKey = ['supplies', itemId];

  const { data: item } = useQuery({
    queryKey,
    queryFn: () => getSupply(itemId),
  });

  const { mutate: updateItem, isLoading: isUpdateLoading } = useMutation(
    updateSupply,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Update succeed!' });
      },
    },
  );

  const [imageFile, setImageFile] = useState<File | null | undefined>();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onSubmit = async (input: SupplyCreateParams) => {
    let imageName = input.imageName;

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
    } else if (imageFile === null) {
      imageName = undefined;
      setImageFile(undefined);
    }

    updateItem({ ...input, id: itemId, imageName });
  };

  const isLoading = isUpdateLoading || isImageUploading;

  if (item === undefined) {
    return <LoadingPage />;
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Supply #{item.id}</TitleText>
          <SubtitleText>
            Manage and view the details of this supply.
          </SubtitleText>
          <SubtitleText fontStyle="italic">
            Created on {dateToFullFormat(item.createTime)}.{' '}
            {item.updateTime &&
              `Last updated on ${dateToFullFormat(item.updateTime)}`}
          </SubtitleText>
        </Stack>

        <SupplyForm
          item={item}
          isLoading={isLoading}
          imageFile={imageFile}
          onImageFileSelected={setImageFile}
          onSubmit={onSubmit}
        />
      </Stack>
    </Box>
  );
}
