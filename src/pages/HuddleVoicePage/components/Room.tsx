import React, { useEffect, useState } from "react";

import {
  useRoom,
  useLocalPeer,
  useLocalAudio,
  usePeerIds,
  useHuddle01,
  useDataMessage,
} from "@huddle01/react/hooks";
import { useAccount } from "wagmi";
import Grid from "./Grid";
import Options from "./Options";

interface RoomProps {
  leaveCall: () => void;
}

export default function Room(props: RoomProps) {
  const { state } = useRoom({
    onLeave: () => {
      props.leaveCall();
    },
  });

  const { address } = useAccount();

  if (!address) return <></>;

  const avatarUrl = "https://wojak-studio.com/res/bases/happy_smug.png";
  const displayName = address;

  const { updateMetadata, metadata } = useLocalPeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>();
  useEffect(() => {
    if (state === "idle") {
      props.leaveCall();
      return;
    } else {
      updateMetadata({
        displayName: displayName,
        avatarUrl: avatarUrl,
        isHandRaised: metadata?.isHandRaised || false,
      });
    }
  }, []);

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <Grid />
      <Options />
    </section>
  );
}
