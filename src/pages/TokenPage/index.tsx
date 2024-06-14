import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import TokenTrader from "./components/TokenTrader";
import DexScreener from "./components/DexScreener";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";

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
            <DexScreener />
            <TokenTrader />
          </div>
        </div>
      )}
    </>
  );
}
