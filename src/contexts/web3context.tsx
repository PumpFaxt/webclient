import React, { createContext, useContext, useEffect, useState } from "react";
import { WagmiConfig, useAccount } from "wagmi";
import { useDisconnect, useSignMessage } from "wagmi";
import wagmiConfig from "../config/wagmi";
import getContracts from "../contracts";
import api, { jwtExists, setJwt } from "../utils/api";
import useModal from "../hooks/useModal";

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
  const { address } = useAccount();
  const modal = useModal();

  const { signMessageAsync } = useSignMessage();

  async function getAndSignNonce() {
    if (!address || jwtExists()) return;
    if (localStorage.getItem("jwtToken")) return;
    const nonce = await api.user.requestNonce(address);
    modal.show(<VerificationModal nonce={nonce} />);
  }

  useEffect(() => {
    getAndSignNonce();
  }, [address]);

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}

function VerificationModal(props: { nonce: string }) {
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const modal = useModal();

  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-background p-8 rounded-md flex flex-col text-center gap-y-2 z-10 min-w-[30vw]">
      <div className="w-1/3 rounded-full border-2 overflow-hidden aspect-square flex items-end self-center">
        <img
          src="https://media.tenor.com/raacv5RH3YIAAAAi/peepo-sus.gif"
          className=""
        />
      </div>
      <h1 className="font-semibold text-primary">
        You appear suspicious to Pepe
      </h1>
      <p className="text-sm text-mute">We need you to Sign a nonce</p>

      <div className="flex gap-x-5 px-[10%]">
        <button
          disabled={loading}
          className="flex-1 bg-foreground p-1 font-medium rounded disabled:animate-pulse disabled:opacity-60 disabled:cursor-progress text-back"
          onClick={() => {
            setLoading(true);
            signMessageAsync({ message: props.nonce }).then((res) => {
              if (!address) return;
              api.user.login(address, res).then((result) => {
                setJwt(result.token);
                localStorage.setItem("jwtToken", result.token);
              });
              modal.hide();
            });
          }}
        >
          Sign
        </button>
        <button
          className="flex-1 border border-front p-1 font-medium rounded disabled:animate-pulse disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => {
            disconnect();
            modal.hide();
          }}
          disabled={loading}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
