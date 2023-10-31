'use client';

import axios from '../../node_modules/axios/index';
import { useQuery } from 'react-query';
import apiClient from './client-api';

const Sample = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => apiClient.get('/api/Users').then((res) => res.data),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  return <div></div>;
};

export default Sample;
