import React from "react";
import { isAddress } from "viem";
import { useContractRead } from "wagmi";
import contractDefinitions from "../contracts";

export default function UsernameWrapper(props: { children: React.ReactNode }) {
  if (typeof props.children != "string" || !isAddress(props.children))
    return props.children;

  const address = props.children;

  const username = useContractRead({
    ...contractDefinitions.usernameRental,
    functionName: "getDisplayName",
    args: [address],
  });

  return <>{username || address}</>;
}
