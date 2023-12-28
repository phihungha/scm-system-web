'use client';
import { createPurchaseOrder } from '@/app/api/purchase-order';
import {
  approvePurchaseRequisition,
  cancelPurchaseRequisition,
  getPurchaseRequisition,
  rejectPurchaseRequisition,
  updatePurchaseRequisition,
} from '@/app/api/purchase-requisition';
import {
  ActionButton,
  ActionButtonRow,
  ActionButtonSection,
} from '@/app/components/buttons';
import {
  OrderCancelDialog,
  OrderRejectDialog,
} from '@/app/components/order-dialogs';
import { LoadingPage } from '@/app/components/spinners';
import {
  ApprovalStatusBadge,
  RequisitionStatusBadge,
} from '@/app/components/status-indicators';
import {
  FormLabelText,
  FormValueText,
  SectionText,
  SubtitleText,
  TitleText,
} from '@/app/components/texts';
import { ProductionFacility } from '@/app/models/production-facility';
import { PurchaseOrderItemParams } from '@/app/models/purchase-order';
import { PurchaseRequisitionItem } from '@/app/models/purchase-requisition';
import { DetailsPageProps } from '@/app/types/page-props';
import { dateToFullFormat } from '@/app/utils/time-formats';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Box, Flex, Grid, Stack, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PurchaseRequisitionItemsPanel from '../components/PurchaseRequisitionItemsPanel';
import PurchaseRequisitionTotalsPanel from '../components/PurchaseRequisitionTotalsPanel';

