import { client } from ".";

const faucet = {
  async getConfig() {
    const response = await client.get<{
      eth: { cooldown: number; amount: number };
      frax: { cooldown: number; amount: number };
    }>(`/faucet/config`);
    const data = response.data;
    return data;
  },

  async checkEth(address: string) {
    const response = await client.get<{ claimable: boolean; message: string }>(
      `/faucet/check-eth?address=${address}`
    );
    const data = response.data;
    return data;
  },

  async checkFrax(address: string) {
    const response = await client.get<{ claimable: boolean; message: string }>(
      `/faucet/check-frax?address=${address}`
    );
    const data = response.data;
    return data;
  },

  async claimEth(address: string) {
    const response = await client.get(`/faucet/claim-eth?address=${address}`);
    const data = response.data;
    return data;
  },

  async claimFrax(address: string) {
    const response = await client.get(`/faucet/claim-frax?address=${address}`);
    const data = response.data;
    return data;
  },
};

export default faucet;
