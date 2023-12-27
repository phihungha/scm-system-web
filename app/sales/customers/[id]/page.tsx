'use client';

import { getCustomer, updateCustomer } from '@/app/api/customer';
import { LoadingPage } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { dateToFullFormat } from '@/app/utils/time-formats';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Stack, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CustomerForm from '../../customers/components/customerForm';

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

  const queryKey = ['productfacilities', itemId];

  const { data: item } = useQuery({
    queryKey,
    queryFn: () => getCustomer(itemId),
  });

  const { mutate: updateItem, isLoading } = useMutation(updateCustomer, {
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

        <CustomerForm
          item={item}
          isLoading={isLoading}
          onSubmit={(input) => updateItem({ id: itemId, ...input })}
        />
      </Stack>
    </Box>
  );
}
