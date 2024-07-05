import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import { Link, Navigate } from "react-router-dom";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { useAccount } from "wagmi";
import TokenCard from "../../../common/TokenCard";

export default function TokensYouDeployed() {
  const { address } = useAccount();

  if (!address) return <Navigate to="/showcase" />;
  const tokens = useApiResponse(api.tokens.getByUserAddress, address);
  console.log(tokens.data);

  return (
    <section className="flex flex-col items-center p-page">
      <div className="flex group/showcase flex-wrap w-full gap-4 my-6">
        {!tokens.loading &&
          tokens.data &&
          tokens.data.map((token, i) => (
            <div className="flex flex-col gap-y-8 w-[32%] bg-background h-max p-1 mobile:w-full">
              <TokenCard token={token} key={i} />
            </div>
          ))}
      </div>
    </section>
  );
}
