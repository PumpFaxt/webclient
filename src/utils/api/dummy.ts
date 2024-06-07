import { client } from ".";
import { Coin } from "../../types";

const dummy = {
  async coins() {
    const response = await client.get<Coin[]>(
      `https://frontend-api.pump.fun/coins?offset=0&limit=50&sort=last_trade_timestamp&order=DESC&includeNsfw=true`
    );
    const data = response.data;
    return data;
  },
};

export default dummy;
