'use client';
import { Badge } from '@chakra-ui/react';
import { ApprovalStatus } from '../models/general';
import { OrderStatus } from '../models/order';
import { PaymentStatus } from '../models/trans-order';

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case 'Processing':
      return <Badge colorScheme="yellow">Processing</Badge>;
    case 'Executing':
      return <Badge colorScheme="cyan">Executing</Badge>;
    case 'WaitingAcceptance':
      return <Badge colorScheme="blue">Waiting Acceptance</Badge>;
    case 'Completed':
      return <Badge colorScheme="green">Completed</Badge>;
    case 'Canceled':
      return <Badge colorScheme="red">Canceled</Badge>;
    case 'Returned':
      return <Badge colorScheme="purple">Returned</Badge>;
  }
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  switch (status) {
    case 'Pending':
      return <Badge colorScheme="yellow">Pending</Badge>;
    case 'Due':
      return <Badge colorScheme="orange">Due</Badge>;
    case 'Completed':
      return <Badge colorScheme="green">Completed</Badge>;
    case 'Canceled':
      return <Badge colorScheme="red">Canceled</Badge>;
  }
}

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  switch (status) {
    case 'PendingApproval':
      return <Badge colorScheme="yellow">Pending</Badge>;
    case 'Approved':
      return <Badge colorScheme="green">Approved</Badge>;
    case 'Rejected':
      return <Badge colorScheme="red">Rejected</Badge>;
  }
}
