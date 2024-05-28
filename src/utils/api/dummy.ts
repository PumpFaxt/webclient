import { client } from ".";
import { Coin } from "../../types";

const dummy = {
  async coins() {
    const response = await client.get<Coin[]>(
      `https://client-api-2-74b1891ee9f9.herokuapp.com/coins?offset=0&limit=50&sort=last_trade_timestamp&order=DESC&includeNsfw=true`
    );
    const data = response.data;
    return data;
  },
};

export default dummy;
