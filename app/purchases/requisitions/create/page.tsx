'use client';

import { getConfig } from '@/app/api/config';
import { createPurchaseRequisition } from '@/app/api/purchase-requisition';
import { getVendors } from '@/app/api/vendor';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import { NormalSpinner } from '@/app/components/spinners';
import { FormLabelText, SubtitleText, TitleText } from '@/app/components/texts';
import { PurchaseRequisitionItem } from '@/app/models/purchase-requisition';
import { Vendor } from '@/app/models/vendor';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Flex, Grid, Link, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import PurchaseRequisitionItemsPanel from '../components/PurchaseRequisitionItemsPanel';
import PurchaseRequisitionTotalsPanel from '../components/PurchaseRequisitionTotalsPanel';

export default function PurchaseRequisitionCreatePage() {
  const toast = useToast();
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | undefined>();
  const [items, setItems] = useState<PurchaseRequisitionItem[]>([]);

  const { mutate: createOrder, isLoading } = useMutation(
    () =>
      createPurchaseRequisition({
        items,
        vendorId: vendor!.id,
      }),
    {
      onSuccess: (resp) => {
        router.push(resp.id.toString());
        showSuccessToast(toast, { title: 'Order successfully created!' });
      },
    },
  );

  const { data: vendors } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => getVendors(),
  });

  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig(),
  });

  const onVendorSelect = (id: number) => {
    const vendor = vendors!.find((i) => i.id === id)!;
    setVendor(vendor);
  };

  const isCreateAllowed = vendor !== undefined && items.length > 0;

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Create Purchase Requisition</TitleText>
          <SubtitleText>
            Create a new purchase requisition. Please enter the information
            below.
          </SubtitleText>
        </Stack>

        <Grid templateRows="repeat(4, 1fr)" templateColumns="300px 1fr" gap={5}>
          <FormLabelText>Vendor:</FormLabelText>
          {vendors ? (
            <AutoCompleteSelect
              id="customer"
              name="customer"
              items={vendors}
              value={vendor?.id}
              placeholder="Vendor must be selected..."
              onChange={onVendorSelect}
            />
          ) : (
            <NormalSpinner />
          )}
        </Grid>

        <PurchaseRequisitionItemsPanel items={items} onItemsChange={setItems} />

        {config ? (
          <PurchaseRequisitionTotalsPanel
            items={items}
            vatRate={config.vatRate}
          />
        ) : (
          <NormalSpinner />
        )}

        <Flex justify="end" mt={5} gap={5}>
          <Link href="/purchases/requisitions">
            <ActionButton size="lg">Close</ActionButton>
          </Link>

          <ActionButton
            size="lg"
            colorScheme="blue"
            isDisabled={!isCreateAllowed}
            isLoading={isLoading}
            onClick={() => createOrder()}
          >
            Create
          </ActionButton>
        </Flex>
      </Stack>
    </Box>
  );
}
