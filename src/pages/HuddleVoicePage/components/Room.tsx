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

  const [requestedPeerId, setRequestedPeerId] = useState("");
  const avatarUrl = "https://wojak-studio.com/res/bases/happy_smug.png";
  const displayName = address;
  // const isChatOpen = useStore((state) => state.isChatOpen);
  const { updateMetadata, metadata, peerId, role } = useLocalPeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>();
  const { peerIds } = usePeerIds();

  const { huddleClient } = useHuddle01();

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

  useDataMessage({
    onMessage(payload, from, label) {
      if (label === "requestToSpeak") {
        // setShowAcceptRequest(true);
        setRequestedPeerId(from);
        // addRequestedPeers(from);
        setTimeout(() => {
          // setShowAcceptRequest(false);
        }, 5000);
      }

      if (label === "chat" && from !== peerId) {
        const messagePayload = JSON.parse(payload);
        const newChatMessage = {
          name: messagePayload.name,
          text: messagePayload.message,
          is_user: false,
        };
        // addChatMessage(newChatMessage);
      }
    },
  });

  // useEffect(() => {
  // if (!requestedPeers.includes(requestedPeerId)) {
  // setShowAcceptRequest(false);
  // }
  // }, [requestedPeers]);

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <Grid />

      {/* <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
        <div className="absolute right-4 bottom-20">
          {showAcceptRequest && <AcceptRequest peerId={requestedPeerId} />}
        </div>
      </div> */}
      <Options />
      {/* {isChatOpen && <Chat />} */}
      {/* <BottomBar /> */}
      {/* <Prompts /> */}
    </section>
  );
}
