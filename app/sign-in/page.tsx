'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { object, string } from 'yup';
import { signIn } from '../api/auth';
import { ButtonSpinner } from '../components/StandardSpinner';
import { SignInParams } from '../models/auth';
import { FormInputsProps } from '../types/form-props';

function SignInFormInputs({ errors, touched }: FormInputsProps<SignInParams>) {
  return (
    <VStack spacing={4} align="flex-start">
      <FormControl isInvalid={!!errors.userName && touched.userName}>
        <FormLabel htmlFor="userName">Username</FormLabel>
        <Field as={Input} id="userName" name="userName" variant="filled" />
        <FormErrorMessage>{errors.userName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password && touched.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Field
          as={Input}
          id="password"
          name="password"
          type="password"
          variant="filled"
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: reqSignIn, isLoading } = useMutation(signIn, {
    onSuccess: () => {
      toast({
        title: 'Signed in!',
        description: 'You have successfully signed in. Welcome back!',
        duration: 2000,
        status: 'success',
      });
      router.replace('/');
    },

    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 404) {
        setIncorrectLogin(true);
      }
    },
  });

  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const initialFormValues: SignInParams = {
    userName: '',
    password: '',
  };

  const formValidationSchema = object({
    userName: string().required('Username is required'),
    password: string().required('Password is required'),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={5} rounded="md">
        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={reqSignIn}
        >
          {({ handleSubmit, ...formProps }) => (
            <form
              method="POST"
              onSubmit={handleSubmit}
              onFocus={() => setIncorrectLogin(false)}
            >
              <SignInFormInputs {...formProps} />
              <Button type="submit" mt={4} colorScheme="blue" width="full">
                {isLoading ? <ButtonSpinner /> : 'Login'}
              </Button>
            </form>
          )}
        </Formik>

        {incorrectLogin && (
          <Text mt={4} color="red">
            Incorrect username or password.
          </Text>
        )}
      </Box>
    </Flex>
  );
}
