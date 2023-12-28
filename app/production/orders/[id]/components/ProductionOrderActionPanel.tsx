import {
  approveProductionOrder,
  cancelProductionOrder,
  rejectProductionOrder,
} from '@/app/api/production-order';
import { ActionButtonRow, ActionButtonSection } from '@/app/components/buttons';
import {
  OrderCancelDialog,
  OrderRejectDialog,
} from '@/app/components/order-dialogs';
import { SectionText } from '@/app/components/texts';
import { ProductionOrder } from '@/app/models/production-order';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export interface ProductionOrderActionPanelProps {
  order: ProductionOrder;
}

export default function ProductionOrderActionPanel({
  order,
}: ProductionOrderActionPanelProps) {
  const orderId = order.id;

  const [displayRejectDialog, setDisplayRejectDialog] = useState(false);
  const [displayCancelDialog, setDisplayCancelDialog] = useState(false);

  const toast = useToast();
  const queryClient = useQueryClient();
  const queryKey = ['productionOrder', orderId];

  const { mutate: approveOrder, isLoading: isApproveOrderLoading } =
    useMutation(() => approveProductionOrder(orderId), {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    });

  const { mutate: rejectOrder, isLoading: isRejectOrderLoading } = useMutation(
    rejectProductionOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayRejectDialog(false);
      },
    },
  );

  const { mutate: cancelOrder, isLoading: isCancelOrderLoading } = useMutation(
    cancelProductionOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayCancelDialog(false);
      },
    },
  );

  return (
    <>
      <ActionButtonSection>
        <SectionText>Approval</SectionText>
        <ActionButtonRow
          isDisabled={!order.isApprovalAllowed}
          colorScheme="blue"
          buttonText="Approved"
          isLoading={isApproveOrderLoading}
          onClick={() => approveOrder()}
        >
          Mark the approval status of this order as approved.
        </ActionButtonRow>
        <OrderRejectDialog
          display={displayRejectDialog}
          onClose={() => setDisplayRejectDialog(false)}
          isLoading={isRejectOrderLoading}
          onSubmit={(problem) => rejectOrder({ id: orderId, problem })}
        />
        <ActionButtonRow
          colorScheme="red"
          buttonText="Reject"
          onClick={() => setDisplayRejectDialog(true)}
        >
          Reject the order. This action cannot be undone!
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
          isDisabled={!order.isCancelAllowed}
          colorScheme="red"
          buttonText="Cancel"
          onClick={() => setDisplayCancelDialog(true)}
        >
          Cancel the order. This action cannot be undone!
        </ActionButtonRow>
      </ActionButtonSection>
    </>
  );
}
