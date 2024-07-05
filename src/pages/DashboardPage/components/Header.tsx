import React from "react";
import { useAccount, useContractRead, useDisconnect } from "wagmi";
import useModal from "../../../hooks/useModal";
import GetUsernameModal from "./GetUsernameModal";
import UsernameWrapper from "../../../common/UsernameWrapper";
import contractDefinitions from "../../../contracts";
import CustomizeProfileModal from "./CustomizeProfileModal";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const modal = useModal();

  const args = address ? ([address] as const) : undefined;

  const username = useContractRead({
    ...contractDefinitions.usernameRental,
    functionName: "getDisplayName",
    args,
    enabled: !!address,
  });

  const profileIndex = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "displayPictureIndex",
    args,
  });

  return (
    <section className="p-page">
      <div className="bg-tertiary p-1 mt-8">
        <div className="bg-tertiary p-1 border-2 border-front">
          <div className="bg-tertiary p-3 border-2 border-front">
            <div className="flex widescreen:justify-center widescreen:items-center gap-x-4 ">
              {profileIndex.data ? (
                <img
                  src={`/images/wojack/${profileIndex.data}.png`}
                  alt="pfp"
                  className="h-[10vh] rounded-full border-2 bg-background p-1 aspect-square object-cover"
                />
              ) : (
                <img
                  src="/images/profile-pepe.png"
                  alt="pfp"
                  className="h-[10vh]"
                />
              )}
              <div className="flex items-center gap-x-4">
                <div className="flex flex-col widescreen:items-center gap-y-2">
                  <h1 className="mobile:w-1/2 mobile:self-start mobile:truncate flex gap-x-1">
                    {username?.data?.toLowerCase() !==
                      address?.toLowerCase() && <span>Usernme:</span>}
                    <span className="font-bold">
                      <UsernameWrapper>{address}</UsernameWrapper>
                    </span>
                  </h1>
                  <div className="flex gap-x-4">
                    <button
                      className="bg-yellow-600 w-max px-3 relative z-1 shadow-[4px_4px_2px_#001100bb] "
                      onClick={() => modal.show(<CustomizeProfileModal />)}
                    >
                      Customize Profile
                    </button>
                    {username?.data?.toLowerCase() ===
                      address?.toLowerCase() && (
                      <button
                        className="bg-[#008000] w-max px-3 relative z-1 shadow-[4px_4px_2px_#001100bb] "
                        onClick={() => modal.show(<GetUsernameModal />)}
                      >
                        Get Username
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="widescreen:absolute widescreen:right-1/4 widescreen:translate-x-full mobile:self-end mobile:-translate-x-full">
                <button
                  className="bg-red-700 px-4 py-1 shadow-[4px_4px_2px_#001100bb] mobile:text-sm"
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
