import React, { useEffect, useState } from "react";

import {
  useHuddle01,
  useLobby,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";

interface ConnectionDialogueProps {
  roomId: string;
}

export default function ConnectionDialogue(props: ConnectionDialogueProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [token, setToken] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const { joinRoom, state } = useRoom();

  async function handleStartSpaces() {
    setIsJoining(true);

    let token = "";
    if (state !== "connected") {
      const response = await fetch(
        `/token?roomId=${props.roomId}&name=${displayName}`
      );
      token = await response.text();
    }

    if (!displayName.length) {
      toast.error({
        title:
          "Something went wrong with your wallet connection, please try again!",
      });
      return;
    } else {
      await joinRoom({
        roomId: props.roomId,
        token,
      });
    }
    setIsJoining(false);
  }

  useEffect(() => {
    if (state === "connected") {
      alert("Bhai ye reh gya");
      //   push(`/${params.roomId}`);
    }
  }, [state]);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-lobby text-slate-100">
      <div className="flex flex-col items-center justify-center gap-4 w-[26.25rem]">
        <div className="relative text-center flex items-center justify-center w-fit mx-auto">
          <img
            src={avatarUrl}
            alt="audio-spaces-img"
            className="maskAvatar object-contain aspect-square"
          />
          <video
            src={avatarUrl}
            muted
            className="maskAvatar absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2"
            // autoPlay
            loop
          />
        </div>
        <div className="flex items-center w-full flex-col">
          <button>You will need to connect your wallet</button>
        </div>
        <div className="flex items-center w-full">
          <button
            className="flex items-center justify-center bg-[#246BFD] text-slate-100 rounded-md p-2 mt-2 w-full"
            onClick={handleStartSpaces}
          >
            {isJoining ? "Joining Spaces..." : "Start Spaces"}
            {!isJoining && (
              <img
                alt="narrow-right"
                src="/images/arrow-narrow-right.svg"
                className="w-6 h-6 ml-1"
              />
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
