import React from "react";
import useModal from "../hooks/useModal";
import { Link } from "react-router-dom";

export default function Introduction() {
  const modal = useModal();

  return (
    <article className="bg-background rounded-md max-w-[50vw] p-5 border border-front/40 shadow">
      <h1 className="text-3xl font-bold mb-4 animate-gradient">
        Welcome to PumpFaxt.com BETA
      </h1>
      <p className="mb-4">
        You are interacting with the testnet, where tokens have{" "}
        <b>no monetary value.</b>
        <br />
        Here's how to get started:
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-orange-500">
          1. Claim Test Tokens
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li className="mb-2">You will need frxEth and FRAX for testing.</li>
          <li>
            Claim these tokens using{" "}
            <Link
              to="https://faucet.pumpfaxt.com"
              target="_blank"
              className="underline hover:no-underline text-blue-400"
            >
              our faucet.
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-cyan-500">
          2. Create and Trade Tokens
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li className="mb-2">
            Create tokens from your dashboard (accessible via your profile in
            the navbar).
          </li>
          <li className="mb-2 text-red-600">Note: NSFW token will be deleted without any refund</li>
          <li className="mb-2">Trade tokens using FRAX.</li>
          <li>Each token follows a bonding curve.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2 text-green-500">
          3. Token Threshold and Listing
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li className="mb-2">
            When a token reaches the threshold of ¤ 69,420. it will get listed
            on the R.A exchange.
          </li>
          <li className="mb-2">
            On the testnet, tokens reaching the threshold will be burnt instead
            of being listed.
          </li>
          <li>
            On the mainnet, tokens will be listed upon reaching the threshold.
          </li>
        </ul>
      </div>

      <p className="mt-6">Explore the platform and test its features.</p>

      <div className="relative">
        <button
          onClick={() => {
            localStorage.setItem(
              "pumpfaxt-intro",
              `${Date.now() + 1000 * 60 * 60 * 6}`
            );
            modal.hide();
          }}
          className="text-center bg-yellow-300 text-red-500 px-6 py-2 rounded-sm font-semibold mt-4"
        >
          LFG 🚀🚀🚀
        </button>

        <span className="text-xs text-front/80 mx-2">
          <span className="text-lg text-front animate-pulse">👈</span>
          click to get started
        </span>
      </div>
    </article>
  );
}
