import { client } from ".";

const user = {
  async requestNonce(address: string) {
    const response = await client.post<{ message: string }>(
      `/user/request-nonce?address=${address}`
    );

    const data = response.data;
    return data.message;
  },

  async login(address: string, signature: string) {
    const response = await client.post<{ token: string }>(
      `/user/login?address=${address}&signature=${signature}`
    );

    const data = response.data;
    return data;
  },
};

export default user;
