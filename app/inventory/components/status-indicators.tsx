'use client';

import { OrderStatus } from '@/app/models/order';
import { Badge } from '@chakra-ui/react';

export function InventoryIssueStatusBadge({ status }: { status: OrderStatus }) {
  let displayOption;

  switch (status) {
    case 'Processing':
      displayOption = { color: 'yellow', displayName: 'Ready' };
      break;
    case 'Canceled':
      displayOption = { color: 'red', displayName: 'Canceled' };
      break;
    default:
      displayOption = { color: 'green', displayName: 'Completed' };
      break;
  }

  return (
    <Badge colorScheme={displayOption.color}>{displayOption.displayName}</Badge>
  );
}

export function InventoryReceiveStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  let displayOption;

  switch (status) {
    case 'WaitingAcceptance':
      displayOption = { color: 'yellow', displayName: 'Ready' };
      break;
    case 'Completed':
      displayOption = { color: 'green', displayName: 'Completed' };
      break;
    case 'Returned':
      displayOption = { color: 'purple', displayName: 'Returned' };
      break;
    default:
      displayOption = { color: 'white', displayName: 'Pending' };
      break;
  }

  return (
    <Badge colorScheme={displayOption.color}>{displayOption.displayName}</Badge>
  );
}
