import React, { useState } from "react";
import Icon from "../../common/Icon";
import { getLuminicanceFromRgb } from "../../utils";
import { twMerge } from "tailwind-merge";
export default function () {
  function getRandomColor() {
    let color;
    let luminance;
    do {
      const letters = "89ABCDEF";
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)];
      }
      const rgb = [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
      ];
      luminance = getLuminicanceFromRgb(rgb);
    } while (luminance < 128);
    return color;
  }

  const [joined, setJoined] = useState(true);

  return (
    <div className="border border-front border-opacity-10 rounded-lg p-8 m-8 flex gap-x-8">
      <div className="flex flex-col w-full">
        <button
          className={twMerge(
            !joined
              ? "bg-foreground text-back"
              : "bg-red-500/50 hover:bg-red-500/90 ease-in duration-150 text-front",
            "py-2 px-4 font-semibold rounded-md w-max"
          )}
          onClick={() => setJoined(!joined)}
        >
          {joined ? "Leave Voice channel" : "Join Voice Channel"}
        </button>
        {!joined && (
          <div className="mt-6 flex flex-col gap-y-2 bg-primary/5 w-max p-2 rounded-xl min-w-[30vw]">
            <h1 className="text-xl p-2">Memers in voice channel</h1>
            {usersInVoiceChannel
              .sort((a, b) => (b.muted === a.muted ? 0 : b.muted ? 1 : -1))
              .map((user, key) => (
                <div
                  key={key}
                  className="flex items-center gap-x-2 p-2 hover:bg-secondary/10 rounded-lg duration-300 ease-in justify-between w-full cursor-pointer"
                >
                  <div className="flex gap-x-3 items-center">
                    <div className="w-[3vw] border border-front rounded-lg p-1">
                      <img
                        src="https://i.seadn.io/gae/hsWaOw_SOTvLES83mRykzKjaSn2Duzna0HVkXyLbkhekTprkpjeYXhq2bCUc4vy_fKzBEEFbgwSK9z-GAFT2riLM-3t4DI96dYejfQ?auto=format&dpr=1&w=1000"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="w-[15vw] truncate text-sm"
                        style={{ color: getRandomColor() }}
                      >
                        {user.address}
                      </p>
                      {user.additional && (
                        <p className="text-xs text-front/70">
                          {user.additional}
                        </p>
                      )}
                    </div>
                  </div>
                  {user.muted ? (
                    <Icon icon="mic" className="text-xl" />
                  ) : (
                    <Icon icon="micOff" className="text-red-500 text-xl" />
                  )}
                </div>
              ))}
            <button className="underline self-end text-sm">View all </button>
          </div>
        )}

        {joined && (
          <div className="mt-6 flex flex-wrap gap-y-8 gap-x-2 w-full rounded-xl justify-around p-4">
            {usersInVoiceChannel
              .sort((a, b) => (b.muted === a.muted ? 0 : b.muted ? 1 : -1))
              .map((user, key) => (
                <div
                  key={key}
                  className="relative group flex items-center py-4 px-4 gap-y-4 hover:bg-secondary/10 rounded-lg duration-300 ease-in cursor-pointer w-[16vw] flex-col border border-front/10 "
                >
                  <h1 className="absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 text-xl font-bold">
                    View Profile
                  </h1>
                  <div className="w-[8vw] border border-front rounded-lg p-1 group-hover:opacity-10 duration-300 ease-in-out">
                    <img
                      src="https://i.seadn.io/gae/hsWaOw_SOTvLES83mRykzKjaSn2Duzna0HVkXyLbkhekTprkpjeYXhq2bCUc4vy_fKzBEEFbgwSK9z-GAFT2riLM-3t4DI96dYejfQ?auto=format&dpr=1&w=1000"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex gap-x-4 group-hover:opacity-10 duration-300 ease-in-out">
                    <div className="flex flex-col justify-start items-start">
                      <p
                        className="w-[12vw] truncate text-sm"
                        style={{ color: getRandomColor() }}
                      >
                        {user.address}
                      </p>
                      {user.additional && (
                        <p className="self-center ">{user.additional}</p>
                      )}
                    </div>
                    {user.muted ? (
                      <Icon icon="mic" className="text-xl" />
                    ) : (
                      <Icon icon="micOff" className="text-red-500 text-xl" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

const usersInVoiceChannel = [
  {
    address: "0x2fE8D3B7FbD8D2b8977C8E7e41B0B93aC9e2D86E",
    muted: false,
    additional: "Owner",
  },
  {
    address: "0x8A54d27A1E378B1d6b36Ff5C16F76C4Fd2C5E895",
    muted: true,
  },
  {
    address: "0xBc8e2Ea92f5A46e0F8371C074D25cEF34C95f7B1",
    muted: false,
  },
  {
    address: "0x4D9eFe9dD2a4Fd8C07DdEb7bca5Ee9A748A3F0E7",
    muted: true,
  },
  {
    address: "0x7F7B4eEc6Ba6A2d17C3EAd1B77Bc3e7F8eC9B27E",
    muted: false,
  },
  {
    address: "0x3a6D2E6c4D0b3eA4C0b5dD7a8D6Fc2eCd47A8f4C",
    muted: true,
  },
  {
    address: "0x6C7EFeaD3D2F7aB3e0E8D2D6E5B7C3c6D5F7e8C7",
    muted: false,
  },
  {
    address: "0x0F8E4bD7B4A2F3E1E3D8aE6D7A8F4eC7bD3f8C6E",
    muted: true,
  },
  {
    address: "0x2D4C5b7E3A7B1D6E8C3D5A7B3E8F7a4C6E9F8C7B",
    muted: false,
  },
  {
    address: "0x5F6E3bA7C4D3E1a8D7E9C6B5aE8f7B3C9E4F8D7A",
    muted: true,
  },
];
