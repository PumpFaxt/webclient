import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bongandoff from "../../../config/bongandoff";
import { twMerge } from "tailwind-merge";
import ConnectWallet from "../../../common/ConnectWallet";
import { useAccount, useWalletClient } from "wagmi";
import contractDefinitions from "../../../contracts";
import api from "../../../utils/api";
import useApiResponse from "../../../hooks/useApiResponse";
import { ONE_TOKEN } from "../../../config";
import useToast from "../../../hooks/useToast";

export default function Hero() {
  const { address } = useAccount();

  const toast = useToast();
  const navigate = useNavigate();

  const config = useApiResponse(api.faucet.getConfig);
  const ethClaimable = useApiResponse(api.faucet.checkEth, address || "");
  const fraxClaimable = useApiResponse(api.faucet.checkFrax, address || "");

  const [pending, setPending] = useState(false);

  async function claimFrax() {
    if (!address) return;
    setPending(true);
    await api.faucet.claimFrax(address);

    toast.log({ title: "Claimed Frax" });
    navigate("/");
  }
  async function claimEth() {
    if (!address) return;
    setPending(true);
    await api.faucet.claimEth(address);

    toast.log({ title: "Claimed Eth" });
    navigate("/");
  }

  const provider = useWalletClient();

  return (
    <section className="h-[85vh] text-front flex flex-col items-center p-20 gap-y-10 relative">
      <div className="flex text-4xl items-center gap-x-3 relative mobile:flex-col mobile:text-center mobile:gap-y-3">
        {/* <img src="logo.png" className="h-[1.3em]" /> */}
        <h1 className="font-semibold mobile:text-2xl">frxETH and (Dummy)FRAX Faucet</h1>
        <button
          onClick={() =>
            provider.data?.watchAsset({
              options: {
                address: contractDefinitions.frax.address,
                decimals: 18,
                symbol: "FRAX",
                image: "https://cryptologos.cc/logos/frax-frax-logo.png",
              },
              type: "ERC20",
            })
          }
          className="text-xs whitespace-nowrap bg-white text-black font-medium py-1 mobile:text-lg widescreen:absolute bottom-0 left-full px-3 mx-7"
        >
          Add Frax to wallet
        </button>
      </div>

      <section className="flex flex-row-reverse gap-x-10 mobile:flex-col mobile:gap-y-6 mobile:text-center">
        <div className="border-2 p-8 rounded-[1rem] flex flex-col items-center gap-y-2 min-w-[30vw] mobile:bg-background">
          {!address && <h3 className="text-xl">Connect you wallet </h3>}
          <p className="text-sm text-front/60">
            You can claim {(config.data?.frax.amount || 0) / Number(ONE_TOKEN)}{" "}
            FRAX every {(config.data?.frax.cooldown || Infinity) / 3600} hours
          </p>
          {address && (
            <>
              <div className="mt-4">
                <div className="text-sm">Claim Address:</div>
                <p>{address}</p>
              </div>
              {fraxClaimable.data?.claimable ? (
                <button
                  disabled={pending}
                  onClick={claimFrax}
                  className="mt-4 bg-primary px-5 py-1 font-semibold text-black rounded-md hover:scale-[102%] hover:-translate-y-1 hover:shadow-lg active:translate-y-1 
            active:scale-75 duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Claim ¤ Frax
                </button>
              ) : (
                <span className="text-xs text-red-500 mt-7">
                  {fraxClaimable.data?.message}
                </span>
              )}
            </>
          )}
        </div>
        <div className="border-2 p-8 rounded-[1rem] flex flex-col items-center gap-y-2 min-w-[30vw] mobile:bg-background">
          {!address && <h3 className="text-xl">Connect you wallet </h3>}
          <p className="text-sm text-front/60">
            You can claim {(config.data?.eth.amount || 0) / Number(ONE_TOKEN)}{" "}
            frxEth every {(config.data?.eth.cooldown || Infinity) / 3600} hours
          </p>
          {address && (
            <>
              <div className="mt-4">
                <div className="text-sm">Claim Address:</div>
                <p>{address}</p>
              </div>
              {ethClaimable.data?.claimable ? (
                <button
                  disabled={pending}
                  onClick={claimEth}
                  className="mt-4 bg-primary px-5 py-1 font-semibold text-black rounded-md hover:scale-[102%] hover:-translate-y-1 hover:shadow-lg active:translate-y-1 
            active:scale-75 duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Claim frxEth
                </button>
              ) : (
                <span className="text-xs text-red-500 mt-7">
                  {ethClaimable.data?.message}
                </span>
              )}
            </>
          )}
        </div>
      </section>

      <div className="bg-yellow-200 text-yellow-900 p-2 rounded-md text-sm mobile:text-center">
        You will receive these tokens on the{" "}
        <Link
          to="https://rpc.testnet.frax.com/l2"
          target="_blank"
          className="underline underline-offset-2 hover:no-underline duration-150"
        >
          Fraxtal <span className="font-bold">Testnet</span>
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-gray-300 mobile:px-2">
        If these tokens are not needed any longer, make sure you send them back
        to 0xA5F3e5791112815F74aD11190cb654330A78C9a7
      </div>
      <pre className="text-[2px] absolute bottom-0 right-3 mobile:hidden">
        <code className="text-white">
          {bongandoff
            .replaceAll(".", " ")
            .split("")
            .map((c, key) => (
              <span
                key={key}
                className={twMerge(c == " " && "bogandoff-spaces")}
              >
                {c}
              </span>
            ))}
        </code>
      </pre>
    </section>
  );
}
