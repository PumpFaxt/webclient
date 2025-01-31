import React from "react";
import useModal from "../hooks/useModal";
import { Link } from "react-router-dom";

export default function Introduction() {
  const modal = useModal();

  return (
    <article className="bg-background rounded-md widescreen:max-w-[50vw] mobile:translate-x-4 mobile:w-full p-10 border border-front/40 shadow text-center mobile:p-4">
      <h1 className="text-3xl font-bold mb-4 animate-gradient text-center ">
        Launching Soon on Fraxtal L2!
      </h1>
      <p className="mb-1 mobile:mb-2">
        Please stay tuned and we are glad to know that you are interested in
        our project!
        <br />
        Meanwhile you can stay in touch with us on our{" "}
      </p>

      <div className="flex items-center mt-8 justify-center gap-x-4">
        <a
          target="_blank"
          className="border px-4 py-1 rounded-sm"
          href="https://x.com/pumpfaxt"
        >
          Twitter (X)
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          className="bg-blue-400 px-4 py-1 rounded-sm"
          href="https://t.me/pumpfaxt"
        >
          Telegram
        </a>
      </div>

      <p className="mt-8 text-red-500 text-xs">
        We are trying to launch as soon as possible, let us know if you have
        any questions.
        <br />
        We will keep updating our progress and our features on X
      </p>
      {/* 
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-orange-500 mobile:text-xl">
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
      </div> */}

      {/* <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-cyan-500 mobile:text-xl">
          2. Create and Trade Tokens
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li className="mb-2">
            Create tokens from your dashboard (accessible via your profile in
            the navbar).
          </li>
          <li className="mb-2 text-red-600">
            Note: NSFW token will be deleted without any refund.
          </li>
          <li className="mb-2">Trade tokens using FRAX.</li>
          <li>Each token follows a bonding curve.</li>
        </ul>
      </div> */}

      {/* <div>
        <h2 className="text-2xl font-semibold mb-2 text-green-500 mobile:text-xl">
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
      </div> */}

      {/* <p className="mt-6 mobile:mt-2">Explore the platform and test its features.</p> */}
{/* 
      <div className="relative mt-8">
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
          click here to close
        </span>
      </div> */}
    </article>
  );
}
