import { client } from ".";
import { Token } from "../../types";

const token = {
  async refresh() {
    const response = await client.post<{ success: boolean }>("/tokens/refresh");

    const data = response.data;
    return data.success;
  },

  async getAll() {
    const response = await client.get<{ total: number; tokens: Token[] }>(
      "/tokens/"
    );

    const data = response.data;
    return data;
  },

  async getByAddress(address: string) {
    const response = await client.get<{ token: Token }>(`/tokens/${address}`);

    const data = response.data;
    return data.token;
  },

  async getPriceFeed(address: string) {
    const response = await client.get<{ data: any }>(`/tokens/${address}/feed`);

    const data = response.data;
    return data.data;
  },

  async getByUserAddress(address: string) {
    const response = await client.get<{ tokens: Token[] }>(
      `/tokens/by-user/${address}`
    );

    const data = response.data;
    return data.tokens;
  },
};

export default token;
