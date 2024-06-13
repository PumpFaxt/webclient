import React, { useEffect, useState } from "react";

import {
  useRoom,
  useLocalPeer,
  useLocalAudio,
  usePeerIds,
  useHuddle01,
  useDataMessage,
} from "@huddle01/react/hooks";
import { useNavigate } from "react-router-dom";

interface RoomProps {
  leaveCall: () => void;
}

export default function Room(props: RoomProps) {
  const { state } = useRoom({
    onLeave: () => {
      props.leaveCall();
    },
  });

  // const { changePeerRole } = useAcl();
  const [requestedPeerId, setRequestedPeerId] = useState("");
  const { showAcceptRequest, setShowAcceptRequest } = useStore();
  const addChatMessage = useStore((state) => state.addChatMessage);
  const addRequestedPeers = useStore((state) => state.addRequestedPeers);
  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);
  const requestedPeers = useStore((state) => state.requestedPeers);
  const avatarUrl = useStore((state) => state.avatarUrl);
  const userDisplayName = useStore((state) => state.userDisplayName);
  const isChatOpen = useStore((state) => state.isChatOpen);
  const { updateMetadata, metadata, peerId, role } = useLocalPeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>();
  const { peerIds } = usePeerIds();

  const { huddleClient } = useHuddle01();

  useEffect(() => {
    if (state === "idle") {
      props.leaveCall()
      return;
    } else {
      updateMetadata({
        displayName: userDisplayName,
        avatarUrl: avatarUrl,
        isHandRaised: metadata?.isHandRaised || false,
      });
    }
  }, []);

  useDataMessage({
    onMessage(payload, from, label) {
      if (label === "requestToSpeak") {
        setShowAcceptRequest(true);
        setRequestedPeerId(from);
        addRequestedPeers(from);
        setTimeout(() => {
          setShowAcceptRequest(false);
        }, 5000);
      }

      if (label === "chat" && from !== peerId) {
        const messagePayload = JSON.parse(payload);
        const newChatMessage = {
          name: messagePayload.name,
          text: messagePayload.message,
          is_user: false,
        };
        addChatMessage(newChatMessage);
      }
    },
  });

  useEffect(() => {
    if (!requestedPeers.includes(requestedPeerId)) {
      setShowAcceptRequest(false);
    }
  }, [requestedPeers]);

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      {/* <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
        <div className="absolute right-4 bottom-20">
          {showAcceptRequest && <AcceptRequest peerId={requestedPeerId} />}
        </div>
      </div> */}
      {/* {isChatOpen && <Chat />} */}
      {/* <BottomBar /> */}
      {/* <Prompts /> */}
    </section>
  );
}
