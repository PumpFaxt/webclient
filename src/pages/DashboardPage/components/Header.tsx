import React from "react";
import { useAccount, useContractRead, useDisconnect } from "wagmi";
import useModal from "../../../hooks/useModal";
import GetUsernameModal from "./GetUsernameModal";
import UsernameWrapper from "../../../common/UsernameWrapper";
import contractDefinitions from "../../../contracts";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const modal = useModal();
  const username = address
    ? useContractRead({
        ...contractDefinitions.usernameRental,
        functionName: "getDisplayName",
        args: [address],
      })
    : undefined;

  console.log(
    username?.data,
    address,
    username?.data?.toString() == address?.toString()
  );
  return (
    <section className="p-page">
      <div className="bg-tertiary p-1 mt-8">
        <div className="bg-tertiary p-1 border-2 border-front">
          <div className="bg-tertiary p-3 border-2 border-front">
            <div className="flex widescreen:justify-center widescreen:items-center gap-x-4 mobile:flex-col">
              {username &&
                username.data?.toLowerCase() == address?.toLowerCase() && (
                  <>
                    <div className="flex items-center gap-x-4">
                      <img
                        src="/images/profile-pepe.png"
                        alt="pfp"
                        className="h-[10vh]"
                      />

                      <div className="flex flex-col items-center gap-y-2">
                        <h1 className="mobile:w-1/2 mobile:self-start mobile:truncate">
                          <UsernameWrapper>{address}</UsernameWrapper>
                        </h1>
                        <button
                          className="bg-[#008000] w-max px-3 relative z-1 shadow-[4px_4px_2px_#001100bb] mobile:self-start"
                          onClick={() => modal.show(<GetUsernameModal />)}
                        >
                          Get Username
                        </button>
                      </div>
                    </div>
                    <div className="widescreen:absolute widescreen:right-1/4 widescreen:translate-x-full mobile:self-end">
                      <button
                        className="bg-red-700 px-4 py-1 shadow-[4px_4px_2px_#001100bb] mobile:text-sm"
                        onClick={() => disconnect()}
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                )}

              {username &&
                username.data?.toLowerCase() != address?.toLowerCase() && (
                  <div className="flex items-center gap-x-4">
                    <img
                      src="/images/pepe-happy.png"
                      alt="pfp"
                      className="h-[10vh]"
                    />

                    <div className="flex flex-col items-center gap-y-2">
                      <h1 className="mobile:w-1/2 mobile:self-start mobile:truncate">
                        Username:{" "}
                        <span className="font-bold">
                          <UsernameWrapper>{address}</UsernameWrapper>
                        </span>
                      </h1>

                      <button
                        className="bg-red-700 px-4 py-1 shadow-[4px_4px_2px_#001100bb] mobile:text-sm"
                        onClick={() => disconnect()}
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
