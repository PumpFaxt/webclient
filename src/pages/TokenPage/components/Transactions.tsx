import React, { useEffect, useRef, useState } from "react";
import { Token } from "../../../types";
import { useContractEvent, usePublicClient } from "wagmi";
import contractDefinitions from "../../../contracts";
import { twMerge } from "tailwind-merge";
import { ONE_FRAX, ONE_TOKEN } from "../../../config";
import { formatAddress } from "../../../utils";
import useToast from "../../../hooks/useToast";

interface TransactionsProps {
  token?: Token;
}

type Transaction = {
  time: bigint;
  amount: bigint;
  cost: bigint;
  maker: string;
  type: "Buy" | "Sell";
};

export default function Transactions(props: TransactionsProps) {
  const { token } = props;

  if (!token) return <>Loading</>;

  const [transactions, setTransactions] = useState<Transaction[]>();

  const { getContractEvents } = usePublicClient();

  async function loadTransactions() {
    let inPlace: Array<Transaction> = [];

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
        time: l.args.time || 0n,
        amount: l.args.amount || 0n,
        cost: l.args.cost || 0n,
        maker: l.args.buyer || "0x",
        type: "Buy",
      })
    );
    sellLogs.forEach((l) =>
      inPlace.push({
        time: l.args.time || 0n,
        amount: l.args.amount || 0n,
        cost: l.args.refund || 0n,
        maker: l.args.seller || "0x",
        type: "Sell",
      })
    );

    inPlace.sort((a, b) => Number(b.time - a.time));

    setTransactions(inPlace);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useContractEvent({
    ...contractDefinitions.token,
    address: token?.address,
    eventName: "PriceChange",
    listener: (_) => {
      loadTransactions();
    },
  });

  console.log(transactions);

  return (
    <div
      className="flex my-2"
      style={{ "--boxSize": "2.5rem" } as React.CSSProperties}
    >
      {!transactions && <p>Loading...</p>}
      {transactions && (
        <>
          <IndexedTxList
            transactions={transactions}
            index="time"
            className={"w-[20%] text-sm"}
          />

          <IndexedTxList
            transactions={transactions}
            index="type"
            className={"w-[10%] font-light text-sm"}
          />

          <IndexedTxList
            transactions={transactions}
            index="cost"
            className={"w-[15%] text-sm"}
          />

          <IndexedTxList
            transactions={transactions}
            index="amount"
            className={"w-[20%] text-sm"}
          />

          <IndexedTxList
            transactions={transactions}
            index="price"
            className={"w-[20%] text-xs"}
          />

          <IndexedTxList
            transactions={transactions}
            index="maker"
            className={"w-[15%] text-xs"}
          />
        </>
      )}
    </div>
  );
}

function IndexedTxList(props: {
  transactions: Transaction[];
  index: keyof Transaction | "price";
  className?: string;
  orientation?: "text-center" | "text-right" | "text-left";
}) {
  const { index } = props;

  const [curD, setCurD] = useState(0);
  const flag = useRef(false);

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      setInterval(() => {
        setCurD(Math.random());
      }, 2200);
    }
  }, []);

  const toast = useToast();

  return (
    <ol className={twMerge(props.className, "flex flex-col")}>
      <li
        className={twMerge(
          "p-2 border border-front/20 capitalize text-front/60 font-medium text-lg"
        )}
      >
        {index}
      </li>
      {props.transactions?.map((tx, key) => (
        <li
          className={twMerge(
            "w-full p-2 border border-front/20 h-[var(--boxSize)] flex items-center duration-200",
            index != "time" &&
              tx.type == "Buy" &&
              "text-green-400 hover:bg-green-400/10",
            index != "time" &&
              tx.type == "Sell" &&
              "text-red-400 hover:bg-red-400/10"
          )}
          key={key}
        >
          {index == "time" && (
            <span key={curD}>{timeAgo(new Date(Number(tx.time) * 1000))}</span>
          )}

          {index == "type" && tx.type}

          {index == "cost" && (Number(tx.cost) / Number(ONE_FRAX)).toFixed(3)}

          {index == "amount" &&
            (Number(tx.amount) / Number(ONE_TOKEN)).toFixed(3)}

          {index == "price" &&
            Number(tx.cost) / Number(tx.amount) / Number(ONE_FRAX)}

          {index == "maker" && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(tx.maker);
                toast.log({ title: "Copied Address to Clipboard" });
              }}
            >
              {formatAddress(tx.maker)}
            </button>
          )}
        </li>
      ))}
    </ol>
  );
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const d = days;
  const h = hours % 24;
  const m = minutes % 60;
  const s = seconds % 60;

  let result = "";
  let count = 0;

  if (d > 0 && count < 2) {
    result += `${d}d `;
    count++;
  }
  if (h > 0 && count < 2) {
    result += `${h}h `;
    count++;
  }
  if (m > 0 && count < 2) {
    result += `${m}m `;
    count++;
  }
  if (s > 0 && count < 2) {
    result += `${s}s `;
    count++;
  }

  return result.trim() + " ago";
}
