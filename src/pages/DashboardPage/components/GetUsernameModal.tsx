import { useState } from "react";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractDefinitions from "../../../contracts";
import { twMerge } from "tailwind-merge";
import { ONE_FRAX } from "../../../config";

export default function GetUsernameModal() {
  const modal = useModal();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const avbl = useContractRead({
    ...contractDefinitions.usernameRental,
    functionName: "checkUsernameAvailability",
    args: [username],
  });

  function handleInputChange(username: string) {
    setUsername(username);
    console.log(username, avbl.data);
  }

  const fee = useContractRead({
    ...contractDefinitions.usernameRental,
    functionName: "fee",
  });

  const buyUsername = useContractWrite({
    ...contractDefinitions.usernameRental,
    functionName: "registerUsername",
  });

  const approveTransfer = useContractWrite({
    ...contractDefinitions.frax,
    functionName: "approve",
  });

  useWaitForTransaction({
    hash: approveTransfer.data?.hash,
    onSuccess: async () => {
      buyUsername.write({
        args: [username],
      });
    },
    onError: () => {
      setLoading(false);
    },
  });

  useWaitForTransaction({
    hash: buyUsername.data?.hash,
    onSuccess: async () => {
      setLoading(false);
      modal.hide();
    },
    onError: () => {
      setLoading(false);
    },
  });

  function handleGetUsername() {
    setLoading(true);
    if (fee.data) {
      approveTransfer.write({
        args: [contractDefinitions.usernameRental.address, fee.data],
      });
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background max-w-[50vw] p-2 relative">
      <button
        className="absolute top-6 right-6 hover:text-red-500 hover:border-red-500 duration-100 ease-in text-xl border p-1 rounded-full"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" />
      </button>
      <div className="bg-background p-[0.2rem] border-2 border-front">
        <div className="bg-background border-2 border-front py-8">
          <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold relative overflow-hidden mobile:text-center">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient text-transparent">
                Your PumpFaxt Username
              </span>
              Your PumpFaxt Username
            </h1>
            <div className="relative flex mt-2 w-[80%] mobile:w-[90%]">
              <p className="text-opacity-80 text-front text-center">
                Your identity across PumpFaxt: one name for all your comments,
                in the voice channels, and for your meme coins
                <div className="relative inline-block group">
                  <button className="text-xl border rounded-full ml-2 translate-y-1">
                    <Icon icon="question" />
                  </button>
                  <p className="text-opacity-80 z-10 text-front text-center text-sm absolute bg-background border p-2 mt-2 hidden group-hover:block w-[40vw] -translate-x-1/2">
                    You can get a username for just{" "}
                    <span className="font-bold text-front">5 frax</span>! Why
                    get a username? When you buy a username, people can identify
                    you and remember your memes through your unique name, unless
                    they have the capability to remember wallet addresses.
                  </p>
                </div>
              </p>
            </div>
            <div
              className={twMerge(
                loading ? "opacity-80 animate-pulse" : "",
                "flex justify-between items-center mt-6 pr-4 text-lg border rounded-lg border-front border-opacity-60 w-full"
              )}
            >
              <input
                className="bg-background rounded-lg focus-within:outline-none px-4 py-3 text-lg w-[60%]"
                placeholder="Search for a username"
                value={username}
                type="text"
                onChange={(event) =>
                  handleInputChange(event?.currentTarget.value)
                }
              />
              {!avbl.data ? (
                <>
                  {username && (
                    <button
                      disabled={loading}
                      className="flex gap-x-3 items-center"
                      onClick={() => handleGetUsername()}
                    >
                      <p className="text-green-600 font-bold mobile:whitespace-nowrap">
                        Get Username
                      </p>
                      <img
                        src="/images/pepe-dance.gif"
                        className="w-[2vw] mobile:w-[5vw]"
                      />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex gap-x-3 animate-pulse">
                  <p className="text-red-700 font-bold">Not Available</p>
                  <img src="/images/pepe-sad.gif" className="w-[2vw]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
