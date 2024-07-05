import React, { useState } from "react";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import Icon from "../../../common/Icon";
import { Link, useNavigate } from "react-router-dom";
import UsernameWrapper from "../../../common/UsernameWrapper";

export default function TrendingCoins() {
  const tokens = useApiResponse(api.tokens.trendingToken);
  return (
    <div className="w-1/4 h-[15em] mobile:hidden">
      <h1 className="text-lg flex gap-x-1 px-1 items-end">
        <img src="/images/fire-flame.gif" className="h-[1.6em]" />
        <span className="uppercase font-medium text-yellow-200">Trending</span>
      </h1>
      <div className="flex flex-col gap-y-2 mt-1 overflow-y-scroll h-[85%] scrollbar-primary w-full">
        {!tokens.loading &&
          tokens.data &&
          tokens.data.map((token: { address: any; image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; creator: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; symbol: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => (
            <a
              href={`/T/${token.address}`}
              key={key}
              className="relative bg-background flex group justify-between px-2 py-2 border items-center rounded-md border-primary border-opacity-20 hover:bg-primary hover:bg-opacity-5"
            >
              <div className="flex gap-x-2 items-center">
                <img
                  src={token.image}
                  alt="img"
                  className="w-[2vw] h-[2vw] aspect-square rounded-full object-cover"
                />
                <div>
                  <h1 className="text-sm">{token.name}</h1>
                  <p className="text-xs w-[10vw] truncate text-front/60">
                    Creator: <UsernameWrapper>{token.creator}</UsernameWrapper>
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
            </a>
          ))}
      </div>
    </div>
  );
}
