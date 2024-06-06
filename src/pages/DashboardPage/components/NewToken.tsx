import React, { useState } from "react";
import { Coin } from "../../../types";
import CoinCard from "../../../common/CoinCard";
import { useAccount } from "wagmi";

export default function NewToken() {
  const { address } = useAccount();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [token, setToken] = useState<any>({
    name: "",
    image_uri: imagePreview,
    symbol: "",
    creator: address,
    description: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setToken((prevToken: any) => ({
      ...prevToken,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setToken((prevToken: any) => ({
        ...prevToken,
        image_uri: imageUrl,
      }));
    }
  };

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
        <input
          type="number"
          min={69_420_000}
          max={69_420_000_000_000}
          name="total_supply"
          placeholder="Total Supply of Token"
          className="input-retro flex-1"
        />
      </div>
      <textarea
        name="description"
        placeholder="Token description"
        className="input-retro flex-1"
        value={token.description}
        onChange={handleChange}
      />

      <input
        type="file"
        accept="image/*"
        name="image_url"
        placeholder="Image"
        className="input-retro"
        onChange={handleImageChange}
      />

      <button className="btn-retro self-center px-8 py-1 -mb-2">
        Create Token
      </button>
      <div className="bg-background w-max p-2">
        <CoinCard coin={token} className="max-h-[20vh] max-w-[30vw]" />
      </div>
    </div>
  );
}
