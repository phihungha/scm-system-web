import {
  approveProductionOrder,
  cancelProductionOrder,
  completeProductionOrder,
  finishProductionOrder,
  rejectProductionOrder,
  returnProductionOrder,
  startProductionOrder,
} from '@/app/api/production-order';
import { ActionButtonRow, ActionButtonSection } from '@/app/components/buttons';
import {
  OrderCancelDialog,
  OrderRejectDialog,
  OrderReturnDialog,
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
  const [displayReturnDialog, setDisplayReturnDialog] = useState(false);

  const toast = useToast();
  const queryClient = useQueryClient();
  const queryKey = ['productionOrder', orderId];

  const {
    mutate: finishOrderDelivery,
    isLoading: isFinishOrderDeliveryLoading,
  } = useMutation(() => finishProductionOrder(orderId), {
    onSuccess: (resp) => {
      queryClient.setQueryData(queryKey, resp);
      showSuccessToast(toast);
    },
  });

  const { mutate: approveOrder, isLoading: isApproveOrderLoading } =
    useMutation(() => approveProductionOrder(orderId), {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    });

  const { mutate: startOrder, isLoading: isStartOrderLoading } = useMutation(
    () => startProductionOrder(orderId),
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    },
  );

  const { mutate: completeOrder, isLoading: isCompleteOrderLoading } =
    useMutation(() => completeProductionOrder(orderId), {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    });

  const { mutate: returnOrder, isLoading: isReturnOrderLoading } = useMutation(
    returnProductionOrder,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayReturnDialog(false);
      },
    },
  );

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
        <SectionText>Excution</SectionText>

        <ActionButtonRow
          colorScheme="blue"
          buttonText="Start Execution"
          isLoading={isStartOrderLoading}
          onClick={() => startOrder()}
        >
          Mark the execution of this order as started.
        </ActionButtonRow>

        <ActionButtonRow
          colorScheme="teal"
          buttonText="Finish execution"
          isLoading={isFinishOrderDeliveryLoading}
          onClick={() => finishOrderDelivery()}
        >
          Mark the execution of this order as finished.
        </ActionButtonRow>
      </ActionButtonSection>

      <ActionButtonSection>
        <SectionText>Acceptance</SectionText>
        <ActionButtonRow
          colorScheme="green"
          buttonText="Complete"
          isLoading={isCompleteOrderLoading}
          onClick={() => completeOrder()}
        >
          Confirm that the order is completed.
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
          onClick={() => setDisplayReturnDialog(true)}
        >
          Mark order as returned due to problems.
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
          onClick={() => setDisplayCancelDialog(true)}
        >
          Cancel the order. This action cannot be undone!
        </ActionButtonRow>
      </ActionButtonSection>
    </>
  );
}
