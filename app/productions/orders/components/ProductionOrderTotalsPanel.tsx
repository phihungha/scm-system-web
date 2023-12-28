'use client';

import {
  BigTotalValueRow,
  SectionText,
  SmallTotalValueRow,
} from '@/app/components/texts';
import { ProductionOrderItem } from '@/app/models/production-order';
import CurrencyFormat from '@/app/utils/currency-formats';
import { toPercentage } from '@/app/utils/percentage-formats';
import { Stack, StackDivider } from '@chakra-ui/react';

export interface SalesOrderTotalsDisplayProps {
  items: ProductionOrderItem[];
}

export default function ProductionOrderTotalsPanel(
  props: SalesOrderTotalsDisplayProps,
) {
  const totalCost = props.items.reduce((sum, item) => sum + item.totalCost, 0);
  const totalValue = props.items.reduce(
    (sum, item) => sum + item.totalValue,
    0,
  );
  const totalProfit = totalValue - totalCost;

  return (
    <Stack spacing={5}>
      <SectionText>Totals</SectionText>

      <Stack spacing={5} divider={<StackDivider borderColor="black.600" />}>
        <Stack spacing={5}>
          <SmallTotalValueRow
            label="Total Value"
            value={CurrencyFormat.format(totalValue).toString()}
          />

          <SmallTotalValueRow
            label="Total Cost"
            value={toPercentage(totalCost).toString() + '%'}
          />
        </Stack>

        <BigTotalValueRow
          label="Total Profit"
          value={CurrencyFormat.format(totalProfit).toString()}
        />
      </Stack>
    </Stack>
  );
}