export default function PurchaseRequisitionDetailsPage({
  params,
}: DetailsPageProps) {
  const orderId = params.id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [facility, setFacility] = useState<ProductionFacility | undefined>();
  const [items, setItems] = useState<PurchaseRequisitionItem[]>([]);

  const queryKey = ['purchaseRequisition', orderId];

  const { data: order, refetch } = useQuery({
    queryKey,
    queryFn: () => getPurchaseRequisition(orderId),
    onSuccess: (resp) => {
      setFacility(resp.productionFacility);
      if (resp.items) {
        setItems(resp.items);
      }
    },
  });

  // Info

  const { mutate: createOrder, isLoading } = useMutation(
    (purchaseItems: PurchaseOrderItemParams[]) =>
      createPurchaseOrder({
        items: purchaseItems,
        purchaseRequisitionId: orderId,
      }),
    {
      onSuccess: (resp) => {
        showSuccessToast(toast, { title: 'Order successfully created!' });
        router.replace(`purchases/orders/${resp.id}`);
      },
    },
  );

  const { mutate: approveOrder, isLoading: isApproveLoading } = useMutation(
    () => approvePurchaseRequisition(orderId),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Approve succeed!' });
      },
    },
  );

  const { mutate: updateOrder, isLoading: isUpdateLoading } = useMutation(
    () =>
      updatePurchaseRequisition({
        id: orderId,
        items: order?.isExecutionInfoUpdateAllowed ? items : undefined,
      }),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Update succeed!' });
      },
    },
  );

  // Actions
  const [displayCancelDialog, setDisplayCancelDialog] = useState(false);
  const [displayRejectDialog, setDisplayRejectDialog] = useState(false);

  const { mutate: rejectOrder, isLoading: isRejectOrderLoading } = useMutation(
    rejectPurchaseRequisition,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayRejectDialog(false);
      },
    },
  );

  const { mutate: cancelOrder, isLoading: isCancelOrderLoading } = useMutation(
    cancelPurchaseRequisition,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayCancelDialog(false);
      },
    },
  );

  const isUpdateALlowed = items.length > 0;

  if (order === undefined) {
    return <LoadingPage />;
  }
  function onCreate(items: PurchaseRequisitionItem[]) {
    const newList: PurchaseOrderItemParams[] = [];
    items.forEach((item) => {
      newList.push({
        itemId: item.supply.id,
        discount: 0,
      });
    });
    createOrder(newList);
  }

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <TitleText>Purchase requisition #{order.id}</TitleText>
          <SubtitleText>
            Manage and view the details of this purchase requisition.
          </SubtitleText>
        </Stack>

        {/* Information */}
        <Grid
          templateRows="repeat(12, 1fr)"
          templateColumns="300px 1fr"
          gap={5}
        >
          <FormLabelText>Production Facility:</FormLabelText>
          <FormValueText>{facility?.name ?? 'N/A'}</FormValueText>

          <FormLabelText>Vendor:</FormLabelText>
          <FormValueText>{order.vendor?.name ?? 'N/A'}</FormValueText>

          <FormLabelText>Status:</FormLabelText>
          <FormValueText>
            <RequisitionStatusBadge status={order.status} />
          </FormValueText>

          <FormLabelText>Approval status:</FormLabelText>
          <FormValueText>
            <ApprovalStatusBadge status={order.approvalStatus} />
          </FormValueText>

          <FormLabelText>Create user:</FormLabelText>
          <FormValueText>{order.createUser.name}</FormValueText>

          <FormLabelText>Create time:</FormLabelText>
          <FormValueText>{dateToFullFormat(order.createTime)}</FormValueText>

          <FormLabelText>Update time:</FormLabelText>
          <FormValueText>
            {order.updateTime
              ? dateToFullFormat(order.updateTime)
              : 'Will be available after order has been updated.'}
          </FormValueText>

          <FormLabelText>End user:</FormLabelText>
          <FormValueText>
            {order.endUser?.name ?? 'Will be available after order has ended.'}
          </FormValueText>

          <FormLabelText>End time:</FormLabelText>
          <FormValueText>
            {order.endTime
              ? dateToFullFormat(order.endTime)
              : 'Will be available after order has ended.'}
          </FormValueText>

          <FormLabelText>Problem:</FormLabelText>
          <FormValueText>{order.problem ? order.problem : 'N/A'}</FormValueText>
        </Grid>

        {/* Items */}
        <PurchaseRequisitionItemsPanel
          isDisabled={!order.isInfoUpdateAllowed}
          items={items}
          onItemsChange={setItems}
        />

        {/* Totals */}
        <PurchaseRequisitionTotalsPanel items={items} vatRate={order.vatRate} />

        {/* Action */}
        <ActionButtonSection>
          <SectionText>Approval</SectionText>
          <ActionButtonRow
            colorScheme="blue"
            buttonText="Approved"
            isLoading={isApproveLoading}
            isDisabled={!order.isApprovalAllowed}
            onClick={() => approveOrder()}
          >
            Mark the approval status of this requisition as approved.
          </ActionButtonRow>
        </ActionButtonSection>

        <ActionButtonSection>
          <ActionButtonRow
            colorScheme="green"
            buttonText="Reject"
            onClick={() => setDisplayRejectDialog(true)}
          >
            Reject the purchase requisition. This action cannot be undone!
          </ActionButtonRow>

          <OrderRejectDialog
            display={displayRejectDialog}
            onClose={() => setDisplayRejectDialog(false)}
            isLoading={isRejectOrderLoading}
            onSubmit={(problem) => rejectOrder({ id: orderId, problem })}
          />
        </ActionButtonSection>

        <ActionButtonSection>
          <SectionText>Create</SectionText>
          <ActionButtonRow
            colorScheme="red"
            buttonText="Create"
            isDisabled="isPurchaseOrderCreateAllowed"
            onClick={() => onCreate(items)}
          >
            Create Purchase Order
          </ActionButtonRow>
        </ActionButtonSection>

        <ActionButtonSection>
          <SectionText>Cancel</SectionText>
          <OrderCancelDialog
            display={displayCancelDialog}
            onClose={() => setDisplayCancelDialog(false)}
            isLoading={isCancelOrderLoading}
            onSubmit={(problem) => cancelOrder({ id: orderId, problem })}
          />
          <ActionButtonRow
            colorScheme="red"
            buttonText="Cancel"
            isDisabled={!order.isCancelAllowed}
            onClick={() => setDisplayCancelDialog(true)}
          >
            Cancel the purchase requisition. This action cannot be undone!
          </ActionButtonRow>
        </ActionButtonSection>
        <Flex justify="end" mt={5} gap={5}>
          <Link href="/purchases/requisitions">
            <ActionButton size="lg">Close</ActionButton>
          </Link>

          <ActionButton
            size="lg"
            colorScheme="blue"
            isDisabled={!isUpdateALlowed}
            isLoading={isUpdateLoading}
            onClick={() => updateOrder()}
          >
            Update
          </ActionButton>
        </Flex>
      </Stack>
    </Box>
  );
}
