import React, { createContext, useContext, useEffect, useState } from "react";
import { WagmiConfig, useAccount } from "wagmi";
import wagmiConfig from "../config/wagmi";

interface Web3ContextType {}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Wrapper>{children}</Wrapper>
      </WagmiConfig>
    </>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const value = {};

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}
