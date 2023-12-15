'use client';
import { Box, Text, Select, Stack, Heading } from '@chakra-ui/react';
import AutoCompleteBox from '../components/AutoCompleteBox';

export default function SalesOrderInfo() {
  return (
    <Stack>
      <Box as={'header'}>
        <Heading lineHeight={1.1} fontWeight={600} fontSize={'5xl'}>
          #1
        </Heading>
      </Box>
      <Box>
        <Text
          fontSize={'3xl'}
          color={'black.500'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          mb={'4'}
          pt={10}
        >
          Order Details
        </Text>
        <Stack alignItems="center" pt={2} spacing={16} direction="row">
          <Text mr={-0.25} fontSize={'xl'} as={'span'} fontWeight={'bold'}>
            Create User:
          </Text>
          <Text fontSize={'xl'}>Ha Phi Hung</Text>
        </Stack>

        <Stack alignItems="center" pt={5} spacing={20} direction="row">
          <Text fontSize={'xl'} mr={9} as={'span'} fontWeight={'bold'}>
            Status:
          </Text>
          <Text fontSize={'xl'}>Pending</Text>
        </Stack>

        <Stack alignItems="center" pt={5} spacing={6} direction="row">
          <Text mr={0.5} fontSize={'xl'} as={'span'} fontWeight={'bold'}>
            Payment Status:
          </Text>
          <Text fontSize={'xl'}>Pending</Text>
        </Stack>

        <Stack alignItems="center" pt={5} spacing={20} direction="row">
          <Text mr={6} fontSize={'xl'} as={'span'} fontWeight={'bold'}>
            Retailer:
          </Text>
          <Box w="full">
            <AutoCompleteBox />
          </Box>
        </Stack>

        <Stack pt={5} spacing={14} direction="row">
          <Text fontSize={'xl'} mr={1} as={'span'} fontWeight={'bold'}>
            Create Time:
          </Text>
          <Text fontSize={'xl'}>12/11/2023</Text>
        </Stack>

        <Stack alignItems="center" pt={5} spacing={20} direction="row">
          <Text mr={2} fontSize={'xl'} as={'span'} fontWeight={'bold'}>
            End Time:
          </Text>
          <Text fontSize={'xl'}>12/11/2023</Text>
        </Stack>
        <Stack pt={5} alignItems="center" spacing={10} direction="row">
          <Text mr={1} fontSize={'xl'} as={'span'} fontWeight={'bold'}>
            Delivery Time:
          </Text>
          <Text fontSize={'xl'}>12/11/2023</Text>
        </Stack>

        <Stack alignItems="center" pt={5} spacing={20} direction="row">
          <Text fontSize={'xl'} mr={3} as={'span'} fontWeight={'bold'}>
            End User:
          </Text>
          <Text fontSize={'xl'}>Ha Phi Hung</Text>
        </Stack>
      </Box>
    </Stack>
  );
}
