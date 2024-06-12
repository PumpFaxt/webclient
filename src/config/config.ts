export const serverUrl =
  import.meta.env.MODE === "development" || !import.meta.env.VITE_BACKEND_URL
    ? "http://127.0.0.1:9000"
    : import.meta.env.VITE_BACKEND_URL;

export const jwtStorageName = `pumpfaxt.it-jwt-==`;
