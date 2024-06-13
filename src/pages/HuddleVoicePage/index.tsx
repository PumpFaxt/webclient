import React, { useState } from "react";
import ConnectionDialogue from "./components/ConnectionDialogue";
import Room from "./components/Room";

export default function HuddleVoicePage() {
  const [voiceOngoing, setVoiceOngoing] = useState(false);
  const [token, setToken] = useState("");

  return (
    <div>
      {voiceOngoing ? (
        <Room leaveCall={() => setVoiceOngoing(false)} />
      ) : (
        <ConnectionDialogue
          className="w-1/4"
          roomId="zqb-mqen-gpk"
          startCall={() => setVoiceOngoing(true)}
          setToken={setToken}
        />
      )}
    </div>
  );
}
