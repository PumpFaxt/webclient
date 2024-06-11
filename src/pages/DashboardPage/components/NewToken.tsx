import React, { useState, useEffect } from "react";
import { Coin } from "../../../types";
import CoinCard from "../../../common/CoinCard";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractDefinitions from "../../../contracts";
import { format18DecimalsToken } from "../../../utils";

export default function NewToken() {
  const { address } = useAccount();
  const [imagePreview, setImagePreview] = useState<string>(
    "https://i.gifer.com/origin/91/9149202982b33cff11875a823529d8a1_w200.gif"
  );
  const [selectedFile, setSelectedFile]: any = useState();

  const [token, setToken] = useState<any>({
    name: "",
    image_uri: imagePreview,
    symbol: "",
    creator: address,
    description: "",
    ipfsImage: "",
    telegram: "",
    twitter: "",
    website: "",
    initial_supply: "",
  });

  const { data: minimumInitialSupply } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "minimumInitialSupply",
  });

  const { data: maximumInitialSupply } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "maximumInitialSupply",
  });

  const { data: deploymentCharge } = useContractRead({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "deploymentCharge",
  });

  const approveFraxToInterface = useContractWrite({
    ...contractDefinitions.frax,
    functionName: "approve",
  });

  const newCoinOnPumpItFaxt = useContractWrite({
    ...contractDefinitions.pumpItFaxtInterface,
    functionName: "deployNewToken",
  });

  useWaitForTransaction({
    hash: approveFraxToInterface.data?.hash,
    onSettled() {
      console.log([
        format18DecimalsToken(Number(minimumInitialSupply)),
        format18DecimalsToken(Number(maximumInitialSupply)),
        BigInt(Number(token.initial_supply)),
        token.name,
        token.symbol,
        token.ipfsImage,
      ]);
      newCoinOnPumpItFaxt.write({
        args: [
          BigInt(Number(token.initial_supply)),
          token.name,
          token.symbol,
          token.ipfsImage,
        ],
      });

      // newPolicyArgs && newPolicyOnSurity.write({ args: newPolicyArgs });
      // console.log("New Token created");
    },
  });

  useWaitForTransaction({
    hash: newCoinOnPumpItFaxt.data?.hash,
    onSettled() {
      // newPolicyArgs && newPolicyOnSurity.write({ args: newPolicyArgs });
      console.log("New Token created");
    },
  });

  function handleChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setToken((prevToken: any) => ({
      ...prevToken,
      [name]: value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setToken((prevToken: any) => ({
        ...prevToken,
        image_uri: imageUrl,
      }));
    }
  }

  async function handleSubmission() {
    console.log("Creating Token...");
    try {
      if (!deploymentCharge) return;

      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: token.name,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();

      const updatedToken = {
        ...token,
        ipfsImage: "https://ipfs.io/ipfs/" + resData.IpfsHash,
      };

      console.log("Created IPFS Image");
      approveFraxToInterface.write({
        args: [
          contractDefinitions.pumpItFaxtInterface.address,
          deploymentCharge,
        ],
      });

      console.log("Created");

      setToken(updatedToken);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="p-5 flex flex-col gap-y-5">
      <div className="flex gap-x-5">
        <input
          type="text"
          name="name"
          placeholder="Name of token (eg: Frax Doge)"
          className="input-retro flex-1"
          value={token.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="symbol"
          placeholder="Token Symbol (eg: FXD)"
          minLength={2}
          maxLength={6}
          className="input-retro flex-1"
          value={token.symbol}
          onChange={handleChange}
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
              value={token.initial_supply}
              onChange={handleChange}
            />
          )}
      </div>
      <textarea
        name="description"
        placeholder="Token description"
        className="input-retro flex-1"
        value={token.description}
        onChange={handleChange}
      />

      <div className="flex gap-x-5">
        <input
          type="link"
          name="website"
          placeholder="Website"
          className="input-retro flex-1"
          value={token.website}
          onChange={handleChange}
        />
        <input
          type="link"
          name="telegram"
          placeholder="Telegram"
          className="input-retro flex-1"
          value={token.telegram}
          onChange={handleChange}
        />
        <input
          type="link"
          name="twitter"
          placeholder="Twitter"
          value={token.twitter}
          onChange={handleChange}
          className="input-retro flex-1"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        name="image_url"
        placeholder="Image"
        className="input-retro"
        onChange={handleImageChange}
      />

      <button
        className="btn-retro self-center px-8 py-1 -mb-2"
        onClick={() => {
          handleSubmission();
        }}
      >
        Create Token
      </button>
      <div className="bg-background w-max p-2">
        <CoinCard coin={token} className="max-h-[20vh] max-w-[30vw]" />
      </div>
    </div>
  );
}
