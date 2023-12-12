'use client';

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://mocki.io/v1/',
});

export default apiClient;
