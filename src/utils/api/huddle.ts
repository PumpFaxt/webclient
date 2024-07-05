import { client } from ".";

const huddle = {
  async getToken(roomdId: string, name: string) {
    const response = await client.get<{ token: string }>(
      `/huddle/token?roomId=${roomdId}&name=${name}`
    );
    const data = response.data;
    return data.token;
  },

  async getNewMeetingNonce(tokenAddress: string) {
    const response = await client.get<{ nonce: string }>(
      `/huddle/new-meeting-nonce?tokenAddress=${tokenAddress}`
    );
    const data = response.data;
    return data.nonce;
  },

  async startNewMeeting(tokenAddress: string, signedNonce: string) {
    const response = await client.post<{ roomId: string }>(
      `/huddle/new-meeting?tokenAddress=${tokenAddress}&signature=${signedNonce}`
    );
    const data = response.data;
    return data.roomId;
  },
};

export default huddle;
