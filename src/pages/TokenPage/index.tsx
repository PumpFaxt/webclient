import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import TokenTrader from "./components/TokenTrader";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import CommentSection from "./components/CommentSection";
import HuddleVoicePage from "../HuddleVoicePage";
import PriceChart from "./components/PriceChart";
import Chart from "./components/Chart";

export default function TokenPage() {
  const { address } = useParams();

  if (!address) return <Navigate to="/showcase" />;

  const token = useApiResponse(api.tokens.getByAddress, address);

  return (
    <>
      {!token.loading && token.data && (
        <div className="p-page py-4">
          <Header token={token.data} />
          <div className="flex mt-8 gap-x-4">
            {/* <PriceChart address={address} className="w-3/4 aspect-video" /> */}
            <Chart address={address} />
            <TokenTrader token={token.data} />
          </div>
          <div className="flex mt-8 gap-x-4">
            <CommentSection />
            <HuddleVoicePage />
          </div>
        </div>
      )}
    </>
  );
}
