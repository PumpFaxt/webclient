import React, { useEffect, useState } from "react";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import { Link } from "react-router-dom";
import { Token } from "../../../types";
import { useContractRead } from "wagmi";
import contractDefinitions from "../../../contracts";

interface HeaderProps {
  token: Token;
}

export default function Header(props: HeaderProps) {
  const { token } = props;

  const [uclr, setUclr] = useState("#fff");

  async function loadColorFromImage() {
    const rgbClamped = await getImageDominantRgb(token.image);
    var rgb = [rgbClamped[0], rgbClamped[1], rgbClamped[2]];
    while (getLuminicanceFromRgb(rgb) < 128) {
      rgb[0] += 1;
      rgb[1] += 1;
      rgb[2] += 1;
    }
    const clr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    setUclr(clr);
  }

  useEffect(() => {
    loadColorFromImage();
  }, [token]);

  const marketCap = useContractRead({
    ...contractDefinitions.token,
    address: token.address,
    functionName: "marketCap",
  });

  console.log(token)

  return (
    <section
      className="bg-foreground/5 p-4 flex gap-x-4 h-[30vh] rounded-lg"
      style={{ "--uclr": uclr } as React.CSSProperties}
    >
      <div className="overflow-hidden max-w-[35%] rounded-lg">
        <img src={token.image} className="h-full object-contain hover:animate-ping" />
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <div className="flex justify-between pb-3 border-b border-front/70 w-full">
          <div className="flex flex-col h-max">
            <div className="flex items-center gap-x-4">
              <h1 className="text-2xl font-bold text-[var(--uclr)]">
                {token.name}
              </h1>
              <h4 className="text-front/70 border border-front/70 py-1 px-3 rounded-md text-xs">
                Ticker : {token.symbol}
              </h4>
            </div>
            <h3 className="text-pink-400 font-medium py-1">
              Creator: {token.creator}
            </h3>
            <p className="text-front/70 text-sm ">{token.description}</p>
          </div>

          <div className="flex flex-col text-end items-end text-sm gap-y-2 w-[20%]">
            {token.website && (
              <Link
                to={token.website}
                target="_blank"
                className="flex gap-x-2 items-center"
              >
                <h1>Website</h1>
                <img
                  src="https://img.icons8.com/ios/50/domain--v1.png"
                  className="w-[1.2vw] invert"
                />
              </Link>
            )}
            {token.telegram && (
              <Link
                to={`https://t.me/${token.telegram}`}
                target="_blank"
                className="flex gap-x-2 items-center"
              >
                <h1>Telegram</h1>
                <img
                  src="https://img.icons8.com/ios/50/telegram-app.png"
                  className="w-[1.2vw] invert"
                />
              </Link>
            )}
            {token.twitter && (
              <Link
                to={`https://x.com/${token.twitter}`}
                className="flex gap-x-2 items-center"
              >
                <h1>X (Twitter)</h1>
                <img
                  src="https://img.icons8.com/ios-filled/50/twitterx--v2.png"
                  className="w-[1.2vw] invert"
                />
              </Link>
            )}
          </div>
        </div>
        <div>
          {" "}
          <div className="mt-2 text-sm text-front/70">
            <p>
              Token Supply :{" "}
              <span className="text-front font-semibold">
                {token.totalSupply}
              </span>
            </p>
            <p>
              Market Cap:{" "}
              <span className="text-front font-semibold">${Number(marketCap.data)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
