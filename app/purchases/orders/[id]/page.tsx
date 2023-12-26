'use client';

import { OrderItemEditCardProps } from '@/app/components/item-cards';
import {
  BigTotalValueRow,
  SectionText,
  SmallTotalValueRow,
} from '@/app/components/texts';
import { PurchaseOrderItem } from '@/app/models/purchase-order';
import CurrencyFormat, { currencySymbol } from '@/app/utils/currency-formats';
import { toPercentage } from '@/app/utils/percentage-formats';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function PurchaseOrderDetailsPage() {
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);
  const [additionalDiscount, setAdditionalDiscount] = useState(0);

  const subTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountSubtotal = items.reduce((sum, item) => sum + item.discount, 0);

  const discountAmount = discountSubtotal + additionalDiscount;
  const netSubtotal = subTotal - discountAmount;

  const vatRate = 0.05;
  const vatAmount = netSubtotal * vatRate;
  const totalAmount = netSubtotal + vatAmount;

  return (
    <Box p={5}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <SectionText>Totals</SectionText>
          <Stack spacing={5} divider={<StackDivider borderColor="black.600" />}>
            <Stack spacing={5}>
              <SmallTotalValueRow
                label="Subtotal"
                value={CurrencyFormat.format(subTotal).toString()}
              />
              <SmallTotalValueRow
                label="Discount subtotal"
                value={CurrencyFormat.format(discountSubtotal).toString()}
              />

              <Flex justify="space-between" align="center">
                <Text fontSize="lg" fontWeight={'bold'}>
                  Additional discount
                </Text>
                <InputGroup w={250}>
                  <NumberInput
                    id="additional-discount"
                    name="additional-discount"
                    allowMouseWheel
                    min={0}
                    step={10000}
                    value={additionalDiscount}
                    onChange={(_, value) => setAdditionalDiscount(value)}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <InputRightAddon>{currencySymbol}</InputRightAddon>
                </InputGroup>
              </Flex>

              <SmallTotalValueRow
                label="Net subtotal"
                value={CurrencyFormat.format(netSubtotal).toString()}
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
      </Stack>
    </Box>
  );
}

function PurchaseOrderItemEditCard(
  props: OrderItemEditCardProps<PurchaseOrderItem>,
) {
  const item = props.item;
  const supply = props.item.supply;

  const onDiscountChange = (discount: number) => {
    const totalPrice = item.quantity * item.unitPrice;

    props.onChange({
      ...item,
      discount,
      totalPrice,
      netPrice: totalPrice - discount,
    });
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        w={{ base: '100%', sm: '200px' }}
        src={supply.imageUrl}
        alt={supply.name}
      />

      <CardBody>
        <Text fontWeight="bold" fontSize="xl">
          {supply.name}
        </Text>

        <Stack mt={3} spacing={3}>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Text fontWeight="bold">Discount:</Text>
            <Box>
              <NumberInput
                id={`item-quantity-${item.itemId}`}
                name={`item-quantity-${item.itemId}`}
                isRequired={true}
                min={1}
                value={item.quantity}
                isDisabled={props.isDisabled}
                onChange={(_, value) =>
                  // Don't update if number box is empty.
                  value && onDiscountChange(value)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Text>{item.unit}</Text>
          </Stack>

          <Text>Price: {CurrencyFormat.format(item.unitPrice)}</Text>
          <Text>Total price: {CurrencyFormat.format(item.totalPrice)}</Text>
          <Text>Net price: {CurrencyFormat.format(item.netPrice)}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
