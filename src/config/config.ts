export const serverUrl =
  import.meta.env.MODE === "development" || !import.meta.env.VITE_BACKEND_URL
    ? "http://127.0.0.1:9000"
    : import.meta.env.VITE_BACKEND_URL;

export const jwtStorageName = `pumpfaxt-jwt-==`;

export const ONE_FRAX = BigInt(Math.pow(10, 18));
export const ONE_TOKEN = BigInt(Math.pow(10, 18));
