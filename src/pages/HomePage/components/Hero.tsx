import { useState } from "react";
import Mandelbrot from "../../../common/Mandelbrot";
import bongandoff from "../../../config/bongandoff";
import { twMerge } from "tailwind-merge";

export default function Hero() {
  return (
    <section className="p-page relative flex h-screen items-center">
      <div className="absolute-cover">
        <Mandelbrot className="opacity-[3%]" />
      </div>

      <div className="flex-1"></div>

      <div className="text-[3px]">
        <pre>
          <code className="text-white">
            {bongandoff
              .replaceAll(".", " ")
              .split("")
              .map((c) => (
                <span className={twMerge(c == " " && "bogandoff-spaces")}>
                  {c}
                </span>
              ))}
          </code>
        </pre>
      </div>
    </section>
  );
}
