'use client';
import { useFormik } from 'formik';
import {
  CreateInput,
  EventInput,
  GenericResponse,
  ItemInput,
  LoginInput,
  negativeStatusInput,
  StatusInput,
  UpdateInput,
} from '../types/sales';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { signInUser } from '../api/authApi';
import {
  createEvent,
  createSalesOrder,
  getAllSalesOrders,
  updateEvent,
  updateNegativeStatus,
  updateSalesOrder,
  updateStatus,
} from '../api/salesApi';

export default function SignInForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: loginUser } = useMutation(
    (userData: LoginInput) => signInUser(userData),
    {
      onSuccess: (response) => {
        console.log(response);
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: (values) => {
      loginUser({ userName: 'root-admin', password: 'Abcd1234+-*/' });
    },
  });

  return (
    <div>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="userName">Email Address</FormLabel>
                <Input
                  id="userName"
                  name="userName"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </div>
  );
}
