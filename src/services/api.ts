// src/api/axiosInstance.ts

import axios from 'axios';

// Define base URL configurations
const baseURLs: { [key: string]: string } = {
    development: 'http://localhost:8080/', // Your development base URL
    production: 'https://api.pi-talents.com/', // Your production base URL
};

// Determine the current environment
const environment = import.meta.env.MODE || 'development'; // Vite exposes environment variables through `import.meta.env`

// Create and export the Axios instance
const api = axios.create({
    baseURL: baseURLs[environment],
});

export {api};
