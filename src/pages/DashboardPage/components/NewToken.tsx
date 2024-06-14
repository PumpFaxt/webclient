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
import TokenCard from "../../../common/TokenCard";
import { Token } from "../../../types";
import useToast from "../../../hooks/useToast";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function NewToken() {
  const { address } = useAccount();

  const [selectedImage, setSelectedImage] = useState<File>();
  const navigate = useNavigate();
  const toast = useToast();

  const { data: minimumInitialSupply } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "minimumInitialSupply",
  });

  const { data: maximumInitialSupply } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "maximumInitialSupply",
  });

  const newToken = useContractWrite({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "deployNewToken",
  });

  useWaitForTransaction({
    hash: newToken.data?.hash,
    onSuccess: async () => {
      await api.tokens.refresh();
      toast.log({
        title: "Successfully created new token",
      });
      navigate("/showcase");
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      // setSelectedImage(imageUrl);
      // setToken((prevToken: any) => ({
      //   ...prevToken,
      //   image_uri: imageUrl,
      // }));
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
        const metadata: Partial<Token> = {};

        data.telegram && (metadata.telegram = data.telegram);
        data.website && (metadata.website = data.website);
        data.twitter && (metadata.twitter = data.twitter);
        data.description && (metadata.description = data.description);

        const ipfs = await uploadAtIPFS();
        if (typeof ipfs != "string")
          return toast.error({ title: "IPFS Error, please try again" });

        newToken.write({
          args: [
            BigInt(data.initial_supply),
            data.name,
            data.symbol,
            ipfs,
            JSON.stringify(metadata),
          ],
        });
      }}
      className="p-5 flex flex-col gap-y-5"
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
            <input
              type="number"
              name="initial_supply"
              placeholder="Total Supply of Token"
              className="input-retro flex-1"
              min={format18DecimalsToken(minimumInitialSupply)}
              max={format18DecimalsToken(maximumInitialSupply)}
            />
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
          placeholder="Website"
          className="input-retro flex-1"
        />
        <input
          type="link"
          name="telegram"
          placeholder="Telegram"
          className="input-retro flex-1"
        />
        <input
          type="link"
          name="twitter"
          placeholder="Twitter"
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
        className="btn-retro self-center px-8 py-1 -mb-2"
        value="Pump It"
      />

      <div className="bg-background w-max p-2">
        {/* <TokenCard token={token} className="max-h-[20vh] max-w-[30vw]" /> */}
      </div>
    </DataForm>
  );
}
