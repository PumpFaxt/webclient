import React from "react";

export default function NewToken() {
  return (
    <div className="p-5 flex flex-col gap-y-5">
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
        <input
          type="number"
          min={69_420_000}
          max={69_420_000_000_000}
          name="total_supply"
          placeholder="Total Supply of Token"
          className="input-retro flex-1"
        />
      </div>

      <input
        type="number"
        name="image_url"
        placeholder="Image"
        className="input-retro"
      />

      <button className="btn-retro self-center px-8 py-1 -mb-2">
        Create Token
      </button>
    </div>
  );
}
