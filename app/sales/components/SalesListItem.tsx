'use client';

import { ISaleResponse } from '@/app/types/sales';
import { dateToFullFormat } from '@/app/utils/time-conversion';
import VND from '@/app/utils/vndFormat';
import { Button, Td, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import SalesStatus from './SalesStatus';
interface SalesOrderProps {
  sales: ISaleResponse;
}

export default function SalesListItem({ sales }: SalesOrderProps) {
  const formatTime = dateToFullFormat(new Date(sales.createTime));
  const router = useRouter();
  const link = `/sales/${sales.id}`;
  const onDetail = async () => {
    router.replace(`/sales/${sales.id}`);
  };

  return (
    <Tr>
      <Td>{sales.id}</Td>
      <Td>{sales.createUser.name}</Td>
      <Td>{formatTime}</Td>
      <Td>
        <SalesStatus status={sales.paymentStatus}></SalesStatus>
      </Td>
      <Td>
        <SalesStatus status={sales.status}></SalesStatus>
      </Td>
      <Td>{VND.format(sales.subTotal)}</Td>

      <Td>
        <Button onClick={onDetail} variant="solid" colorScheme="blue">
          View
        </Button>
      </Td>
    </Tr>
  );
}
