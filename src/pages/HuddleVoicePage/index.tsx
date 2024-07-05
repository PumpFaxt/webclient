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
    <div className="w-[30vw] bg-white/10 flex flex-col p-4 h-max mobile:w-full mobile:mb-6">
      {voiceOngoing && <Room leaveCall={() => setVoiceOngoing(false)} />}

      {!voiceOngoing && props.creator == address && !roomExists && (
        <>
          <button
            className="bg-orange-500 text-black font-medium px-6 py-2"
            onClick={startNew}
          >
            Start Voice Channel
          </button>
          <span className="mt-3 text-sm text-front/60">
            You are the creator of this Coin, So you can start a voice channel
            and other people can join it. Note: Each session will last for 30
            minutes
          </span>
        </>
      )}

      {!voiceOngoing && props.creator != address && (
        <span>You can join voice channel when creator starts it</span>
      )}

      {!voiceOngoing && roomExists && (
        <ConnectionDialogue
          className=""
          roomId={props.roomId}
          startCall={() => setVoiceOngoing(true)}
          setToken={setToken}
        />
      )}
    </div>
  );
}
