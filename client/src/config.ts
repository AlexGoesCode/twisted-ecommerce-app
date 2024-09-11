const isDevelopment = import.meta.env.MODE === 'development';

export const baseUrl = isDevelopment
  ? import.meta.env.VITE_LOCAL_BASE_URL
  : import.meta.env.VITE_PROD_BASE_URL;
