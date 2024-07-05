import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import TokenTrader from "./components/TokenTrader";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import CommentSection from "./components/CommentSection";
import HuddleVoicePage from "../HuddleVoicePage";
import PriceChart from "./components/PriceChart";
import Chart from "./components/Chart";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../utils";
import Gun from "gun";
import { twMerge } from "tailwind-merge";
import FlexSeparator from "../../common/FlexSeparator";
import Transactions from "./components/Transactions";
import TrendingCoins from "./components/TrendingCoins";

export default function TokenPage() {
  const { address } = useParams();

  const token = useApiResponse(api.tokens.getByAddress, address || "");

  const [uclr, setUclr] = useState("#fff");

  const analysisModes = [
    {
      name: "Price",
      element: (
        <Chart
          color={uclr}
          indexBy="value"
          token={token.data}
          className="w-full aspect-video"
        />
      ),
    },
    {
      name: "Mkt Cap",
      element: (
        <Chart
          color={uclr}
          indexBy="marketCap"
          token={token.data}
          className="w-full aspect-video"
        />
      ),
    },
    { name: "Transactions", element: <Transactions token={token.data} /> },
  ] as const;
  const [analyticsMode, setAnalyticsMode] = useState<number>(1);

  useEffect(() => {
    setTimeout(() => {
      setAnalyticsMode(0);
    }, 2000);
  }, []);

  async function loadColorFromImage() {
    if (!token.data) return;

    const rgbClamped = await getImageDominantRgb(token.data.image);
    var rgb = [rgbClamped[0], rgbClamped[1], rgbClamped[2]];
    while (getLuminicanceFromRgb(rgb) < 164) {
      rgb[0] += 1;
      rgb[1] += 1;
      rgb[2] += 1;
    }
    const clr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    setUclr(clr);
  }

  var gun = Gun(address);
  gun.on("put", () => {
    token.refetch();
  });

  useEffect(() => {
    loadColorFromImage();
  }, [token]);

  return (
    <>
      <div className="p-page py-4">
        <div className="flex gap-x-4">
          <Header token={token.data} color={uclr} />
          <TrendingCoins />
        </div>
        <div className="flex mt-8 gap-x-4">
          <div className="flex-1 h-full">
            <div className="flex mb-2">
              <FlexSeparator />

              {analysisModes.map((item, key) => (
                <button
                  key={key}
                  className={twMerge(
                    "px-3 border border-slate-800 font-light text-sm",
                    analyticsMode == key && "bg-slate-700 "
                  )}
                  onClick={() => {
                    setAnalyticsMode(key);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
            {analysisModes[analyticsMode].element}
          </div>

          {token.data && <TokenTrader token={token.data} color={uclr} />}
        </div>

        <div className="flex mt-8 gap-x-4">
          {token?.data?.replies && (
            <CommentSection
              key={`${gun.get(token.data.address)}`}
              comments={token.data.replies}
              tokenAddress={token.data.address}
              gun={gun}
            />
          )}
          <HuddleVoicePage
            tokenAddress={token.data?.address || "0x"}
            roomId={token.data?.roomId || ""}
            roomIdExpiration={token.data?.roomIdExpiration || 0}
            creator={token.data?.creator || "0x"}
            refetchTokenData={token.refetch}
          />
        </div>
      </div>
    </>
  );
}
