import { client } from ".";

const token = {
  async enqueue(
    name: string,
    symbol: string,
    image: string,
    website: string,
    description: string,
    telegram: string,
    twitter: string
  ) {
    const response = await client.post<{ success: boolean }>(
      `/token/enqueue?name=${name}&symbol=${symbol}&image=${image}&website=${website}&description=${description}&telegram=${telegram}&twitter=${twitter}`
    );

    const data = response.data;
    return data.success;
  },

  async new() {
    await client.post(`/token/new`);
  },
};

export default token;
