import React, { useEffect, useState } from "react";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { twMerge } from "tailwind-merge";
import CoinCard from "../../../common/CoinCard";

export default function Showcase() {
  const coins = useApiResponse(api.dummy.coins);
  const [coinsSplit, setCoinsSplit] = useState<(typeof coins.data)[]>();

  useEffect(() => {
    if (!coins.loading && coins.data) {
      const totalCoinsSplit = Math.floor(coins.data.length / 3);
      setCoinsSplit([
        coins.data.slice(totalCoinsSplit * 0, totalCoinsSplit * 1),
        coins.data.slice(totalCoinsSplit * 1, totalCoinsSplit * 2),
        coins.data.slice(totalCoinsSplit * 2, totalCoinsSplit * 3),
      ]);
    }
  }, [coins.data]);

  return (
    <section className="flex flex-col items-center p-page">
      <div className="mt-7 mb-16 font-bold text-5xl font-comicNeue relative text-center flex self-stretch">
        <h1 className="text-center flex-1">Showcase of Memes</h1>
        <button
          className="flex flex-col items-center font-light gap-y-1"
          onClick={coins.refetch}
          disabled={coins.loading}
        >
          <img
            src="/icons/burn-refresh.png"
            alt="refresh-deepfried-burnt"
            className={twMerge(
              "w-[0.5em] aspect-square object-contain",
              coins.loading && "animate-spin cursor-progress"
            )}
          />
          <span className="text-xs">..refresh..</span>
        </button>
      </div>

      <div
        className={twMerge(
          "w-1/3",
          !coins.loading && "h-0 opacity-0 pointer-events-none"
        )}
      >
        <img
          src="https://www.memehub.ai/images/poster-loading.png"
          className="w-full border-2"
          alt="PEPE"
        />
      </div>

      {!coins.loading && (
        <div className="flex justify-between group/showcase max-w-[1400px]">
          {coinsSplit &&
            coinsSplit.map((items, key) => (
              <div key={key} className="flex flex-col gap-y-8 w-[32%]">
                {items &&
                  items.map((coin, key) => <CoinCard coin={coin} key={key} />)}
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
