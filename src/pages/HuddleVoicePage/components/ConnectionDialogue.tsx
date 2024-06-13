import React, { useEffect, useState } from "react";

import {
  useHuddle01,
  useLobby,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";
import { formatAddress } from "../../../utils";
import api from "../../../utils/api";

interface ConnectionDialogueProps {
  className?: string;
  roomId: string;
  startCall: () => void;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function ConnectionDialogue(props: ConnectionDialogueProps) {
  const { address } = useAccount();

  if (!address)
    return (
      <div>
        <p>Connect your wallet first, before accessing voice chat</p>
      </div>
    );

  const avatarUrl = "https://wojak-studio.com/res/bases/happy_smug.png";
  const displayName = address;

  const [isJoining, setIsJoining] = useState(false);
  const toast = useToast();
  const { joinRoom, state } = useRoom();

  async function handleStartSpaces() {
    setIsJoining(true);

    let token = "";
    if (state !== "connected") {
      token = await api.huddle.getToken(props.roomId, displayName);
      props.setToken(token);
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
      props.startCall();
    }
  }, [state]);

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-y-4 text-center",
        props.className
      )}
    >
      <img
        src={avatarUrl}
        alt={address}
        className="object-contain aspect-square w-1/2"
      />
      <p>
        Joining as
        <span className="font-light text-sm text-pink-300">
          {" "}
          {formatAddress(address)}
        </span>
      </p>
      <button
        className="bg-primary text-back font-medium px-6 py-2 rounded-md"
        onClick={handleStartSpaces}
        disabled={isJoining}
      >
        {isJoining ? "Joining Spaces..." : "Start Spaces"}
      </button>
    </div>
  );
}
