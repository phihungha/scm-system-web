'use client';

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:80',
});

export default apiClient;
