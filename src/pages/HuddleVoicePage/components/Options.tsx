import React, { useEffect, useState } from "react";

import {
  useLocalPeer,
  useLocalAudio,
  useRoom,
  useDataMessage,
} from "@huddle01/react/hooks";

export default function Options() {
  const { leaveRoom, closeRoom } = useRoom();

  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio({});
  const { role } = useLocalPeer();

  const dataMessage = useDataMessage();

  return (
    <div className="absolute bottom-6 w-full flex items-center px-10 justify-between">
      <div className="flex items-center gap-4">
        {role !== "listener" && (
          <button onClick={() => (isAudioOn ? disableAudio : enableAudio)()}>
            {isAudioOn ? "Mic Off" : "Mic Onn"}
          </button>
        )}

        <button
          onClick={() =>
            dataMessage.sendData({
              to: "*",
              label: "reaction",
              payload: "🚀",
            })
          }
        >
          rockt
        </button>

        <button onClick={role === "host" ? closeRoom : leaveRoom}>
          {role === "host" ? "End Room" : "Leave Room"}
        </button>
      </div>
    </div>
  );
}
