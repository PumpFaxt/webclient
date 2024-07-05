import React, { useEffect, useState } from "react";
import ConnectionDialogue from "./components/ConnectionDialogue";
import Room from "./components/Room";
import { Address } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import api from "../../utils/api";

export default function HuddleVoicePage(props: {
  tokenAddress: Address;
  creator: Address;
  roomId: string;
  roomIdExpiration: number;
  refetchTokenData: () => void;
}) {
  const { address } = useAccount();
  const [voiceOngoing, setVoiceOngoing] = useState(false);
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

  const roomExists = props.roomId && props.roomIdExpiration > Date.now();

  const { signMessage, data: signature } = useSignMessage();

  async function startNew() {
    setLoading(true);
    const nonce = await api.huddle.getNewMeetingNonce(props.tokenAddress);
    signMessage({ message: nonce });
  }

  useEffect(() => {
    if (signature) {
      api.huddle
        .startNewMeeting(props.tokenAddress, signature)
        .then((res) => {
          props.refetchTokenData();
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [signature]);

  return (
    <div>
      {voiceOngoing && <Room leaveCall={() => setVoiceOngoing(false)} />}

      {!voiceOngoing && props.creator == address && !roomExists && (
        <button
          className="bg-orange-500 text-black font-medium px-6 py-2 ml-10"
          onClick={startNew}
        >
          Start Voice Channel
        </button>
      )}

      {!voiceOngoing && roomExists && (
        <ConnectionDialogue
          className="w-1/4"
          roomId={props.roomId}
          startCall={() => setVoiceOngoing(true)}
          setToken={setToken}
        />
      )}
    </div>
  );
}
