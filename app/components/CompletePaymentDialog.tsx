'use client';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { completeSalesPayment } from '../api/salesApi';
import { ISaleResponse, PaymentInput } from '../types/sales';

interface DialogProps {
  orderId: string;
  paymentDialog: boolean;
  handleClose: () => void;
}

export default function CompletePaymentDialog(open: DialogProps) {
  const router = useRouter();
  const [payAmount, setPayAmount] = useState(0);
  const { mutate: completePayment } = useMutation(
    async (payAmount: PaymentInput) =>
      await completeSalesPayment(open.orderId, payAmount),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace('/sales');
      },
    },
  );
  function onComplete(payAmount: number) {
    const input = new PaymentInput(payAmount);
    completePayment(input);
  }
  return (
    <Modal isOpen={open.paymentDialog} onClose={open.handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter your Pay Amount</ModalHeader>
        <ModalCloseButton />
        <ModalBody h={200} pb={6}>
          <FormControl>
            <FormLabel>Pay Amount</FormLabel>
            <NumberInput
              value={payAmount}
              onChange={(money: number) => setPayAmount(money)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => onComplete(payAmount)}
            colorScheme="blue"
            mr={3}
          >
            Confirm
          </Button>
          <Button onClick={open.handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
