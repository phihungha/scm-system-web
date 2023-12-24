'use client';
import AutoCompleteSelect from '@/app/components/AutoCompleteSelect';
import { NormalSpinner } from '@/app/components/spinners';
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from '@/app/components/status-indicators';
import { FormLabelText, FormValueText } from '@/app/components/texts';
import { Grid, Input, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getProductionFacilities } from '../../../../api/production-facility';
import { ProductionFacility } from '../../../../models/production-facility';
import { SalesOrder } from '../../../../models/sales-order';
import { dateToFullFormat } from '../../../../utils/time-formats';

export interface SalesOrderInfoProps {
  order: SalesOrder;
  facility?: ProductionFacility;
  onFacilitySelect: (i: ProductionFacility) => void;
  toLocation?: string;
  onToLocationChange: (i: string) => void;
}

export default function SalesOrderInfo(props: SalesOrderInfoProps) {
  const { data: facilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => getProductionFacilities(),
  });

  const onFacilitySelect = (id: number) => {
    const facility = facilities?.find((i) => i.id === id);
    if (!facility) {
      throw new Error('Facility ID not found.');
    }
    props.onFacilitySelect(facility);
  };

  const order = props.order;

  return (
    <Stack>
      <Grid templateRows="repeat(12, 1fr)" templateColumns="300px 1fr" gap={3}>
        <FormLabelText>Production Facility:</FormLabelText>
        {facilities ? (
          <AutoCompleteSelect
            items={facilities}
            selectedId={props.facility?.id}
            placeholder="Production facility must be selected to start delivery..."
            onSelect={onFacilitySelect}
          />
        ) : (
          <NormalSpinner />
        )}

        <FormLabelText>From location:</FormLabelText>
        <FormValueText>{props.facility?.location ?? 'N/A'}</FormValueText>

        <FormLabelText>Customer:</FormLabelText>
        <FormValueText>{order.customer.name}</FormValueText>

        <FormLabelText>To location:</FormLabelText>
        <Input
          value={props.toLocation}
          onChange={(e) => props.onToLocationChange(e.target.value)}
        />

        <FormLabelText>Status:</FormLabelText>
        <FormValueText>
          <OrderStatusBadge status={order.status} />
        </FormValueText>

        <FormLabelText>Payment status:</FormLabelText>
        <FormValueText>
          <PaymentStatusBadge status={order.paymentStatus} />
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
            : 'Will be available after order has finished delivery.'}
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
      </Grid>
    </Stack>
  );
}
