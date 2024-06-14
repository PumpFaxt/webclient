import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import { Token } from "../../../types";

interface TokenTraderProps {
  token: Token;
}

export default function TokenTrader(props: TokenTraderProps) {
  const { token } = props;

  return (
    <div className="w-1/4 flex flex-col items-center relative gap-y-2">
      <p className="self-start animate-pulse">You are buying {token.symbol}</p>
      <div className="border border-front/20 p-3 rounded-lg min-h-[15vh]">
        <h1>Sell</h1>
        <div className="flex gap-x-2 justify-between">
          <input
            className="bg-back text-xl py-2 w-2/3 focus-within:outline-none"
            placeholder="0"
          />
          <div className="flex gap-x-2 items-center bg-front/10 w-max rounded-2xl h-max py-1 px-2 justify-end">
            <h1>FRAX</h1>
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/6952.png"
              alt="frax"
              className="w-[1.5vw] object-contain"
            />{" "}
          </div>
        </div>
        <p className="text-sm flex justify-end pt-1 text-front/70">
          Balance: 32.10 FRAX
        </p>
      </div>

      <button className="p-1 scale-150 border w-max border-front/20 text-xs bg-background rounded-md rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Icon icon="arrow_forward" />
      </button>

      <div className="border border-front/20 p-3 rounded-lg min-h-[15vh]">
        <h1>Buy</h1>
        <div className="flex gap-x-2 justify-between">
          <input
            disabled
            type="number"
            className="bg-back text-xl py-2 w-2/3"
            placeholder="0"
          />
          <div className="flex gap-x-2 items-center bg-front/10 w-max rounded-2xl h-max py-1 px-2 justify-between">
            <h1>{token.symbol}</h1>
            <img
              src={token.image}
              alt={token.symbol}
              className="w-[1.5vw] object-contain rounded-full"
            />{" "}
          </div>
        </div>
      </div>
      <div className="flex gap-x-1">
        <input
          placeholder="current slippage 1%"
          className="text-sm px-2 py-1 bg-background border border-front/20 rounded-md focus-within:outline-none"
        />
        <button className="text-sm self-end py-1 px-3 rounded-md bg-front/10 whitespace-nowrap ">
          Set max slippage
        </button>
      </div>
    </div>
  );
}
