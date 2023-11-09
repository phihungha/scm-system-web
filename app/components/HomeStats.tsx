'use client';

import { Box, chakra, SimpleGrid } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import StatsCard from './StatsCard';

export default function HomeStats() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Our company is expanding, you could be too.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Users'}
          stat={'5,000'}
          icon={<BsPerson size={'3em'} />}
        />
        <StatsCard
          title={'Servers'}
          stat={'1,000'}
          icon={<FiServer size={'3em'} />}
        />
        <StatsCard
          title={'Datacenters'}
          stat={'7'}
          icon={<GoLocation size={'3em'} />}
        />
      </SimpleGrid>
    </Box>
  );
}
