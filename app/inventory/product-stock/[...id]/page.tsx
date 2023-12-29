'use client';
import { getWarehouseProductItem } from '@/app/api/inventory';
import { FormLabelText } from '@/app/components/texts';
import { WarehouseProductItemEvent } from '@/app/models/inventory';
import { dateToFullFormat } from '@/app/utils/time-formats';

import { LoadingPage } from '@/app/components/spinners';
import {
  Button,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { useQuery } from 'react-query';
export default function ProductStockDetailPage({
  params,
}: {
  params: { id: string[] };
}) {
  const [warehouseProductItemEvents, setWarehouseProductItemEvents] = useState<
    WarehouseProductItemEvent[]
  >([]);
  const facilityId = Number(params.id[0]);
  const productId = Number(params.id[1]);
  const { data: items } = useQuery({
    queryKey: ['WarehouseProductItem' + `/${facilityId}/${productId}`],
    queryFn: () => getWarehouseProductItem(facilityId, productId),
    onSuccess: (resp) => {
      if (resp.events) {
        setWarehouseProductItemEvents(resp.events);
      }
    },
  });

  function convertChartData(
    x_title: string,
    y_title: string,
    data: WarehouseProductItemEvent[],
  ) {
    const mapped = data.map((d) => [d.time.toLocaleString(), d.quantity]);
    return [[`${x_title}`, `${y_title}`], ...mapped];
  }
  if (items === undefined) {
    return <LoadingPage />;
  }
  return (
    <>
      <Stack gap={20}>
        <WarehouseProductEventTable items={warehouseProductItemEvents} />
        <Chart
          chartType="LineChart"
          data={convertChartData(
            'Time',
            'Quantity',
            warehouseProductItemEvents,
          )}
          width="100%"
          height="400px"
          legendToggle
        />
        <FormLabelText pb={20}>Quantity by time</FormLabelText>
      </Stack>
    </>
  );
}

function WarehouseProductEventTable({
  items: items,
}: {
  items?: WarehouseProductItemEvent[];
}) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Change</Th>
            <Th>Quantity</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <WarehouseProductEventTableItem
              key={new Date(item.time).toLocaleTimeString()}
              item={item}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function WarehouseProductEventTableItem({
  item,
}: {
  item: WarehouseProductItemEvent;
}) {
  return (
    <Tr>
      <Td>{dateToFullFormat(new Date(item.time))}</Td>
      <Td>{item.change}</Td>
      <Td>{item.quantity}</Td>
      <Td>
        {(() => {
          if (item.salesOrderId !== null) {
            return (
              <Link href={`/sales/orders/${item.salesOrderId}`}>
                <Button variant="solid" colorScheme="blue">
                  View
                </Button>
              </Link>
            );
          } else {
            return (
              <Link href={`/production/orders/${item.productionOrderId}`}>
                <Button variant="solid" colorScheme="blue">
                  View
                </Button>
              </Link>
            );
          }
        })()}
      </Td>
    </Tr>
  );
}
