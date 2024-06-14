import React, { useEffect, useState } from "react";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import { Link } from "react-router-dom";

export default function Header() {
  const token = {
    name: "Bojack Big bren",
    symbol: "BJT",
    owner: "0x85ab0447B80438255E2f8aFcF092f5A272881098",
    imageUrl:
      "https://static.news.bitcoin.com/wp-content/uploads/2021/09/the-feels-guy-gets-blockchained--rare-wojak-nft-project-to-launch-4000-randomly-generated-wojaks.jpg",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut voluptatibus possimus excepturi totam nesciunt harum asperiores eligendi explicabo reiciendis corrupti sunt quam at",
  };

  const [uclr, setUclr] = useState("#fff");

  async function loadColorFromImage() {
    const rgbClamped = await getImageDominantRgb(token.imageUrl);
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
  }, []);

  return (
    <div
      className="bg-foreground/10 p-4 flex gap-x-4"
      style={{ "--uclr": uclr } as React.CSSProperties}
    >
      <div className="overflow-hidden basis-1/3">
        <img
          src={token.imageUrl}
          className="hover:scale-105 duration-150 ease-in hover:animate-ping"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between basis-2/3 border-b border-front/70">
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
              Creator: {token.owner}
            </h3>
            <p className="text-front/70 text-sm ">{token.description}</p>
          </div>

          <div className="flex flex-col text-end items-end text-sm gap-y-2 w-[20%]">
            <div className="flex gap-x-2 items-center">
              <h1>Website</h1>
              <img
                src="https://img.icons8.com/ios/50/domain--v1.png"
                className="w-[1.2vw] invert"
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <h1>Telegram</h1>
              <img
                src="https://img.icons8.com/ios/50/telegram-app.png"
                className="w-[1.2vw] invert"
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <h1>X (Twitter)</h1>
              <img
                src="https://img.icons8.com/ios-filled/50/twitterx--v2.png"
                className="w-[1.2vw] invert"
              />
            </div>
          </div>
        </div>
        <div>
          {" "}
          <div className="mt-2 text-sm text-front/70">
            <p>
              Token Supply :{" "}
              <span className="text-front font-semibold">6942000</span>
            </p>
            <p>
              Market Cap:{" "}
              <span className="text-front font-semibold">$2043493</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
