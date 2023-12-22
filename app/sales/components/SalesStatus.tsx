'use client';
import { Badge } from '@chakra-ui/react';

interface StatusProps {
  status: string;
}

export default function SalesStatus(params: StatusProps) {
  switch (params.status) {
    case 'Pending':
      return <Badge colorScheme="yellow">Pending</Badge>;
    case 'Executing':
      return <Badge colorScheme="yellow">Executing</Badge>;
    case 'WaitingAcceptance':
      return <Badge colorScheme="yellow">Waiting Acceptance</Badge>;
    case 'Completed':
      return <Badge colorScheme="green">Completed</Badge>;
    case 'Processing':
      return <Badge colorScheme="yellow">Processing</Badge>;
    case 'Canceled':
      return <Badge colorScheme="red">Canceled</Badge>;
    case 'Returned':
      return <Badge colorScheme="purple">Returned</Badge>;
    case 'Due':
      return <Badge colorScheme="red">Due</Badge>;
    case '':
      break;
    default:
  }
  return <div></div>;
}
