import {
  cancelSalesOrder,
  completeSalesOrder,
  finishSalesOrder,
  returnSalesOrder,
} from '@/app/api/sales-order';
import {
  OrderCancelDialog,
  OrderReturnDialog,
} from '@/app/components/action-dialogs';
import { ActionButtonRow, ActionButtonSection } from '@/app/components/buttons';
import { SectionText } from '@/app/components/texts';
import { SalesOrder } from '@/app/models/sales-order';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export interface SalesOrderActionPanelProps {
  order: SalesOrder;
}

export default function SalesOrderActionPanel({
  order,
}: SalesOrderActionPanelProps) {
  const orderId = order.id;

  const toast = useToast();
  const queryClient = useQueryClient();
  const queryKey = ['salesOrder', orderId];

  const {
    mutate: finishOrderDelivery,
    isLoading: isFinishOrderDeliveryLoading,
  } = useMutation(() => finishSalesOrder(orderId), {
    onSuccess: (resp: SalesOrder) => {
      queryClient.setQueryData(queryKey, resp);
      showSuccessToast(toast);
    },
  });

  const { mutate: completeOrder, isLoading: isCompleteOrderLoading } =
    useMutation(() => completeSalesOrder(orderId), {
      onSuccess: (resp: SalesOrder) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    });

  const { mutate: returnOrder, isLoading: isReturnOrderLoading } = useMutation(
    returnSalesOrder,
    {
      onSuccess: (resp: SalesOrder) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    },
  );

  const { mutate: cancelOrder, isLoading: isCancelOrderLoading } = useMutation(
    cancelSalesOrder,
    {
      onSuccess: (resp: SalesOrder) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
      },
    },
  );

  const [displayCancelDialog, setDisplayCancelDialog] = useState(false);
  const [displayReturnDialog, setDisplayReturnDialog] = useState(false);

  return (
    <>
      <ActionButtonSection>
        <SectionText>Delivery</SectionText>
        <ActionButtonRow
          colorScheme="blue"
          buttonText="Finish delivery"
          isDisabled={!order.isExecutionFinishAllowed}
          isLoading={isFinishOrderDeliveryLoading}
          onClick={() => finishOrderDelivery()}
        >
          Mark the delivery of this order as finished.
        </ActionButtonRow>
      </ActionButtonSection>

      <ActionButtonSection>
        <SectionText>Customer acceptance</SectionText>
        <ActionButtonRow
          colorScheme="green"
          buttonText="Complete"
          isDisabled={!order.isAcceptAllowed}
          isLoading={isCompleteOrderLoading}
          onClick={() => completeOrder()}
        >
          Confirm that the customer has accepted the delivery and completed the
          order.
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
          Mark order as returned due to problems by the customer.
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
