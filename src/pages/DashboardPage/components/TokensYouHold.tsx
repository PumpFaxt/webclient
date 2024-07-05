import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getImageDominantRgb, getLuminicanceFromRgb } from "../../../utils";
import { Link } from "react-router-dom";
import UsernameWrapper from "../../../common/UsernameWrapper";

export default function TokensYouHold() {
  return (
    <section className="flex flex-col items-center p-page">
      {/* <div
        className={twMerge(
          "w-1/3",
          !coins.loading && "h-0 opacity-0 pointer-events-none"
        )}
      >
        <img src="/images/pepe-loader.gif" alt="PEPE" />
      </div>

      {!coins.loading && (

     )}  */}

      <div className="flex justify-between group/showcase flex-col w-full gap-y-4 my-6">
        {coins.map((coin, i) => (
          <CoinCard coin={coin} />
        ))}
      </div>
    </section>
  );
}

function CoinCard(props: { coin: any; className?: string }) {
  const data = props.coin;

  const [color, setColor] = useState("rgb(255, 255, 255)");

  async function loadData() {
    const rgbClamped = await getImageDominantRgb(data.image_uri);
    var rgb = [rgbClamped[0], rgbClamped[1], rgbClamped[2]];
    while (getLuminicanceFromRgb(rgb) < 128) {
      rgb[0] += 1;
      rgb[1] += 1;
      rgb[2] += 1;
    }
    const clr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    setColor(clr);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Link
      to={`/T/${data.signature}`}
      className={twMerge(
        props.className,
        "flex border border-front/20 rounded-lg select-none relative overflow-hidden group bg-background justify-between p-2 items-start z-1"
      )}
    >
      <div className="flex">
        <img
          src="/images/rainbow-bg.gif"
          alt="rainbouu"
          className="absolute-cover opacity-0 group-hover:opacity-100 group-hover:duration-[100000ms] ease-out duration-[3000ms] -z-1"
        />

        <img
          src={data.image_uri}
          alt={data.name}
          className="m-2 object-contain max-h-[15vh] rounded-lg"
        />
        <div className="flex flex-col m-3 gap-y-1 group-hover:mix-blend-difference">
          <h3
            className="font-semibold tracking-wide text-lg"
            style={{ color: color }}
          >
            {data.name
              .replaceAll(/solana/gi, "Fraxtal")
              .replaceAll(/sol/gi, "frax")}
          </h3>
          <h4 className="text-sm font-semibold text-front/70">
            TICKER : {data.symbol}
          </h4>

          <h5 className="text-pink-400 text-xs my-[1px]">
            Created by
            <UsernameWrapper>{data.creator}</UsernameWrapper>
          </h5>

          <p className="mt-1 text-sm text-front/90 font-light line-clamp-4">
            {data.description.replaceAll(/sol/gi, "usd")}
          </p>
        </div>
      </div>
      <div className="m-3 flex flex-col justify-around font-mono">
        <p>
          <span className="font-bold text-neutral-400">Amount: </span>
          {data.amount}
        </p>
        <p>
          <span className="font-bold text-neutral-400">Price: </span>
          {data.price} USD
        </p>
        <p>
          <span className="font-bold text-neutral-400">24hr Change: </span>
          <span
            className={twMerge(
              data.change < 0 ? "text-red-500" : "text-green-500"
            )}
          >
            {data.change}%
          </span>
        </p>
      </div>
    </Link>
  );
}

const coins = [
  {
    name: "Token Alpha",
    image_uri:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww",
    symbol: "TKA",
    creator: "0x123456789abcdef",
    description: "This is the first token.",
    ipfsImage: "ipfs://QmExample1",
    telegram: "@tokenalpha",
    twitter: "@tokenalpha",
    website: "https://tokenalpha.com",
    amount: 1000,
    marketCap: "10m",
    price: 1.5,
    change: 2.5,
    value: 1500,
  },
  {
    name: "Token Beta",
    image_uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qLxrCXKtk28GzhIt0Yl_AkMeJ1jPVE4lBwH9z23kRRSJf4pgt9A9PFxZIaDbyolnx9o&usqp=CAU",
    symbol: "TKB",
    creator: "0xabcdef123456789",
    description: "This is the second token.",
    ipfsImage: "ipfs://QmExample2",
    telegram: "@tokenbeta",
    twitter: "@tokenbeta",
    website: "https://tokenbeta.com",
    amount: 5000,
    marketCap: "1.2B",
    price: 10.0,
    change: -1.2,
    value: 50000,
  },
  {
    name: "Token Gamma",
    image_uri: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    symbol: "TKG",
    creator: "0x789abcdef123456",
    description: "This is the third token.",
    ipfsImage: "ipfs://QmExample3",
    telegram: "@tokengamma",
    twitter: "@tokengamma",
    website: "https://tokengamma.com",
    amount: 2500,
    marketCap: "21k",
    price: 5.0,
    change: 0.8,
    value: 12500,
  },
];
