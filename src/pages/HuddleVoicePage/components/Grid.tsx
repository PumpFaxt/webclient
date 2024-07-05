import { useLocalPeer, usePeerIds } from "@huddle01/react/hooks";
import { Role } from "@huddle01/server-sdk/auth";
import FellowCard from "./FellowCard";
import { twMerge } from "tailwind-merge";

type GridProps = {};

export default function Grid() {
  const { peerId: localPeerId, role: localPeerRole } = useLocalPeer();

  const { peerIds: hostIds } = usePeerIds({ roles: [Role.HOST] });
  const { peerIds: coHostIds } = usePeerIds({ roles: [Role.CO_HOST] });
  const { peerIds: speakerIds } = usePeerIds({ roles: [Role.SPEAKER] });
  const { peerIds: listenerIds } = usePeerIds({ roles: [Role.LISTENER] });

  const listeners =
    listenerIds.length +
    (localPeerRole && localPeerRole === Role.LISTENER ? 1 : 0);

  return (
    <div className="flex flex-col">
      <section className="flex flex-wrap gap-4">
        {[
          ...hostIds,
          undefined,
          ...coHostIds,
          ...speakerIds,
          ...listenerIds,
        ].map((peerId) => {
          return (
            <FellowCard
              key={`grid-${peerId}`}
              className={twMerge("w-full", peerId == localPeerId && "hidden")}
              peerId={peerId == localPeerId ? undefined : peerId}
            />
          );
        })}
      </section>
    </div>
  );
}
