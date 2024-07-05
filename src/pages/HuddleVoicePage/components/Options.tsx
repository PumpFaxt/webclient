import React, { useState } from "react";
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

  const [showEmojis, setShowEmojis] = useState(false);

  const emojis = ["😀", "😂", "😍", "🥳", "😎", "🤔", "😢", "😡", "👍", "🚀"];

  const handleEmojiClick = (emoji: string) => {
    dataMessage.sendData({
      to: "*",
      label: "reaction",
      payload: emoji,
    });
    setShowEmojis(false);
  };

  return (
    <div className="w-full flex items-center justify-around mt-6 relative">
      <div className="flex items-center gap-4">
        {role !== "listener" && (
          <button
            onClick={() => (isAudioOn ? disableAudio : enableAudio)()}
            className="bg-primary px-4 py-1 font-medium text-back"
          >
            {isAudioOn ? "Turn off Mic" : "Turn on Mic"}
          </button>
        )}

        <button
          onClick={() => setShowEmojis((prev) => !prev)}
          className="border border-front px-4 py-1 font-medium text-front"
        >
          React
        </button>

        {showEmojis && (
          <div className="absolute top-full mt-2 border border-primary/50  rounded shadow-lg p-2 w-max bg-background">
            <div className="flex gap-2 w-full flex-wrap">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-xl w-[2ch]"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={role === "host" ? closeRoom : leaveRoom}
          className="bg-red-700 px-4 py-1 font-medium"
        >
          {role === "host" ? "End Room" : "Leave Room"}
        </button>
      </div>
    </div>
  );
}
