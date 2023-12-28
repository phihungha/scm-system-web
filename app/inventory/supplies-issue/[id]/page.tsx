'use client';

import {
  getProductionOrder,
  startProductionOrder,
} from '@/app/api/production-order';
import {
  ActionButton,
  ActionButtonRow,
  ActionButtonSection,
} from '@/app/components/buttons';
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import InventoryOrderDisplayDisplayItemCard from '../../components/InventoryOrderItemCard';
import { InventoryIssueStatusBadge } from '../../components/status-indicators';

export default function SuppliesIssueDetailsPage(props: DetailsPageProps) {
  const orderId = props.params.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const queryKey = ['ProductionOrder', orderId];

  const { data: order } = useQuery({
    queryKey,
    queryFn: () => getProductionOrder(orderId),
  });

  const { mutate: issue, isLoading } = useMutation(
    () => startProductionOrder(orderId),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, {
          title: 'Supplies has been issued from this facility!',
        });
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
          <TitleText>Production Order #{order.id} supplies issue</TitleText>
          <SubtitleText>
            Issue supplies for the delivery of this order.
          </SubtitleText>
        </Stack>

        <Grid templateRows="repeat(5, 1fr)" templateColumns="300px 1fr" gap={5}>
          <FormLabelText>Production Facility:</FormLabelText>
          <FormValueText>{order.productionFacility?.name}</FormValueText>

          <FormLabelText>Status:</FormLabelText>
          <FormValueText>
            <InventoryIssueStatusBadge status={order.status} />
          </FormValueText>
        </Grid>

        <Stack spacing={5}>
          <SectionText>Items</SectionText>
          {order.items?.map((i) => (
            <ProductsIssueItem key={i.itemId} item={i} />
          ))}
        </Stack>

        <ActionButtonSection>
          <SectionText>Issue</SectionText>
          <ActionButtonRow
            colorScheme="blue"
            buttonText="Issue"
            isDisabled={!order.isExecutionStartAllowed}
            isLoading={isLoading}
            onClick={() => issue()}
          >
            Issue products and start delivery of order.
          </ActionButtonRow>
        </ActionButtonSection>

        <Flex justify="end" mt={5} gap={5}>
          <Link href={`/inventory/supplies-issue`}>
            <ActionButton size="lg">Close</ActionButton>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}

function ProductsIssueItem({ item }: { item: ProductionOrderItem }) {
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
