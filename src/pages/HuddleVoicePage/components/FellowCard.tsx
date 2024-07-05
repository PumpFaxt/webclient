import React, { useEffect, useState } from "react";
import {
  useDataMessage,
  useLocalPeer,
  useRemoteAudio,
  useRemotePeer,
} from "@huddle01/react/hooks";
import AudioStream from "./AudioStream";
import { twMerge } from "tailwind-merge";
import {
  fnv1aHash,
  formatAddress,
  generateColorFromAddress,
} from "../../../utils";
import DisplayPicture from "../../../common/DisplayPicture";
import { Address } from "viem";

interface GridCardProps {
  peerId?: string;
  className?: string;
}

export default function FellowCard(props: GridCardProps) {
  const [reaction, setReaction] = useState("");
  const [color, setColor] = useState("#ffffff");

  const { peerId: localPeerId } = useLocalPeer();
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
      if (from === peerId || (!peerId && from == localPeerId)) {
        if (label === "reaction") {
          setReaction(payload);
          setTimeout(() => {
            setReaction("");
          }, 5000);
        }
      }
    },
  });

  useEffect(() => {
    if (metadata?.displayName) {
      setColor(generateColorFromAddress(metadata.displayName));
    }
  }, [metadata?.displayName]);

  return (
    <div
      className={twMerge(
        "relative flex flex-col items-center p-2 border-2 border-front/20 text-[var(--uclr)] rounded ",
        props.className
      )}
      style={{ "--uclr": color } as React.CSSProperties}
    >
      {peerId && <AudioStream peerId={peerId} />}

      <div className="relative m-3 overflow-hidden rounded-full">
        {metadata?.displayName && (
          <DisplayPicture address={metadata?.displayName as Address} className="w-[5vw]" />
        )}
        <div className="absolute-cover bg-[var(--uclr)] -z-1 opacity-20" />
      </div>

      <div className="mt-1 text-center">
        <p className="font-bold font-comicNeue text-lg">
          {metadata?.displayName && formatAddress(metadata?.displayName)}
        </p>
        <p className="text-front/70 text-sm font-light">
          {role} {!props.peerId && " (You)"}
        </p>
      </div>

      {role && ["host, coHost, speaker"].includes(role) && (
        <div className="absolute right-0">audio</div>
      )}

      {reaction.length > 0 && (
        <div className="absolute top-0 right-0 text-xl -translate-y-1/3 translate-x-1/3 bg-background p-1 border border-front/50 rounded-full aspect-square">
          {reaction}
        </div>
      )}
    </div>
  );
}
