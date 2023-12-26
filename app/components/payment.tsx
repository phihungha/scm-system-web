import { Flex, Stack, Text } from '@chakra-ui/react';
import { PaymentStatus } from '../models/trans-order';
import CurrencyFormat from '../utils/currency-formats';
import { ActionButton } from './buttons';
import { PaymentCompleteDialog } from './order-dialogs';
import { SectionText } from './texts';

export interface PaymentPanelProps {
  status: PaymentStatus;
  remainingAmount: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  display: boolean;
  onOpen: () => void;
  onClose: () => void;
  onPay: (payAmount: number) => void;
}

export function PaymentPanel(props: PaymentPanelProps) {
  let description = '';
  switch (props.status) {
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
      <Text fontSize="lg" color={props.status === 'Due' ? 'orange' : 'black'}>
        {description}
      </Text>

      <Flex
        justify="space-between"
        color={props.status === 'Due' ? 'orange' : 'black'}
      >
        <Text fontSize="xl" fontWeight={'bold'}>
          Remaining amount
        </Text>
        <Text fontSize="xl" fontWeight={'bold'}>
          {CurrencyFormat.format(props.remainingAmount)}
        </Text>
      </Flex>

      <PaymentCompleteDialog
        display={props.display}
        onClose={() => props.onClose()}
        isLoading={props.isLoading}
        onSubmit={props.onPay}
      />
      <ActionButton
        colorScheme="blue"
        isDisabled={props.isDisabled}
        onClick={() => props.onOpen()}
      >
        Complete payment
      </ActionButton>
    </Stack>
  );
}
