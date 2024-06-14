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
};

export default token;
