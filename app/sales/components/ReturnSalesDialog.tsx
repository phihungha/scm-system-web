'use client';
import { returnSalesOrder } from '@/app/api/salesApi';
import { ISaleResponse } from '@/app/types/sales';
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

interface DialogProps {
  orderId: string;
  returnDialog: boolean;
  returnClose: () => void;
}

export default function ReturnSalesDialog(open: DialogProps) {
  const router = useRouter();
  const [problem, setProblem] = useState('');
  const { mutate: returnOrder } = useMutation(
    async (problem: string) => await returnSalesOrder(open.orderId, problem),
    {
      onSuccess: (response: ISaleResponse) => {
        router.replace('/sales');
      },
    },
  );
  function onReturn(problem: string) {
    returnOrder(problem);
  }
  return (
    <Modal isOpen={open.returnDialog} onClose={open.returnClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You want to return this sales order?</ModalHeader>
        <ModalCloseButton />
        <ModalBody h={200} pb={6}>
          <FormControl>
            <FormLabel>
              Before return the sales order, you can your problem here:
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
          <Button onClick={() => onReturn(problem)} colorScheme="blue" mr={3}>
            Confirm
          </Button>
          <Button onClick={open.returnClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
