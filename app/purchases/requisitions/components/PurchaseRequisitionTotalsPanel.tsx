'use client';

import {
  BigTotalValueRow,
  SectionText,
  SmallTotalValueRow,
} from '@/app/components/texts';
import { PurchaseRequisitionItem } from '@/app/models/purchase-requisition';
import CurrencyFormat from '@/app/utils/currency-formats';
import { toPercentage } from '@/app/utils/percentage-formats';
import { Stack, StackDivider } from '@chakra-ui/react';

export interface PurchaseRequisitionTotalsDisplayProps {
  items: PurchaseRequisitionItem[];
  vatRate: number;
}

export default function PurchaseRequisitionTotalsPanel(
  props: PurchaseRequisitionTotalsDisplayProps,
) {
  const vatRate = props.vatRate;
  const subTotal = props.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const vatAmount = subTotal * vatRate;
  const totalAmount = subTotal + vatAmount;

  return (
    <Stack spacing={5}>
      <SectionText>Totals</SectionText>

      <Stack spacing={5} divider={<StackDivider borderColor="black.600" />}>
        <Stack spacing={5}>
          <SmallTotalValueRow
            label="Subtotal"
            value={CurrencyFormat.format(subTotal).toString()}
          />

          <SmallTotalValueRow
            label="VAT rate"
            value={toPercentage(vatRate).toString() + '%'}
          />

          <SmallTotalValueRow
            label="VAT amount"
            value={CurrencyFormat.format(vatAmount).toString()}
          />
        </Stack>

        <BigTotalValueRow
          label="Total amount"
          value={CurrencyFormat.format(totalAmount).toString()}
        />
      </Stack>
    </Stack>
  );
}
