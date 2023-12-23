import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { signOut } from '../api/auth';

function UserMenu() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: reqSignOut } = useMutation(signOut, {
    onSuccess: () => {
      toast({
        title: 'Signed out!',
        description: 'You have signed out!',
        duration: 2000,
        status: 'success',
      });
      router.replace('/sign-in');
    },
  });

  return (
    <MenuList
      bg={useColorModeValue('white', 'gray.900')}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuDivider />
      <MenuItem onClick={() => reqSignOut()}>Sign out</MenuItem>
    </MenuList>
  );
}

// TODO: Use User.profileImageUrl later
const sampleAvatarUrl =
  'https://scmss.s3.ap-southeast-1.amazonaws.com/public/user-profile-images/5dbb0c61-6c08-4640-925b-ac89be1c482d';

function UserDisplay() {
  return (
    <HStack spacing={{ base: '0', md: '6' }}>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
          >
            <HStack>
              <Avatar size={'sm'} src={sampleAvatarUrl} />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">Justina Clark</Text>
                <Text fontSize="xs" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>

          <UserMenu />
        </Menu>
      </Flex>
    </HStack>
  );
}

export interface HeaderBarProps extends FlexProps {
  onOpen: () => void;
}

export default function HeaderBar({ onOpen, ...rest }: HeaderBarProps) {
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
      <UserDisplay />
    </Flex>
  );
}
