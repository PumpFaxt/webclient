import React, { useState } from "react";
import CoinCard from "../../../common/TokenCard";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractDefinitions from "../../../contracts";
import { format18DecimalsToken, generateRandomString } from "../../../utils";
import DataForm from "../../../common/DataForm";
import { Token } from "../../../types";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ONE_TOKEN } from "../../../config";

export default function NewToken() {
  const { address } = useAccount();

  const [selectedImage, setSelectedImage] = useState<File>();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState<Record<string, any>>({});

  const [loading, setLoading] = useState(false);
  console.log(loading);

  const { data: minimumInitialSupply } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "minimumInitialSupply",
  });
  const { data: maximumInitialSupply } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "maximumInitialSupply",
  });

  const fraxAllowance = useContractRead({
    ...contractDefinitions.frax,
    functionName: "allowance",
    args: [address || "0x", contractDefinitions.pumpItFaxtInterface.address],
  });

  const approveTransfer = useContractWrite({
    ...contractDefinitions.frax,
    functionName: "approve",
  });

  useWaitForTransaction({
    hash: approveTransfer.data?.hash,
    onSuccess: async () => {
      newToken.write({
        args: [
          formData.supply,
          formData.name,
          formData.symbol,
          formData.ipfs,
          formData.metadata,
        ],
      });
    },
  });

  const newToken = useContractWrite({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "deployNewToken",
  });

  const deploymentCharge = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "deploymentCharge",
  });

  useWaitForTransaction({
    hash: newToken.data?.hash,
    onSuccess: async () => {
      toast.log({
        title: "Successfully created new token",
      });
      setTimeout(() => {
        navigate("/showcase");
      }, 3200);
      setLoading(false);
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
    }
  }

  async function uploadAtIPFS() {
    if (!selectedImage) return toast.error({ title: "Please upload image" });

    const formData = new FormData();
    formData.append("file", selectedImage);
    const metadata = JSON.stringify({
      name: "0x" + generateRandomString(32),
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });
    const resData = await res.json();

    if (resData.IpfsHash) return "https://ipfs.io/ipfs/" + resData.IpfsHash;
  }

  return (
    <DataForm
      callback={async (data) => {
        setLoading(true);
        const metadata: Partial<Token> = {};

        data.telegram && (metadata.telegram = data.telegram);
        data.website && (metadata.website = data.website);
        data.twitter && (metadata.twitter = data.twitter);
        data.description && (metadata.description = data.description);

        if (
          !data.name &&
          !data.description &&
          !data.symbol &&
          !data.initial_supply
        ) {
          setLoading(false);
          return toast.error({ title: "Bruh??" });
        }

        if (!data.name || !data.symbol) {
          setLoading(false);
          return toast.error({
            title: "iota token?  { Name or symbol missing }",
          });
        }

        if (data.description.length < 10) {
          setLoading(false);
          return toast.error({ title: "Too short, or no Description" });
        }

        if (!data.initial_supply) {
          setLoading(false);
          return toast.error({
            title: "Missing Initial Supplu, What will people even buy?",
          });
        }

        if (
          BigInt(data.initial_supply) * ONE_TOKEN >
          (maximumInitialSupply || Infinity)
        ) {
          setLoading(false);
          return toast.error({
            title: "Initial Supply greater than maximum",
          });
        }

        if (
          BigInt(data.initial_supply) * ONE_TOKEN <
          (minimumInitialSupply || 0n)
        ) {
          setLoading(false);
          return toast.error({
            title: "Initial Supply smaller than minimum",
          });
        }

        const ipfs = await uploadAtIPFS();

        if (typeof ipfs != "string") {
          setLoading(false);
          return toast.error({ title: "IPFS Error, please try again" });
        }

        if (!deploymentCharge.data) {
          setLoading(false);
          return toast.error({ title: "Try again later" });
        }

        setFormData({
          supply: BigInt(data.initial_supply),
          name: data.name,
          symbol: data.symbol,
          ipfs: ipfs,
          metadata: JSON.stringify(metadata),
        });

        if (
          fraxAllowance?.data &&
          fraxAllowance.data >= deploymentCharge.data
        ) {
          newToken.write({
            args: [
              formData.supply,
              formData.name,
              formData.symbol,
              formData.ipfs,
              formData.metadata,
            ],
          });
        } else {
          approveTransfer.write({
            args: [
              contractDefinitions.pumpItFaxtInterface.address,
              deploymentCharge.data,
            ],
          });
        }
      }}
      className={twMerge("p-5 flex flex-col gap-y-5")}
    >
      <div className="flex gap-x-5">
        <input
          type="text"
          name="name"
          placeholder="Name of token (eg: Frax Doge)"
          className="input-retro flex-1"
        />
        <input
          type="text"
          name="symbol"
          placeholder="Token Symbol (eg: FXD)"
          minLength={2}
          maxLength={6}
          className="input-retro flex-1"
        />

        {minimumInitialSupply != undefined &&
          maximumInitialSupply != undefined && (
            <div className="relative flex-1 group">
              <p className="absolute flex flex-col gap-y-1 text-red-600 leading-none text-[0.7rem] bottom-full right-0 text-end -translate-y-1 font-semibold group-focus-within:opacity-100 opacity-0 duration-150">
                <span>
                  * MinimumSupply:{" "}
                  {format18DecimalsToken(minimumInitialSupply).toLocaleString()}{" "}
                </span>

                <span>
                  * MaximumSupply:{" "}
                  {format18DecimalsToken(maximumInitialSupply).toLocaleString()}
                </span>
              </p>
              <input
                type="number"
                name="initial_supply"
                placeholder="Total Supply of Token"
                className="input-retro w-full"
                min={format18DecimalsToken(minimumInitialSupply)}
                max={format18DecimalsToken(maximumInitialSupply)}
              />
            </div>
          )}
      </div>
      <textarea
        name="description"
        placeholder="Token description"
        className="input-retro flex-1"
      />

      <div className="flex gap-x-5">
        <input
          type="link"
          name="website"
          placeholder="Website (Optional)"
          className="input-retro flex-1"
        />
        <input
          type="link"
          name="telegram"
          placeholder="Telegram Username (Optional)"
          className="input-retro flex-1"
        />
        <input
          type="link"
          name="twitter"
          placeholder="Twitter username (Optional)"
          className="input-retro flex-1"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        placeholder="Image"
        className="input-retro"
        onChange={handleImageChange}
      />

      <input
        type="submit"
        className={twMerge(
          "btn-retro self-center px-8 py-1 -mb-2 disabled:hidden"
        )}
        value="Pump It"
        disabled={loading}
      />

      <div
        className={twMerge(
          "self-center flex gap-y-2 items-center flex-col absolute top-1/2 -translate-y-1/2 bg-secondary/90 w-full h-full justify-center",
          loading ? "" : "hidden"
        )}
      >
        <img
          src="/images/loading-doge.gif"
          alt="loading"
          className="w-[16vw]"
        />
      </div>
    </DataForm>
  );
}
