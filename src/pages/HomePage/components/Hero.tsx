import { useState } from "react";
import Mandelbrot from "../../../common/Mandelbrot";
import bongandoff from "../../../config/bongandoff";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import useToast from "../../../hooks/useToast";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="p-page relative flex h-screen items-center">
      <div className="absolute-cover pointer-events-none -z-20">
        <Mandelbrot className="opacity-[3%]" />
      </div>

      <div className="flex-1 flex flex-col gap-y-4 font-semibold">
        <h1 className="text-8xl">It's simple</h1>
        <h2 className="text-4xl">We're all here to pump it, fast!</h2>

        <p className="font-light text-xl flex">
          Explore the latest and best memecoins on the
          <Link
            to="https://www.frax.com"
            target="_blank"
            className="italic px-1 mx-1 underline underline-offset-2 hover:no-underline"
          >
            Fraxtal
          </Link>
          Network
        </p>

        <button
          className="px-6 py-2 bg-foreground text-back mt-5 w-max"
          onClick={() => {
            navigate("/showcase");
          }}
        >
          START PUMPING
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-[3px] relative group">
          <img
            src="/images/bogandoff.png"
            className="absolute-cover saturate-0 opacity-0 group-hover:opacity-100 duration-1000"
            draggable={false}
          />
          <pre>
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
        </div>

        <h2 className="mt-5 text-5xl font-bold select-none">
          PUMP IT! FA
          <span className="font-light relative pr-2">
            X<span className="absolute left-2">X</span>
          </span>
          T!
        </h2>
      </div>
    </section>
  );
}
