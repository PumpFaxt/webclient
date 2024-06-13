import React, { useEffect, useState } from "react";
import {
  useDataMessage,
  useLocalPeer,
  useRemoteAudio,
  useRemotePeer,
} from "@huddle01/react/hooks";
import AudioStream from "./AudioStream";
import { twMerge } from "tailwind-merge";

interface GridCardProps {
  peerId?: string;
  className?: string;
}

export default function FellowCard(props: GridCardProps) {
  const [reaction, setReaction] = useState("");

  const { peerId } = props;

  const { metadata, role } = peerId
    ? useRemotePeer<{
        displayName: string;
        avatarUrl: string;
        isHandRaised: boolean;
      }>({ peerId })
    : useLocalPeer<{
        displayName: string;
        avatarUrl: string;
        isHandRaised: boolean;
      }>();

  useDataMessage({
    onMessage(payload, from, label) {
      if (from === peerId) {
        if (label === "reaction") {
          setReaction(payload);
          setTimeout(() => {
            setReaction("");
          }, 5000);
        }
      }
    },
  });

  return (
    <div
      className={twMerge(
        "relative flex items-center justify-center",
        props.className
      )}
    >
      {peerId && <AudioStream peerId={peerId} />}

      <img
        src={metadata?.avatarUrl}
        alt="default-avatar"
        className="object-contain aspect-square"
      />

      <div className="mt-1 text-center">
        <div className="text-custom-5 text-base font-medium">
          {metadata?.displayName}
        </div>
        <div className="text-custom-6 text-sm font-normal">{role}</div>
      </div>
      <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 mb-2 text-4xl">
        {reaction}
      </div>

      {role && ["host, coHost, speaker"].includes(role) && (
        <div className="absolute right-0">audio</div>
      )}

      {metadata?.isHandRaised && (
        <div className="absolute flex right-2 w-8 h-8 -top-1 rounded-full justify-center items-center bg-custom-8 text-xl border-custom-1 border-2">
          ✋
        </div>
      )}
    </div>
  );
}
