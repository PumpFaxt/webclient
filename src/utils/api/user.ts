import { client } from ".";

const user = {
  async requestNonce(address: string) {
    const response = await client.post<{ message: string }>(
      `/user/request-nonce?address=${address}`
    );

    const data = response.data;
    return data.message;
  },
};

export default user;
