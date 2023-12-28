'use client';

import { getConfig } from '@/app/api/config';
import { createPurchaseOrder } from '@/app/api/purchase-order';
import { getPurchaseRequisitions } from '@/app/api/purchase-requisition';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import { NormalSpinner } from '@/app/components/spinners';
import { FormLabelText, SubtitleText, TitleText } from '@/app/components/texts';
import { PurchaseOrderItem } from '@/app/models/purchase-order';
import { PurchaseRequisition } from '@/app/models/purchase-requisition';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Flex, Grid, Link, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import PurchaseOrderItemsPanel from '../components/PurchaseOrderItemsPanel';

export default function PurchasesOrderCreatePage() {
  const toast = useToast();
  const router = useRouter();
  const [purchaseRequisitions, setPurchaseRequisitions] =
  useState<PurchaseRequisition[]>([]);
  const { data: requisitions } = useQuery({
    queryKey: ['requisitions'],
    queryFn: () => getPurchaseRequisitions(),
    onSuccess: (resp) =>{
      if(resp){
       
        console.log(purchaseRequisitions);
      }

    }
  });
  const [purchaseRequisition, setPurchaseRequisition] =
    useState<PurchaseRequisition | undefined>();
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);

  const { mutate: createOrder, isLoading } = useMutation(
    () =>
      createPurchaseOrder({
        items,
        purchaseRequisitionId: purchaseRequisition?.id,
      }),
    {
      onSuccess: (resp) => {
        router.push(resp.id.toString());
        showSuccessToast(toast, { title: 'Order successfully created!' });
      },
    },
  );


  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig(),
  });

  const onRequisitionSelect = (id: number) => {
    const requisition = requisitions!.find((i) => i.id === id)!;
    setPurchaseRequisition(requisition);
  };

  const isCreateAllowed = purchaseRequisition !== undefined && items.length > 0;

   function PurchaseItems(props: number | undefined) {
    if(props === undefined)
    {
      return <>Please choose Purchase requisition</>
    }
    else
    {
      return <PurchaseOrderItemsPanel purchaseRequisitionId={purchaseRequisition?.id} props={{items :items, onItemsChange: setItems}} />
    }
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Create purchase order</TitleText>
          <SubtitleText>
            Create a new purchase order. Please enter the information below.
          </SubtitleText>
        </Stack>

        <Grid templateRows="repeat(4, 1fr)" templateColumns="300px 1fr" gap={5}>
          <FormLabelText>Purchase Requisition:</FormLabelText>
          {requisitions ? (
            <AutoCompleteSelect
              id="facility"
              name="facility"
              items={requisitions}
              value={purchaseRequisition?.id}
              placeholder="Purchase requisition must be selected to start..."
              onChange={onRequisitionSelect}
            />
          ) : (
            <NormalSpinner />
          )}
        </Grid>

        <PurchaseItems props={purchaseRequisition?.id}      />  

        <Flex justify="end" mt={5} gap={5}>
          <Link href="/sales/orders">
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


