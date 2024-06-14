import { useEffect, useState } from "react";
import {
  formatAddress,
  getImageDominantRgb,
  getLuminicanceFromRgb,
} from "../utils";
import { Token } from "../types";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

interface TokenCardProps {
  token: Token;
  className?: string;
}

export default function TokenCard(props: TokenCardProps) {
  const data = props.token;

  const [color, setColor] = useState("rgb(255, 255, 255)");

  async function loadData() {
    const rgbClamped = await getImageDominantRgb(data.image);
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
    <Link
      to={`/T/${data.address}`}
      className={twMerge(
        props.className,
        "flex border border-front/20 rounded-lg select-none relative overflow-hidden group"
      )}
    >
      <img
        src="/images/rainbow-bg.gif"
        alt="rainbouu"
        className="absolute-cover opacity-0 group-hover:opacity-100 group-hover:duration-[100000ms] ease-out duration-[3000ms] -z-1"
      />

      <img
        src={data.image}
        alt={data.name}
        className="w-1/3 m-3 object-contain"
      />
      <div className="flex flex-col m-3 gap-y-1 group-hover:mix-blend-difference">
        <h3
          className="font-semibold tracking-wide text-lg"
          style={{ color: color }}
        >
          {data.name}
        </h3>
        <h4 className="text-sm font-semibold text-front/70">
          TICKER : {data.symbol}
        </h4>

        <h5 className="text-pink-400 truncate max-w-[16ch] text-xs my-[1px]">
          Created by {formatAddress(data.creator)}
        </h5>

        <p className="mt-1 text-sm text-front/90 font-light line-clamp-4">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
