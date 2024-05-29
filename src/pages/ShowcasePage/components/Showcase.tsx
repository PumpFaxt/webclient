import React, { useEffect, useState } from "react";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { Coin } from "../../../types";
import { twMerge } from "tailwind-merge";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import { Link } from "react-router-dom";

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

  console.log(coinsSplit);

  return (
    <section className="flex flex-col items-center p-page">
      <h1 className="mt-7 mb-16 font-bold text-5xl font-comicNeue">
        Showcase of Memes
      </h1>
      <div className="flex justify-between">
        {coinsSplit &&
          coinsSplit.map((items, key) => (
            <div key={key} className="flex flex-col gap-y-8 w-[32%]">
              {items &&
                items.map((coin, key) => <CoinCard coin={coin} key={key} />)}
            </div>
          ))}
      </div>
    </section>
  );
}

function CoinCard(props: { coin: Coin; className?: string }) {
  const data = props.coin;

  const [color, setColor] = useState("rgb(255, 255, 255)");

  async function loadData() {
    const rgbClamped = await getImageDominantRgb(data.image_uri);
    var rgb = [rgbClamped[0], rgbClamped[1], rgbClamped[2]];
    while (getLuminicanceFromRgb(rgb) < 128) {
      rgb[0] += 1;
      rgb[1] += 1;
      rgb[2] += 1;
    }
    const clr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    setColor(clr);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={twMerge(props.className, "group/card")}>
      <Link
        to={``}
        className={twMerge(
          "flex border border-front/20 rounded-lg select-none relative overflow-hidden"
        )}
      >
        <img
          src={data.image_uri}
          alt={data.name}
          className="w-1/3 m-3 object-contain"
        />
        <div className="flex flex-col m-3 gap-y-1">
          <h3
            className="font-semibold tracking-wide text-lg"
            style={{ color: color }}
          >
            {data.name
              .replaceAll(/solana/gi, "Fraxtal")
              .replaceAll(/sol/gi, "frax")}
          </h3>
          <h4 className="text-sm font-semibold text-front/70">
            TICKER : {data.symbol}
          </h4>

          <h5 className="text-pink-400 truncate max-w-[16ch] text-xs my-[1px]">
            Created by {data.creator}
          </h5>

          <p className="mt-1 text-sm text-front/90 font-light line-clamp-4">
            {data.description.replaceAll(/sol/gi, "usd")}
          </p>
        </div>
      </Link>
    </div>
  );
}
