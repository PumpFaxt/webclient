import React from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <section className="p-page">
      <div className="bg-tertiary p-1 mt-8">
        <div className="bg-tertiary p-1 border-2 border-front">
          <div className="bg-tertiary p-3 border-2 border-front">
            <div className="flex justify-center items-center gap-x-4">
              <img
                src="/images/profile-pepe.png"
                alt="pfp"
                className="h-[10vh]"
              />
              <div className="flex flex-col items-center gap-y-2">
                <h1>{address}</h1>
                <button className="bg-[#008000] w-max px-3 relative z-1 shadow-[4px_4px_2px_#001100bb]">
                  Get Username
                </button>
              </div>

              <div className="absolute right-1/4 translate-x-full">
                <button
                  className="bg-red-700 px-4 py-1 shadow-[4px_4px_2px_#001100bb]"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
