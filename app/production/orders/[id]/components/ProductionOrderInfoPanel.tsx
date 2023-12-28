'use client';
import {
  ApprovalStatusBadge,
  OrderStatusBadge,
} from '@/app/components/status-indicators';
import { FormLabelText, FormValueText } from '@/app/components/texts';
import { ProductionOrder } from '@/app/models/production-order';
import { Grid, Stack } from '@chakra-ui/react';
import { dateToFullFormat } from '../../../../utils/time-formats';

export interface ProductionOrderInfoProps {
  order: ProductionOrder;
}

export default function ProductionOrderInfoPanel(
  props: ProductionOrderInfoProps,
) {
  const order = props.order;
  return (
    <Stack>
      <Grid templateRows="repeat(8, 1fr)" templateColumns="300px 1fr" gap={5}>
        <FormLabelText>Status:</FormLabelText>
        <FormValueText>
          <OrderStatusBadge status={order.status} />
        </FormValueText>

        <FormLabelText>Approve status:</FormLabelText>
        <FormValueText>
          <ApprovalStatusBadge status={order.approvalStatus} />
        </FormValueText>

        <FormLabelText>Create user:</FormLabelText>
        <FormValueText>{order.createUser.name}</FormValueText>

        <FormLabelText>Create time:</FormLabelText>
        <FormValueText>{dateToFullFormat(order.createTime)}</FormValueText>

        <FormLabelText>Update time:</FormLabelText>
        <FormValueText>
          {order.updateTime
            ? dateToFullFormat(order.updateTime)
            : 'Will be available after order has been updated.'}
        </FormValueText>

        <FormLabelText>Delivery time:</FormLabelText>
        <FormValueText>
          {order.executionFinishTime
            ? dateToFullFormat(order.executionFinishTime)
            : 'Will be available if order has finished delivery.'}
        </FormValueText>

        <FormLabelText>End user:</FormLabelText>
        <FormValueText>
          {order.endUser?.name ?? 'Will be available after order has ended.'}
        </FormValueText>

        <FormLabelText>End time:</FormLabelText>
        <FormValueText>
          {order.endTime
            ? dateToFullFormat(order.endTime)
            : 'Will be available after order has ended.'}
        </FormValueText>

        <FormLabelText>Problem:</FormLabelText>
        <FormValueText>{order.problem ? order.problem : 'N/A'}</FormValueText>
      </Grid>
    </Stack>
  );
}
