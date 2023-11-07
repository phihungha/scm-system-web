'use client';

import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import apiClient from '@/app/utils/client-api';

function login({ username, password }) {
  return apiClient.post(
    '/api/Auth/SignIn',
    {
      username: username,
      password: password,
    },
    {
      withCredentials: true,
    },
  );
}

export default function SignInForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation(login, {
    onSuccess: () => {
      console.log('Success');
    },
  });

  const onSignIn = async () => {};

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Input
        className="w-full"
        placeholder="Enter username"
        value={username}
        onChange={(i) => setUsername(i.target.value)}
      />

      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          onChange={(i) => setPassword(i.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        className="w-full"
        onClick={() =>
          mutation.mutate({
            username,
            password,
          })
        }
      >
        Sign in
      </Button>
    </div>
  );
}
