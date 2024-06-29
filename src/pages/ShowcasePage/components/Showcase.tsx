import React, { useEffect, useState } from "react";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { twMerge } from "tailwind-merge";
import TokenCard from "../../../common/TokenCard";

export default function Showcase(props: { query: string }) {
  const tokens = useApiResponse(api.tokens.getAll, props.query);
  const [coinsSplit, setCoinsSplit] =
    useState<Array<NonNullable<typeof tokens.data>["tokens"]>>();

  useEffect(() => {
    if (!tokens.loading && tokens.data && tokens.data.tokens.length) {
      const totalTokens = tokens.data.tokens.length;
      const chunkSize = Math.ceil(totalTokens / 3);

      setCoinsSplit([
        tokens.data.tokens.slice(0, chunkSize),
        tokens.data.tokens.slice(chunkSize, chunkSize * 2),
        tokens.data.tokens.slice(chunkSize * 2, totalTokens),
      ]);
    }
  }, [tokens.data]);

  return (
    <section className="flex flex-col items-center p-page">
      <div className="mt-7 mb-16 font-bold text-5xl font-comicNeue relative text-center flex self-stretch">
        <h1 className="text-center flex-1">Showcase of Memes</h1>
        <button
          className="flex flex-col items-center font-light gap-y-1"
          onClick={tokens.refetch}
          disabled={tokens.loading}
        >
          <img
            src="/icons/burn-refresh.png"
            alt="refresh-deepfried-burnt"
            className={twMerge(
              "w-[0.5em] aspect-square object-contain",
              tokens.loading && "animate-spin cursor-progress"
            )}
          />
          <span className="text-xs">..refresh..</span>
        </button>
      </div>

      <div
        className={twMerge(
          "w-1/3",
          !tokens.loading && "h-0 opacity-0 pointer-events-none"
        )}
      >
        <img
          src="/images/pepe-sailor.png"
          className="w-full border-2"
          alt="PEPE"
        />
      </div>

      {!tokens.loading &&(
        <div className="flex justify-between group/showcase max-w-[1400px]">
          {coinsSplit &&
            coinsSplit.map((items, key) => (
              <div key={key} className="flex flex-col gap-y-8 w-[32%]">
                {items &&
                  items.map((token, key) => (
                    <TokenCard token={token} key={key} />
                  ))}
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
