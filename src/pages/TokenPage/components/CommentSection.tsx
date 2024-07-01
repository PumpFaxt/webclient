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

