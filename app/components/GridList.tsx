'use client';

import { Box, Container, Flex, Icon } from '@chakra-ui/react';
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc';
import ItemCard from './ItemCard';
import HomeStats from './HomeStats';

export default function GridList() {
  return (
    <Box p={4}>
      <HomeStats />

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <ItemCard
            heading={'Heading'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <ItemCard
            heading={'Heading'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <ItemCard
            heading={'Heading'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <ItemCard
            heading={'Heading'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <ItemCard
            heading={'Heading'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <ItemCard
            heading={'Heading'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  );
}
