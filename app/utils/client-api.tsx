"use client";

import axios from "axios";

export default apiClient = axios.create({
  baseURL: "http://localhost:3001",
});
