'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc'
import ItemCard from './ItemCard'


export default function GridList() {
    return (
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            Short heading
          </Heading>
          <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis obcaecati ut
            cupiditate pariatur, dignissimos, placeat amet officiis.
          </Text>
        </Stack>
  
        <Container maxW={'5xl'} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <ItemCard
              heading={'Heading'}
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
              href={'#'}
            />
            <ItemCard
              heading={'Heading'}
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
              href={'#'}
            />
            <ItemCard
              heading={'Heading'}
              icon={<Icon as={FcDonate} w={10} h={10} />}
              description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
              href={'#'}
            />
            <ItemCard
              heading={'Heading'}
              icon={<Icon as={FcManager} w={10} h={10} />}
              description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
              href={'#'}
            />
            <ItemCard
              heading={'Heading'}
              icon={<Icon as={FcAbout} w={10} h={10} />}
              description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
              href={'#'}
            />
          </Flex>
        </Container>
      </Box>
    )
  }