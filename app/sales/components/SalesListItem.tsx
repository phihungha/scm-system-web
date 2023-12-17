'use client';

import { ISaleResponse } from '@/app/types/sales';
import {
  dateToDateFormat,
  dateToFullFormat,
} from '@/app/utils/time-conversion';
import { Td, Tr, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
interface SalesOrderProps {
  sales: ISaleResponse;
}

export default function SalesListItem({ sales }: SalesOrderProps) {
  const formatTime = dateToFullFormat(new Date(sales.createTime));
  const router = useRouter();
  const link = `/sales/${sales.id}`;
  const onDetail = async () => {
    router.replace(`/sales/${sales.id}`);
    console.log(link);
  };

  return (
    <Tr>
      <Td>{sales.id}</Td>
      <Td>{sales.createUser.name}</Td>
      <Td>{formatTime}</Td>
      <Td>{sales.paymentStatus}</Td>
      <Td>{sales.status}</Td>
      <Td>{sales.subTotal}</Td>

      <Td>
        <Button onClick={onDetail} variant="solid" colorScheme="blue">
          View
        </Button>
      </Td>
    </Tr>
  );
}
