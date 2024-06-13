"use client";

import React, { useEffect, useState } from "react";

import {
  useLocalPeer,
  useLocalAudio,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";

interface BottomBarProps {}

export default function Options() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { peerIds } = usePeerIds();

  const { leaveRoom, closeRoom } = useRoom();

  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio({});

  //   const sidebarView = useStore((state) => state.sidebar.sidebarView);

  //   const isChatOpen = useStore((state) => state.isChatOpen);
  //   const setIsChatOpen = useStore((state) => state.setIsChatOpen);

  //   const setSidebarView = useStore((state) => state.setSidebarView);

  //   const setPromptView = useStore((state) => state.setPromptView);

  const { role, metadata, updateRole, peerId: localPeerId } = useLocalPeer();

  //   const [showLeaveDropDown, setShowLeaveDropDown] = useState<boolean>(false);

  return (
    <div className="absolute bottom-6 w-full flex items-center px-10 justify-between">
      {/* <div>
        {role === "host" || role === "coHost" || role === "speaker" ? (
          <div className="mr-auto flex items-center justify-between gap-3 w-44"></div>
        ) : (
          <OutlineButton
            className="mr-auto flex items-center justify-between gap-3"
            onClick={() => setPromptView("request-to-speak")}
          >
            {BasicIcons.requestToSpeak}
            <div>Request to speak</div>
          </OutlineButton>
        )}
      </div> */}

      <div className="flex items-center gap-4">
        {role !== "listener" &&
          (!isAudioOn ? (
            <button
              onClick={() => {
                enableAudio();
              }}
            >
              Mic Off
            </button>
          ) : (
            <button
              onClick={() => {
                disableAudio();
              }}
            >
              Mic On
            </button>
          ))}

        {/* <Dropdown
          triggerChild={BasicIcons.avatar}
          open={isOpen}
          onOpenChange={() => setIsOpen((prev) => !prev)}
        >
          <EmojiTray
            onClick={() => alert("todo")}
            onClose={() => setIsOpen(false)}
          />
        </Dropdown> */}

        <button
          onClick={() => {
            role === "host" ? closeRoom() : leaveRoom();
          }}
        >
          {role === "host" ? "End Room" : "Leave Room"}
        </button>
      </div>
    </div>
  );
}
