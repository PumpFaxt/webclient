import React, { useEffect, useState } from "react";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import { Link } from "react-router-dom";
import { Token } from "../../../types";
import { useContractRead } from "wagmi";
import contractDefinitions from "../../../contracts";
import { ONE_TOKEN } from "../../../config";
import UsernameWrapper from "../../../common/UsernameWrapper";

interface HeaderProps {
  token?: Token;
  color: string;
}

export default function Header(props: HeaderProps) {
  const { token } = props;

  const marketCap = useContractRead({
    ...contractDefinitions.token,
    address: token?.address,
    functionName: "marketCap",
  });

  return (
    <section
      className="bg-foreground/5 p-4 flex gap-x-4 mobile:flex-col mobile:gap-y-2 flex-1 max-w-[70vw] overflow-hidden"
      style={{ "--uclr": props.color } as React.CSSProperties}
    >
      <div className="overflow-hidden widescreen:max-w-[35%] mobile:w-full max-h-[30vh]">
        <img
          src={token?.image}
          className="h-full object-contain hover:animate-ping"
        />
      </div>
      <div className="flex flex-col gap-y-1 w-full justify-between">
        <div className="flex flex-col gap-y-1 w-full">
          <div className="flex justify-between pb-3 border-b border-front/70 w-full mobile:flex-col">
            <div className="flex flex-col h-max">
              <div className="flex items-center gap-x-4">
                <h1 className="text-2xl font-bold text-[var(--uclr)] mobile:text-3xl">
                  {token?.name}
                </h1>
                <h4 className="text-front border border-front py-1 px-3 rounded-md text-xs">
                  Ticker : {token?.symbol}
                </h4>
              </div>
              <h3 className="text-pink-400 font-medium py-1 mobile:text-sm">
                Creator: <UsernameWrapper>{token?.creator}</UsernameWrapper>
              </h3>
              <p className="text-front/70 text-sm ">{token?.description}</p>
            </div>
          </div>

          <div>
            {" "}
            <div className="mt-2 text-sm text-front/70">
              <p>
                Token Supply :{" "}
                <span className="text-front font-semibold">
                  {token?.totalSupply}
                </span>
              </p>
              <>
                {marketCap.data && (
                  <p>
                    Market Cap:{" "}
                    <span className="text-front font-semibold">
                      ${Math.ceil(Number(marketCap.data / ONE_TOKEN))}
                    </span>
                  </p>
                )}
              </>
            </div>
          </div>
        </div>
        <div className="flex text-end items-end self-end justify-end text-sm gap-y-2 mobile:w-full mobile:mt-2 gap-x-3">
          {token?.website && (
            <Link
              to={token?.website}
              target="_blank"
              className="flex gap-x-2 items-center mobile:flex-row-reverse"
            >
              <h1>Website</h1>
              <img
                src="https://img.icons8.com/ios/50/domain--v1.png"
                className="w-[1.2vw] invert mobile:w-[3vw]"
              />
            </Link>
          )}
          {token?.telegram && (
            <Link
              to={`https://t.me/${token.telegram}`}
              target="_blank"
              className="flex gap-x-2 items-center mobile:flex-row-reverse"
            >
              <h1>Telegram</h1>
              <img
                src="https://img.icons8.com/ios/50/telegram-app.png"
                className="w-[1.2vw] invert  mobile:w-[3vw]"
              />
            </Link>
          )}
          {token?.twitter && (
            <Link
              to={`https://x.com/${token.twitter}`}
              className="flex gap-x-2 items-center mobile:flex-row-reverse"
            >
              <h1>X (Twitter)</h1>
              <img
                src="https://img.icons8.com/ios-filled/50/twitterx--v2.png"
                className="w-[1.2vw] invert  mobile:w-[3vw]"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
