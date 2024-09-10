// export const baseUrl = import.meta.env.VITE_BASE_URL;

export const baseUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5022/api'
    : 'https://bobbleheads.vercel.app/api';
