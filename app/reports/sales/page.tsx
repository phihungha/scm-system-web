'use client';
import { getSalesReport } from '@/app/api/reports';
import { ActionButton } from '@/app/components/buttons';
import { LoadingPage } from '@/app/components/spinners';
import { FormLabelText } from '@/app/components/texts';
import { ReportChartPoint } from '@/app/models/reports';
import CurrencyFormat from '@/app/utils/currency-formats';
import {
  Flex,
  NumberInput,
  NumberInputField,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { useQuery, useQueryClient } from 'react-query';
export default function SalesReportPage() {
  const [startMonth, setStartMonth] = useState(1);
  const [startYear, setStartYear] = useState(2022);
  const [endMonth, setEndMonth] = useState(12);
  const [endYear, setEndYear] = useState(2023);
  const [averageDeliveryTimeByMonth, setAverageDeliveryTimeByMonth] = useState<
    ReportChartPoint[]
  >([]);
  const [revenueByMonth, setRevenueByMonth] = useState<ReportChartPoint[]>([]);
  const [orderCountByFinalStatus, setOrderCountByFinalStatus] = useState<
    ReportChartPoint[]
  >([]);
  const [highestValueOrders, setHighestValueOrders] = useState<
    ReportChartPoint[]
  >([]);
  const [mostFrequentCustomers, setMostFrequentCustomers] = useState<
    ReportChartPoint[]
  >([]);
  const [mostPopularProducts, setmostPopularProducts] = useState<
    ReportChartPoint[]
  >([]);
  const queryClient = useQueryClient();
  const queryKey = ['salesReport'];

  const { data: productionReports, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getSalesReport({
        startMonth: startMonth,
        startYear: startYear,
        endMonth: endMonth,
        endYear: endYear,
      }),
    onSuccess: (resp) => {
      if (resp) {
        setAverageDeliveryTimeByMonth(resp.averageDeliveryTimeByMonth);
        setRevenueByMonth(resp.revenueByMonth);
        setOrderCountByFinalStatus(resp.orderCountByFinalStatus);
      }
    },
  });
  function convertChartData(
    x_title: string,
    y_title: string,
    data: ReportChartPoint[],
  ) {
    const mapped = data.map((d) => [d.name, d.value]);
    return [[`${x_title}`, `${y_title}`], ...mapped];
  }
  if (productionReports === undefined) {
    return <LoadingPage />;
  }

  return (
    <Stack>
      <Stack direction="row" gap={10}>
        <Stack w="full" direction="row" gap={5}>
          <FormLabelText>Start Month:</FormLabelText>
          <NumberInput
            w={100}
            id="start-month"
            name="start-month"
            isRequired={true}
            min={1}
            max={12}
            value={startMonth}
            onChange={(_, value) => setStartMonth(value)}
          >
            <NumberInputField />
          </NumberInput>
          <FormLabelText>Start Year:</FormLabelText>
          <NumberInput
            id="start-year"
            name="start-year"
            isRequired={true}
            min={1970}
            value={startYear}
            onChange={(_, value) => setStartYear(value)}
          >
            <NumberInputField />
          </NumberInput>
        </Stack>
        <Flex w="full" justify="end" gap={5}>
          <FormLabelText>End Month:</FormLabelText>
          <NumberInput
            w={100}
            id="end-month"
            name="end-month"
            isRequired={true}
            min={1}
            max={12}
            value={endMonth}
            onChange={(_, value) => setEndMonth(value)}
          >
            <NumberInputField />
          </NumberInput>
          <FormLabelText>End Year:</FormLabelText>
          <NumberInput
            id="end-year"
            name="end-year"
            isRequired={true}
            min={1970}
            value={endYear}
            onChange={(_, value) => setEndYear(value)}
          >
            <NumberInputField />
          </NumberInput>
        </Flex>
      </Stack>
      <ActionButton
        w={100}
        size="md"
        colorScheme="blue"
        onClick={() => refetch()}
      >
        Update
      </ActionButton>
      <StatGroup p={20} gap={10}>
        <Stat>
          <StatLabel>Average Delivery Time</StatLabel>
          <StatNumber>{productionReports.averageDeliveryTime} days</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Average Revenue</StatLabel>
          <StatNumber>
            {CurrencyFormat.format(productionReports.averageRevenue)}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>
            {CurrencyFormat.format(productionReports.totalRevenue)}
          </StatNumber>
        </Stat>
      </StatGroup>
      <Chart
        chartType="LineChart"
        data={convertChartData(
          'Month',
          'Average Delivery time',
          averageDeliveryTimeByMonth,
        )}
        width="100%"
        height="400px"
        legendToggle
      />
      <FormLabelText pb={20}>Average production time per month</FormLabelText>

      <Chart
        chartType="LineChart"
        data={convertChartData('Month', 'Revenue', revenueByMonth)}
        width="100%"
        height="400px"
        legendToggle
      />
      <FormLabelText pb={20}>Revenue by month</FormLabelText>

      <Chart
        chartType="PieChart"
        data={convertChartData(
          'Status',
          'Order count',
          orderCountByFinalStatus,
        )}
        width="100%"
        height="400px"
        legendToggle
      />
      <FormLabelText pb={20}>Order count by status</FormLabelText>
    </Stack>
  );
}
