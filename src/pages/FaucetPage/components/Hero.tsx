import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import bongandoff from "../../../config/bongandoff";
import { twMerge } from "tailwind-merge";
import ConnectWallet from "../../../common/ConnectWallet";
import { useAccount } from "wagmi";

export default function Hero() {
  const { address } = useAccount();
  return (
    <section className="h-[85vh] text-front flex flex-col items-center p-20 gap-y-10 relative">
      <div className="flex text-5xl items-center gap-x-3">
        <img src="logo.png" className="h-[1.3em]" />
        <h1 className="font-semibold">Test (Fake) FRAX Faucet</h1>
      </div>

      <div className="border-2 p-8 rounded-[1rem] flex flex-col items-center gap-y-2 min-w-[40vw]">
        {!address && <h3>Connect you wallet </h3>}
        <p className="text-sm text-front/60">
          You can claim 100 FRAX every 6 hours
        </p>
        <div className="mt-4">
          <div className="text-sm">Claim Address:</div>
          <p>{address}</p>
        </div>
        {address && (
          <button
            className="mt-4 bg-primary px-5 py-1 font-semibold text-black rounded-md hover:scale-[102%] hover:-translate-y-1 hover:shadow-lg active:translate-y-1 
        active:scale-75 duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            Claim
          </button>
        )}
      </div>

      <div className="bg-yellow-200 text-yellow-900 p-2 rounded-md text-sm">
        You will receive these tokens on the{" "}
        <Link
          to="https://rpc.testnet.frax.com/l2"
          target="_blank"
          className="underline underline-offset-2 hover:no-underline duration-150"
        >
          Fraxtal <span className="font-bold">Testnet</span>
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-gray-300">
        If these tokens are not needed any longer, make sure you send them back
        to 0x54e4fb4CE1388e6A67D4d7Ffb231D5E46751e4cb
      </div>
      <pre className="text-[2px] absolute bottom-0 right-3">
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
