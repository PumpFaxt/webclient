import React, { useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import useModal from "../hooks/useModal";
import FlexSeparator from "./FlexSeparator";
import Icon from "./Icon";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

export default function ConnectWallet() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address } = useAccount();

  const modal = useModal();

  return (
    <>
      {!address && (
        <button
          onClick={() => modal.show(<ConnectWalletModal />)}
          className={twMerge(
            "group font-medium",
            isLoading || pendingConnector
              ? "animate-pulse opacity-80"
              : "hover:hue-rotate-[499999deg] duration-[999999ms]"
          )}
        >
          <>
            <span
              className="group-hover:animate-[scale-pulse_1000ms_infinite] duration-300 group-hover:text-violet-500"
              style={{ animationDelay: `${0}ms` }}
            >
              {"<"}
            </span>
            <span
              className="group-hover:animate-[scale-pulse_1000ms_infinite] duration-300 group-hover:text-orange-500"
              style={{ animationDelay: `${150}ms` }}
            >
              {"|"}
            </span>
            <span
              className="group-hover:animate-[scale-pulse_1000ms_infinite] duration-300 group-hover:text-blue-500"
              style={{ animationDelay: `${300}ms` }}
            >
              {"["}
            </span>
            <span>{"Connect Wallet"}</span>
            <span
              className="group-hover:animate-[scale-pulse_1000ms_infinite] duration-300 group-hover:text-green-500"
              style={{ animationDelay: `${450}ms` }}
            >
              {"]"}
            </span>
            <span
              className="group-hover:animate-[scale-pulse_1000ms_infinite] duration-300 group-hover:text-yellow-500"
              style={{ animationDelay: `${600}ms` }}
            >
              {"|"}
            </span>
            <span
              className="group-hover:animate-[scale-pulse_1000ms_infinite] duration-300 group-hover:text-red-500"
              style={{ animationDelay: `${750}ms` }}
            >
              {">"}
            </span>
          </>
        </button>
      )}

      {address && (
        <Link
          to="/dashboard"
          className="group hover:hue-rotate-[499999deg] duration-[999999ms]"
        >
          {address.split("").map((c, key) => (
            <span
              key={key}
              className="group-hover:text-[var(--c-clr)]"
              style={
                {
                  "--c-clr": `rgb(${100 + Math.random() * 155}, ${
                    100 + Math.random() * 155
                  }, ${100 + Math.random() * 155})`,
                } as React.CSSProperties
              }
            >
              {c}
            </span>
          ))}
        </Link>
      )}
    </>
  );
}

function ConnectWalletModal() {
  const [mousePos, setMousePos] = useState({ left: 0, top: 0 });
  const memeRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const modal = useModal();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const injected = connectors[0];
  const walletconnect = connectors[1];

  return (
    <div>
      <div className="flex mb-2">
        <h1>Choose Your Provider</h1>
        <FlexSeparator />
        <button className="text-xl" onClick={modal.hide}>
          <Icon icon="close" />
        </button>
      </div>

      <div className="flex-1 relative select-none">
        <img
          src="/images/button_meme.png"
          alt="button meme"
          className="h-[80vh]"
          draggable={false}
        />
        <div
          className={twMerge(
            "absolute top-[0.6%] left-[0.5%] opacity-100 cursor-none",
            (isLoading || pendingConnector) &&
              "pointer-events-none brightness-75"
          )}
          onMouseMove={(e) => {
            setMousePos({
              left:
                e.clientX - memeRef.current.getBoundingClientRect().left - 180,
              top:
                e.clientY - memeRef.current.getBoundingClientRect().top - 150,
            });
          }}
          ref={memeRef}
        >
          <div className="relative overflow-hidden group">
            <img
              draggable={false}
              src="/images/btn_meme_border.png"
              className="absolute bottom-0 left-0 z-10 pointer-events-none"
            />
            <img draggable={false} src="/images/meme-button-top.jpg" />
            <img
              src="/images/btn_meme_hand.png"
              draggable={false}
              className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-1 pointer-events-none"
              style={{ ...mousePos }}
            />

            <button
              className="w-[25%] absolute top-[27%] left-[16%] -rotate-[21deg] drop-shadow-md hover:animate-[bounce-scale-sm_500ms] active:scale-75 duration-300 cursor-none"
              disabled={isLoading}
              onClick={() => {
                connect({ connector: injected });
                modal.hide();
              }}
            >
              <img src="/icons/metamask.png" alt="metamask" draggable={false} />
            </button>

            <button
              className="w-[20%] absolute drop-shadow-md top-[16%] left-[52%] -rotate-[25deg] hover:animate-[bounce-scale-sm_500ms] active:scale-75 duration-300 cursor-none"
              disabled={isLoading}
              onClick={() => {
                connect({ connector: walletconnect });
                modal.hide();
              }}
            >
              <img
                src="/icons/walletconnect.png"
                alt="walletconnect"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
