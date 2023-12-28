'use client';

import { Badge } from '@chakra-ui/react';
import { ApprovalStatus } from '../models/general';
import { OrderStatus } from '../models/order';
import { PurchaseRequisitionStatus } from '../models/purchase-requisition';
import { PaymentStatus } from '../models/trans-order';

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const displayOptions = {
    Processing: { color: 'yellow', displayName: 'Processing' },
    Executing: { color: 'cyan', displayName: 'Executing' },
    Interrupted: { color: 'pink', displayName: 'Interrupted' },
    WaitingAcceptance: { color: 'blue', displayName: 'Waiting Acceptance' },
    Completed: { color: 'green', displayName: 'Completed' },
    Canceled: { color: 'red', displayName: 'Canceled' },
    Returned: { color: 'purple', displayName: 'Returned' },
  };

  const displayOption = displayOptions[status];

  return (
    <Badge colorScheme={displayOption.color}>{displayOption.displayName}</Badge>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const displayOptions = {
    Pending: { color: 'yellow', displayName: 'Pending' },
    Due: { color: 'orange', displayName: 'Due' },
    Completed: { color: 'green', displayName: 'Completed' },
    Canceled: { color: 'red', displayName: 'Canceled' },
  };
  const displayOption = displayOptions[status];

  return (
    <Badge colorScheme={displayOption.color}>{displayOption.displayName}</Badge>
  );
}

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const displayOptions = {
    PendingApproval: { color: 'yellow', displayName: 'Pending' },
    Approved: { color: 'green', displayName: 'Approved' },
    Rejected: { color: 'red', displayName: 'Rejected' },
  };
  const displayOption = displayOptions[status];

  return (
    <Badge colorScheme={displayOption.color}>{displayOption.displayName}</Badge>
  );
}

export function RequisitionStatusBadge({
  status,
}: {
  status: PurchaseRequisitionStatus;
}) {
  const displayOptions = {
    Completed: { color: 'green', displayName: 'Completed' },
    Canceled: { color: 'red', displayName: 'Canceled' },
    Processing: { color: 'yellow', displayName: 'Processing' },
    Purchasing: { color: 'cyan', displayName: 'Purchasing' },
    Delayed: { color: 'purple', displayName: 'Delayed' },
  };
  const displayOption = displayOptions[status];
  return (
    <Badge colorScheme={displayOption.color}>{displayOption.displayName}</Badge>
  );
}
