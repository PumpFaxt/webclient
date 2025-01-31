import { useState } from "react";
import Mandelbrot from "../../../common/Mandelbrot";
import bongandoff from "../../../config/bongandoff";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import useToast from "../../../hooks/useToast";
import useModal from "../../../hooks/useModal";
import Introduction from "../../../common/Introduction";

export default function Hero() {
  const navigate = useNavigate();
  const modal = useModal();

  return (
    <section className="p-page relative flex h-screen items-center mobile:flex-col opacity-30">
      <div className="absolute-cover pointer-events-none -z-20">
        <Mandelbrot className="opacity-[3%]" />
      </div>

      <div className="flex-1 flex flex-col gap-y-4 font-semibold mobile:items-center mobile:mt-4">
        <h1 className="text-8xl mobile:text-6xl">It's simple</h1>
        <h2 className="text-4xl mobile:text-2xl">
          We're all here to pump it, fast!
        </h2>

        <p className="font-light text-xl widescreen:flex mobile:text-center">
          Explore the latest and best memecoins on the
          <Link
            to="https://www.frax.com"
            target="_blank"
            className="italic px-1 mx-1 underline underline-offset-2 hover:no-underline mobile:mx-1"
          >
            Fraxtal
          </Link>
          Network
        </p>
        <div className="mt-5 flex gap-x-5">
          {/* <button
            className="px-6 py-2 bg-foreground text-back  w-max"
            onClick={() => {
              navigate("/showcase");
            }}
          >
            START PUMPING
          </button> */}
          <button
            className="px-6 py-2 border-2 text-front w-max"
            onClick={() => modal.show(<Introduction />)}
          >
            HOW IT WORKS?
          </button>
        </div>
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
