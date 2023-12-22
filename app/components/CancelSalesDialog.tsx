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
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { cancelSalesOrder } from '../api/salesApi';
import { ISaleResponse } from '../types/sales';

interface DialogProps {
  orderId: string;
  cancelDialog: boolean;
  CancelClose: () => void;
}

export default function CancelSalesDialog(open: DialogProps) {
  const router = useRouter();
  const [problem, setProblem] = useState('');
  const { mutate: cancelOrder } = useMutation(
    async (problem: string) => await cancelSalesOrder(open.orderId, problem),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace('/sales');
      },
    },
  );
  function onCancel(problem: string) {
    cancelOrder(problem);
  }
  return (
    <Modal isOpen={open.cancelDialog} onClose={open.CancelClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You want to cancel this sales order?</ModalHeader>
        <ModalCloseButton />
        <ModalBody h={200} pb={6}>
          <FormControl>
            <FormLabel>
              Before canceling the sales order, you can your problem here:
            </FormLabel>
            <Textarea
              value={problem}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProblem(e.target.value)
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => onCancel(problem)} colorScheme="blue" mr={3}>
            Confirm
          </Button>
          <Button onClick={open.CancelClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
