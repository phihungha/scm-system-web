import { completeSalesOrderPayment } from '@/app/api/sales-order';
import { ActionButton } from '@/app/components/buttons';
import { PaymentCompleteDialog } from '@/app/components/order-dialogs';
import { SectionText } from '@/app/components/texts';
import { SalesOrder } from '@/app/models/sales-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import { showSuccessToast } from '@/app/utils/toast-messages';
import { Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function SalesOrderPaymentPanel({
  order,
}: {
  order: SalesOrder;
}) {
  const [displayCompletePaymentDialog, setDisplayCompletePaymentDialog] =
    useState(false);

  const toast = useToast();
  const queryClient = useQueryClient();
  const queryKey = ['salesOrder', order.id];

  const { mutate: completePayment, isLoading } = useMutation(
    completeSalesOrderPayment,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast);
        setDisplayCompletePaymentDialog(false);
      },
    },
  );

  let description = '';
  switch (order.paymentStatus) {
    case 'Pending':
      description = 'Payment information is pending.';
      break;
    case 'Due':
      description = 'You have due payment for this order!';
      break;
    case 'Completed':
      description = 'Payment for this order has been completed.';
      break;
    case 'Canceled':
      description = 'Payment for this order has been canceled.';
      break;
  }

  return (
    <Stack spacing={4}>
      <SectionText>Payment</SectionText>
      <Text
        fontSize="lg"
        color={order.paymentStatus === 'Due' ? 'orange' : 'black'}
      >
        {description}
      </Text>

      <Flex
        justify="space-between"
        color={order.paymentStatus === 'Due' ? 'orange' : 'black'}
      >
        <Text fontSize="xl" fontWeight={'bold'}>
          Remaining amount
        </Text>
        <Text fontSize="xl" fontWeight={'bold'}>
          {CurrencyFormat.format(order.remainingAmount)}
        </Text>
      </Flex>

      <PaymentCompleteDialog
        display={displayCompletePaymentDialog}
        onClose={() => setDisplayCompletePaymentDialog(false)}
        isLoading={isLoading}
        onSubmit={(payAmount) => completePayment({ id: order.id, payAmount })}
      />
      <ActionButton
        colorScheme="blue"
        isDisabled={!order.isPaymentCompleteAllowed}
        onClick={() => setDisplayCompletePaymentDialog(true)}
      >
        Complete payment
      </ActionButton>
    </Stack>
  );
}
