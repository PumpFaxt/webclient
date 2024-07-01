import React, { useEffect, useRef, useState } from "react";
import { generateColorFromAddress } from "../../../utils";
import { serverUrl } from "../../../config";
import { useAccount, useSignMessage } from "wagmi";
import DataForm from "../../../common/DataForm";
import api from "../../../utils/api";
import { IGunInstance } from "gun";

interface CommentSectionProps {
  comments: string[];
  tokenAddress: string;
  gun: IGunInstance;
}

export default function CommentSection(props: CommentSectionProps) {
  const { comments, tokenAddress } = props;
  const { address } = useAccount();

  const [reply, setReply] = useState("");
  const { signMessage, data, reset } = useSignMessage();

  async function submit() {
    if (address && data) {
      await api.tokens.reply(tokenAddress, reply, data);
      setTimeout(() => {
        props.gun.put({ bool: Math.random() });
      }, 100);
      reset();
      taRef.current.value = "";
    }
  }

  useEffect(() => {
    submit();
  }, [data]);

  const taRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  return (
    <div className="w-2/3">
      <div className="flex items-start gap-x-4">
        <div className="relative w-[3vw] aspect-square">
          <img
            src={"https://pngimg.com/d/wojak_PNG109613.png"}
            alt={address}
            className="w-full h-full object-contain border p-1 rounded-full"
          />
          {address && (
            <div
              className="absolute inset-0 rounded-full mix-blend-color"
              style={{
                backgroundColor: generateColorFromAddress(address),
              }}
            />
          )}
        </div>
        {address ? (
          <DataForm
            className="w-full flex flex-col gap-y-3"
            callback={(data) => {
              const cont = JSON.stringify({
                author: address,
                content: data.content,
              });

              setReply(cont);
              signMessage({ message: cont });
            }}
          >
            <textarea
              className="bg-transparent resize-none w-full focus-within:outline-none border-b border-foreground pb-2"
              placeholder="Comment"
              name="content"
              ref={taRef}
            />
            <button className="bg-foreground w-max self-end text-back py-1 px-3 text-sm">
              Comment
            </button>
          </DataForm>
        ) : (
          <p>Connect Wallet to be able to comment</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-y-4 mt-6">
        {comments.map((comment, i) => (
          <ReplyCard key={i} comment={comment} />
        ))}
      </div>
    </div>
  );
}

function ReplyCard(props: { comment: string }) {
  const comment = JSON.parse(props.comment);

  return (
    <div className="flex items-start gap-x-4 bg-front/5 p-4 border-b border-front/30">
      <div className="relative w-[3vw] aspect-square">
        <img
          src={"https://pngimg.com/d/wojak_PNG109613.png"}
          alt={comment.author}
          className="w-full h-full object-contain border p-1 rounded-full"
        />
        <div
          className="absolute inset-0 rounded-full mix-blend-color"
          style={{ backgroundColor: generateColorFromAddress(comment.author) }}
        />
      </div>
      <div className="w-full flex flex-col text-sm">
        <div className="flex justify-between items-start">
          <h1
            style={{ color: generateColorFromAddress(comment.author) }}
            className="w-1/3 truncate"
          >
            {comment.author}
          </h1>
          <p className="text-xs">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
        <p className="text-front/80" placeholder="Comment">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

const pcomments = [
  {
    address: "0xFaB1c4B7d51A4bAcDf63eD3bCdA10F9F4A83C874",
    timestamp: "01/09/2003 14:34",
    comment:
      "Much wow! The Doge token has truly revolutionized the world of cryptocurrencies with its unique approach and dedicated community. From humble beginnings as a meme coin to a major player in the crypto space, Doge continues to impress and surprise everyone.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x4e9CE36E442e55EcD9025B9a6E0D88485d628A67",
    timestamp: "02/10/2003 11:20",
    comment: "To the moon!",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x829BD824B016326A401d083B33D092293333A830",
    timestamp: "03/11/2003 16:45",
    comment:
      "Such Doge. Very cryptocurrency. Dogecoin has brought a fun and lighthearted spirit to the world of digital finance. It's incredible to see how a meme can evolve into a powerful financial tool embraced by so many.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0xAaB4C39C0D789e0017b8eCddE9E3e8B0C2Ae1d7D",
    timestamp: "04/12/2003 08:12",
    comment: "Very cryptocurrency.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x5aAeb6053F3E94c9b9A09f33669435E7Ef1BeAed",
    timestamp: "05/01/2004 14:50",
    comment: "Wow.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0xAb58c87b518Fb362f2D5bD16E27aBc9A66C33901",
    timestamp: "06/02/2004 19:30",
    comment:
      "Such crypto. The impact of Dogecoin is undeniable. From tipping to major charitable donations, Doge has shown that it can be both fun and impactful. The community spirit behind Doge is something truly special.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x1Bc45329B1c4c1dC0E8eA8b870f30B762A69C111",
    timestamp: "07/03/2004 23:15",
    comment: "Very wow.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x2Dd3B497c1C163C5E3B169cDD8d5E8b1D6D110D3",
    timestamp: "08/04/2004 04:22",
    comment:
      "Doge power! Dogecoin has grown beyond its origins to become a symbol of the power of online communities. It is amazing to witness how a simple idea can create such a strong movement and bring people together for a common cause.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x3Ea9c5aAB5e1543C3b7a0a9Cb72875d3b1A32Fb1",
    timestamp: "09/05/2004 14:45",
    comment: "Such transaction.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
  {
    address: "0x4Aa3bB5E8dC8D6A9b0aC5A9B0a5e7D4d5cC3a9D5",
    timestamp: "10/06/2004 11:59",
    comment: "Very blockchain.",
    image: "https://pngimg.com/d/wojak_PNG109613.png",
  },
];
