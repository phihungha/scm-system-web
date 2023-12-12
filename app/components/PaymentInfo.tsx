'use client';

import {
  Box,
  Text,
  List,
  ListItem,
  Button,
  Stack,
  StackDivider,
} from '@chakra-ui/react';

export default function PaymentInfo() {
  return (
    <Stack
      pt={10}
      spacing={{ base: 4, sm: 6 }}
      direction={'column'}
      divider={<StackDivider borderColor="black.600" />}
    >
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box>
          <div className="flex flex-row place-content-between items-center gap-10 whitespace-nowrap">
            <Text
              pt={1}
              fontSize={{ base: '16px', lg: '20px' }}
              color={'black.500'}
              fontWeight={'bold'}
              textTransform={'uppercase'}
              mb={'4'}
            >
              Payment Details
            </Text>
            <div>
              <Button variant="solid" colorScheme="blue">
                Generate Invoice
              </Button>
            </div>
          </div>
          <List pt={5} spacing={2}>
            <ListItem>
              <Stack spacing={5} direction="row">
                <Text as={'span'} fontWeight={'bold'} fontSize="lg">
                  Total Price:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text as={'span'} fontSize="lg">
                    110
                  </Text>
                </div>
              </Stack>
            </ListItem>

            <ListItem>
              <Stack spacing={5} direction="row">
                <Text as={'span'} fontWeight={'bold'} fontSize="lg">
                  VAT:
                </Text>
                <div className="flex grow items-end justify-end">
                  <Text as={'span'} fontSize="lg">
                    110
                  </Text>
                </div>
              </Stack>
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Stack spacing={5} direction="row">
        <Text as={'span'} fontWeight={'bold'} fontSize="xl">
          Total Amount:
        </Text>
        <div className="flex grow items-end justify-end">
          <Text as={'span'} fontWeight={'bold'} fontSize="xl">
            110
          </Text>
        </div>
      </Stack>
    </Stack>
  );
}
