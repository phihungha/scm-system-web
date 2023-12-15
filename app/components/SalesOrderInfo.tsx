'use client';
import {
  Box,
  Text,
  Grid,
  Stack,
  Heading,
  Input,
  GridItem,
} from '@chakra-ui/react';
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
        <Grid
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={5}
        >
          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Facility:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Box w="full">
              <AutoCompleteBox />
            </Box>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Location:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Box w="full">
              <Input />
            </Box>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Create User:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>Ha Phi Hung</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Status:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>Pending</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Payment Status:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>Pending</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Retailer:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Box w="full">
              <AutoCompleteBox />
            </Box>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Create time:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>12/11/2023</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              End time:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>12/11/2023</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              Delivery time:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>12/11/2023</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize={'xl'} as={'span'} fontWeight={'bold'}>
              End user:
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={'xl'}>Ha Phi Hung</Text>
          </GridItem>
        </Grid>
      </Box>
    </Stack>
  );
}
