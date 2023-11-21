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
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export default function PaymentInfo() {
  return (
    <Stack
      spacing={{ base: 4, sm: 6 }}
      direction={'column'}
      divider={<StackDivider borderColor="black.600" />}
    >
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box>
          <div className="flex flex-row place-content-between gap-10 whitespace-nowrap">
            <Text
              pt={1}
              fontSize={{ base: '16px', lg: '18px' }}
              color={'black.500'}
              fontWeight={'500'}
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
          <List spacing={2}>
            <ListItem>
              <Text as={'span'} fontWeight={'bold'}>
                Total Price:
              </Text>{' '}
              100
            </ListItem>

            <ListItem>
              <Text as={'span'} fontWeight={'bold'}>
                VAT:
              </Text>{' '}
              10
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Text as={'span'} fontWeight={'bold'} fontSize="md">
        Total Amount: 110
      </Text>{' '}
    </Stack>
  );
}
