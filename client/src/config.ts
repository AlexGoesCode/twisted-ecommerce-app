// export const baseUrl = "http://localhost:5022/api";
// export const baseUrl = 'https://bobbleheads-server.vercel.app/api';

export const baseUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5022/api'
    : 'https://bobbleheads-server.vercel.app/api';
