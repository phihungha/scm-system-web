'use client';

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
});

const fakeApiClient = axios.create({
  baseURL: 'https://mocki.io/v1/',
});

export default apiClient;
