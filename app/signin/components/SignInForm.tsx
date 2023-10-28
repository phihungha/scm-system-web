'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import PasswordField from '@/app/components/PasswordField';
import CircularProgress from '@mui/material/CircularProgress';
import clientApi from '@/app/utils/client-api';

export default function SignInForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async () => {
    setIsLoading(true);
    clientApi
      .post(
        '/auth/signin',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
    router.replace('/');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <TextField
        className="w-full"
        label="Email"
        value={username}
        onChange={(i) => setUsername(i.target.value)}
      />
      <PasswordField
        password={password}
        onPasswordChanged={(i) => setPassword(i)}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button className="w-full" variant="outlined" onClick={onSignIn}>
          Sign in
        </Button>
      )}
    </div>
  );
}
