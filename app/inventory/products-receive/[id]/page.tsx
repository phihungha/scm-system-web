'use client';

import {
  completeProductionOrder,
  getProductionOrder,
  returnProductionOrder,
} from '@/app/api/production-order';
import {
  ActionButton,
  ActionButtonRow,
  ActionButtonSection,
} from '@/app/components/buttons';
import { OrderReturnDialog } from '@/app/components/order-dialogs';
import { LoadingPage } from '@/app/components/spinners';
import {
  FormLabelText,
  FormValueText,
  SectionText,
  SubtitleText,
  TitleText,
} from '@/app/components/texts';
import { ProductionOrderItem } from '@/app/models/production-order';
import { DetailsPageProps } from '@/app/types/page-props';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Flex, Grid, Link, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import InventoryOrderDisplayDisplayItemCard from '../../components/InventoryOrderItemCard';
import { InventoryReceiveStatusBadge } from '../../components/status-indicators';

export default function ProductsReceiveDetailsPage(props: DetailsPageProps) {
  const orderId = props.params.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const queryKey = ['ProductionOrder', orderId];

  const { data: order } = useQuery({
    queryKey,
    queryFn: () => getProductionOrder(orderId),
  });

  const { mutate: completeOrder, isLoading: isReceiveOrderLoading } =
    useMutation(() => completeProductionOrder(orderId), {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, {
          title: 'Products has been received and order is completed!',
        });
      },
    });

  const [displayReturnDialog, setDisplayReturnDialog] = useState(false);

  const { mutate: returnOrder, isLoading: isReturnOrderLoading } = useMutation(
    returnProductionOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, {
          title: 'Products has been returned!',
        });
        setDisplayReturnDialog(false);
      },
    },
  );

  if (order === undefined) {
    return <LoadingPage />;
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Production Order #{order.id} products receive</TitleText>
          <SubtitleText>
            Receive products from this order and complete it.
          </SubtitleText>
        </Stack>

        <Grid templateRows="repeat(2, 1fr)" templateColumns="300px 1fr" gap={5}>
          <FormLabelText>Production Facility:</FormLabelText>
          <FormValueText>{order.productionFacility?.name}</FormValueText>

          <FormLabelText>Status:</FormLabelText>
          <FormValueText>
            <InventoryReceiveStatusBadge status={order.status} />
          </FormValueText>
        </Grid>

        <Stack spacing={5}>
          <SectionText>Items</SectionText>
          {order.items?.map((i) => (
            <ProductsReceiveItem key={i.itemId} item={i} />
          ))}
        </Stack>

        <ActionButtonSection>
          <SectionText>Receive</SectionText>

          <ActionButtonRow
            colorScheme="blue"
            buttonText="Receive"
            isDisabled={!order.isAcceptAllowed}
            isLoading={isReceiveOrderLoading}
            onClick={() => completeOrder()}
          >
            Receive products and complete order.
          </ActionButtonRow>

          <OrderReturnDialog
            display={displayReturnDialog}
            onClose={() => setDisplayReturnDialog(false)}
            isLoading={isReturnOrderLoading}
            onSubmit={(problem) => returnOrder({ id: orderId, problem })}
          />
          <ActionButtonRow
            colorScheme="purple"
            buttonText="Return"
            isDisabled={!order.isAcceptAllowed}
            onClick={() => setDisplayReturnDialog(true)}
          >
            Return order due to problems.
          </ActionButtonRow>
        </ActionButtonSection>

        <Flex justify="end" mt={5} gap={5}>
          <Link href={`/inventory/products-receive`}>
            <ActionButton size="lg">Close</ActionButton>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}

function ProductsReceiveItem({ item }: { item: ProductionOrderItem }) {
  return (
    <InventoryOrderDisplayDisplayItemCard
      imageUrl={item.product.imageUrl}
      name={item.product.name}
      quantity={item.quantity}
      unit={item.unit}
      unitPrice={item.unitValue}
      totalPrice={item.totalValue}
    />
  );
}
