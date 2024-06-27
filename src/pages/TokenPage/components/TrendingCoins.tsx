import React, { useState } from "react";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import Icon from "../../../common/Icon";

export default function TrendingCoins() {
  const tokens = useApiResponse(api.tokens.getAll);

  return (
    <div className="w-1/4 h-[30vh]">
      <h1 className="text-lg flex gap-x-1 px-1 items-end">
        <img src="/images/fire-flame.gif" className="h-[1.6em]" />
        <span className="uppercase font-medium text-yellow-200">Trending</span>
      </h1>
      <div className="flex flex-col gap-y-2 mt-1 overflow-y-scroll h-[85%] scrollbar-primary w-full">
        {!tokens.loading &&
          tokens.data &&
          tokens.data.tokens.map((token, key) => (
            <div
              key={key}
              className="relative bg-background flex group justify-between px-2 py-2 border items-center rounded-md border-primary border-opacity-20 hover:bg-primary hover:bg-opacity-5"
            >
              <div className="flex gap-x-2">
                <img
                  src={token.image}
                  alt="img"
                  className="w-[2vw] aspect-square rounded-full object-cover"
                />
                <div>
                  <h1 className="text-sm">{token.name}</h1>
                  <p className="text-xs w-[8vw] truncate text-front/60">
                    {token.creator}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm">{token.symbol}</p>
                <Icon
                  icon="arrow_forward"
                  className="self-end hidden group-hover:block duration-300 ease-in"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
