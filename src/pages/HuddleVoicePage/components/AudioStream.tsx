import React, { useEffect, useRef } from "react";
import { useRemoteAudio } from "@huddle01/react/hooks";

interface AudioProps {
  peerId: string;
}

export default function AudioStream(props: AudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { stream, state } = useRemoteAudio({
    peerId: props.peerId,
  });

  useEffect(() => {
    if (stream && audioRef.current && state === "playable") {
      audioRef.current.srcObject = stream;

      audioRef.current.onloadedmetadata = async () => {
        try {
          audioRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      audioRef.current.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
  }, [stream, state]);

  return <>{stream && <audio ref={audioRef} autoPlay></audio>}</>;
}
