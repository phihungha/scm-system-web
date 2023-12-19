'use client';

import axios from '@/node_modules/axios/index';

const fakeApiClient = axios.create({
  baseURL: 'https://mocki.io/v1/',
});

export default fakeApiClient;
