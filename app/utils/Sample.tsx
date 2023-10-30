'use client';

import axios from '../../node_modules/axios/index';
import { useQuery } from 'react-query';
import apiClient from './client-api';

const Sample = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      apiClient
        .get('/api/Users/6b0143f8-cb66-487a-9671-7bb909bf3e97')
        .then((res) => res.data),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div>
      <h1>{data.id}</h1>
      <p>{data.userName}</p>
      <strong>👀 {data.email}</strong> <strong>✨ {data.name}</strong>{' '}
    </div>
  );
};

export default Sample;
