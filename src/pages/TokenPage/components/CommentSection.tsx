import React, { useEffect, useRef, useState } from "react";
import { generateColorFromAddress } from "../../../utils";
import { serverUrl } from "../../../config";
import { useAccount, useSignMessage } from "wagmi";
import DataForm from "../../../common/DataForm";
import api from "../../../utils/api";
import { IGunInstance } from "gun";
import UsernameWrapper from "../../../common/UsernameWrapper";
import DisplayPicture from "../../../common/DisplayPicture";

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
        {address ? (
          <>
            <DisplayPicture
              address={address}
              className="w-[4vw] overflow-hidden aspect-square"
            />
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
          </>
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
      <DisplayPicture address={comment.author} className="w-[3.5vw]" />
      <div className="w-full flex flex-col text-sm">
        <div className="flex justify-between items-start">
          <h1
            style={{ color: generateColorFromAddress(comment.author) }}
            className="w-1/3 truncate"
          >
            <UsernameWrapper>{comment.author}</UsernameWrapper>
          </h1>
          <p className="text-xs">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
        <p className="text-front/80 break-words pr-5" placeholder="Comment">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
