'use client';
import { Box, Text, Select, Stack, Heading } from '@chakra-ui/react';
import AutoCompleteBox from '../components/AutoCompleteBox';

export default function SalesOrderInfo() {
  return (
    <Stack spacing={{ base: 6, md: 10 }}>
      <Box as={'header'}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
        >
          #1
        </Heading>
      </Box>
      <Box>
        <Text
          fontSize={{ base: '16px', lg: '20px' }}
          color={'black.500'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          mb={'4'}
        >
          Order Details
        </Text>
        <Stack pt={5} spacing={10} direction="row">
          <Text as={'span'} fontWeight={'bold'}>
            Employee:
          </Text>
          <Text>Ha Phi Hung</Text>
        </Stack>

        <Stack pt={5} spacing={16} direction="row">
          <Text mt="7px" as={'span'} fontWeight={'bold'}>
            Status:
          </Text>
          <Select placeholder="Select option" w="auto">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>

        <Stack alignItems="center" pt={5} spacing={14} direction="row">
          <Text as={'span'} fontWeight={'bold'}>
            Retailer:
          </Text>
          <AutoCompleteBox />
        </Stack>

        <Stack alignItems="center" pt={5} spacing={7} direction="row">
          <Text as={'span'} fontWeight={'bold'}>
            Warehouse:
          </Text>
          <AutoCompleteBox />
        </Stack>

        <Stack pt={5} spacing={5} direction="row">
          <Text as={'span'} fontWeight={'bold'}>
            Create Time:
          </Text>
          <Text>12/11/2023</Text>
        </Stack>
      </Box>
    </Stack>
  );
}
