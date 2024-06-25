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

export default function TokenPage() {
  const { address } = useParams();

  const token = useApiResponse(api.tokens.getByAddress, address || "");

  const [uclr, setUclr] = useState("#fff");

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
          {/* <PriceChart address={address} className="w-3/4 aspect-video" /> */}
          <Chart
            token={token.data}
            className="w-3/4 aspect-video"
            color={uclr}
          />
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
