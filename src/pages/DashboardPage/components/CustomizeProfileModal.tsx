import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractDefinitions from "../../../contracts";

export default function CustomizeProfileModal() {
  const modal = useModal();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = Array.from({ length: 20 }, (_, i) => i);

  const handleClick = (i: number) => {
    setSelectedImage(i);
  };

  const [loading, setLoading] = useState(false);

  const updateProfile = useContractWrite({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "setDisplayPictureIndex",
  });

  function handleUpdateProfile() {
    setLoading(true);
    if (selectedImage !== null) {
      updateProfile.write({
        args: [selectedImage],
      });
    } else {
      setLoading(false);
    }
  }

  useWaitForTransaction({
    hash: updateProfile.data?.hash,
    onSuccess: async () => {
      setLoading(false);
      modal.hide();
    },
    onError: () => {
      setLoading(false);
    },
  });

  return (
    <div className="bg-background max-w-[60vw] p-2 relative">
      <button
        className="absolute top-6 right-6 hover:text-red-500 hover:border-red-500 duration-100 ease-in text-xl border p-1 rounded-full"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" />
      </button>
      <div className="bg-background p-[0.2rem] border-2 border-front">
        <div className="bg-background border-2 border-front py-8">
          <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold relative overflow-hidden mobile:text-center">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient text-transparent">
                Customize your profile
              </span>
              Customize your profile
            </h1>
            <p className="text-opacity-80 text-front text-center mt-3">
              Surf through the different Wojack profiles and click to select
              your favorite one!
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center mt-6">
              {images.map((i) => (
                <img
                  key={i}
                  src={`/images/wojack/${i}.png`}
                  alt={`Wojack ${i}`}
                  className={`h-[12vh] aspect-square object-cover border p-1 rounded-full transition ease-in duration-100 hover:opacity-100 ${
                    selectedImage === i ? "scale-105 border-2" : "opacity-50"
                  }`}
                  onClick={() => handleClick(i)}
                />
              ))}
            </div>

            <button
              disabled={!selectedImage || loading}
              className={twMerge(
                "mt-8 px-4 bg-primary py-2 text-back font-bold",
                (!selectedImage || loading) && "opacity-40",
                loading && "animate-pulse"
              )}
              onClick={() => handleUpdateProfile()}
            >
              Update profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
