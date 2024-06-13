import { client } from ".";

const huddle = {
  async getToken(roomdId: string, name: string) {
    const response = await client.get<{ token: string }>(
      `/huddle/token?roomId=${roomdId}&name=${name}`
    );
    const data = response.data;
    return data.token;
  },
};

export default huddle;
