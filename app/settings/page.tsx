'use client';

import { getConfig, setConfig } from '@/app/api/config';
import { LoadingPage } from '@/app/components/spinners';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Stack, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CustomerForm from '../settings/component/form';

interface CustomerDetailsPageProps {
  params: {
    id: number;
  };
}

export default function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  const itemId = params.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const queryKey = ['config', itemId];

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
        <CustomerForm
          item={item}
          isLoading={isLoading}
          onSubmit={(input) => updateItem(input)}
        />
      </Stack>
    </Box>
  );
}
