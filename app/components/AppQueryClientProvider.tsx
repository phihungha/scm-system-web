'use client';

import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function AppQueryClientProvider({ children }: React.PropsWithChildren) {
  const toast = useToast();

  const onError = (err: any) => {
    if (isAxiosError(err)) {
      const response = err.response;
      toast({
        title: `API Error: ${response?.status}`,
        description: response?.data.detail,
        duration: 5000,
        status: 'error',
      });
    }
  };

  const client = new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError }),
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppQueryClientProvider;
