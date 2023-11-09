import {
  IconButton,
  Flex,
  HStack,
  Stack,
  useColorModeValue,
  Text,
  FlexProps,
  Button,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useRouter } from 'next/navigation';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const NormalNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useRouter();
  const onSignIn = async () => {
    router.replace('/login');
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
            onClick={onSignIn}
          >
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'gray.500'}
            href={'#'}
            _hover={{
              bg: 'gray.500',
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </HStack>
    </Flex>
  );
};
export default NormalNav;
