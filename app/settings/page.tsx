'use client';

import { getConfig, setConfig } from '@/app/api/config';
import { LoadingPage } from '@/app/components/spinners';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Stack, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SettingsForm from '../settings/component/form';

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const queryKey = ['config'];

  const { data: item } = useQuery({
    queryKey,
    queryFn: () => getConfig(),
  });

  const { mutate: updateItem, isLoading } = useMutation(setConfig, {
    onSuccess: (resp) => {
      queryClient.setQueryData(queryKey, resp);
      showSuccessToast(toast, { title: 'Update succeed!' });
    },
  });

  if (item === undefined) {
    return <LoadingPage />;
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <SettingsForm
          item={item}
          isLoading={isLoading}
          onSubmit={(input) => updateItem(input)}
        />
      </Stack>
    </Box>
  );
}
