import React from "react";
import { useContractRead } from "wagmi";
import contractDefinitions from "../contracts";
import { twMerge } from "tailwind-merge";
import { generateColorFromAddress } from "../utils";

export default function DisplayPicture(props: {
  address: `0x${string}`;
  className?: string;
}) {
  const profileIndex = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "displayPictureIndex",
    args: [props.address],
  });
  return (
    <div className={twMerge("relative aspect-square", props.className)}>
      <img
        src={`/images/wojack/${profileIndex.data}.png`}
        alt="pfp"
        className="w-full h-full object-cover border p-[0.1rem] rounded-full"
      />
      <div
        className="absolute inset-0 rounded-full mix-blend-color"
        style={{
          backgroundColor: generateColorFromAddress(props.address),
        }}
      />
    </div>
  );
}
