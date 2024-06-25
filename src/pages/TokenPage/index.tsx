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

export default function TokenPage() {
  const { address } = useParams();

  const token = useApiResponse(api.tokens.getByAddress, address || "");

  const [uclr, setUclr] = useState("#fff");

  const analysisModes = [
    { name: "value" },
    { name: "marketCap" },
    { name: "transactions" },
  ] as const;
  const [analyticsMode, setAnalyticsMode] =
    useState<(typeof analysisModes)[number]["name"]>();

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
        <Header token={token.data} color={uclr} />
        <div className="flex mt-8 gap-x-4">
          <div className="">
            <div className="flex mb-2">
              <FlexSeparator />

              <button
                className={twMerge(
                  "px-3 border border-slate-800 font-light text-sm",
                  analyticsMode == "value" && "bg-slate-700 "
                )}
                onClick={() => {
                  setAnalyticsMode("value");
                }}
              >
                Price
              </button>
              <button
                className={twMerge(
                  "px-3 border border-slate-800 font-light text-sm",
                  analyticsMode == "marketCap" && "bg-slate-700 "
                )}
                onClick={() => {
                  setAnalyticsMode("marketCap");
                }}
              >
                Mkt Cap
              </button>
            </div>
            <Chart
              token={token.data}
              className="w-3/4 aspect-video"
              color={uclr}
            />
          </div>

          {token.data && <TokenTrader token={token.data} />}
        </div>

        <div className="flex mt-8 gap-x-4">
          {token?.data?.replies && (
            <CommentSection
              comments={token.data.replies}
              tokenAddress={token.data.address}
              gun={gun}
            />
          )}
          <HuddleVoicePage />
        </div>
      </div>
    </>
  );
}
