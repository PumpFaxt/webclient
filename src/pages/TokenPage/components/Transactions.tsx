import React, { useEffect, useState } from "react";
import { Token } from "../../../types";
import { useContractEvent, usePublicClient } from "wagmi";
import contractDefinitions from "../../../contracts";

interface TransactionsProps {
  token?: Token;
}

export default function Transactions(props: TransactionsProps) {
  const { token } = props;

  if (!token) return <>Loading</>;

  const [transactions, setTransactions] = useState();

  const { getContractEvents } = usePublicClient();

  async function loadTransactions() {
    let inPlace: Array<object> = [];

    const buyLogs = await getContractEvents({
      ...contractDefinitions.token,
      address: token?.address,
      fromBlock: BigInt(token?.createdBlock || 0),
      toBlock: "latest",
      eventName: "Buy",
    });
    const sellLogs = await getContractEvents({
      ...contractDefinitions.token,
      address: token?.address,
      fromBlock: BigInt(token?.createdBlock || 0),
      toBlock: "latest",
      eventName: "Sell",
    });

    buyLogs.forEach((l) =>
      inPlace.push({
        amount: l.args.amount,
        cost: l.args.cost,
        maker: l.args.buyer,
        type: "Buy",
      })
    );
    sellLogs.forEach((l) =>
      inPlace.push({
        amount: l.args.amount,
        cost: l.args.refund,
        maker: l.args.seller,
        type: "Buy",
      })
    );

    // setSeries(
    //   logs.map((l) => [
    //     Number(l.args.time) * 1000,
    //     Number(l.args[indexBy]) / Number(ONE_FRAX),
    //   ])
    // );
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useContractEvent({
    ...contractDefinitions.token,
    address: token?.address,
    eventName: "PriceChange",
    listener: (logs) => {
      loadTransactions();
    },
  });
  return <div>Transactions</div>;
}
