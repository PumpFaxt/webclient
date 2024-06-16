import React, { useState } from "react";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";
import NewToken from "./NewToken";
import TokensYouHold from "./TokensYouHold";
import TokensYouDeployed from "./TokensYouDeployed";

const displays = [
  { title: "Create New Meme coin", element: <NewToken /> },
  { title: "Coins you hold", element: <TokensYouHold /> },
  { title: "Coins you deployed", element: <TokensYouDeployed /> },
];

export default function Stats() {
  const [currentDispalying, setCurrentDisplaying] = useState(0);
  const [showingDropdown, setShowingDropdown] = useState(false);

  return (
    <section className="p-page">
      <div className="bg-secondary p-1">
        <div className=" p-1 border-2 border-front">
          <div className="p-4 border-2 border-front">
            <div className="border-2 border-stone-600 p-3 relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-10">
                <button
                  className="bg-secondary text-back text-sm font-light pl-1 pr-0 flex items-center gap-x-1"
                  onClick={() => setShowingDropdown((b) => !b)}
                >
                  {displays[currentDispalying].title}
                  <Icon icon="expand_more" className="text-lg" />
                </button>
                <div
                  className={twMerge(
                    "flex flex-col absolute top-full w-max left-1/2 -translate-x-1/2 bg-white text-black border border-black/50 text-sm divide-y-[1px] divide-black duration-300",
                    showingDropdown
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  )}
                >
                  {displays.map((item, key) => (
                    <button
                      className="whitespace-nowrap py-1 px-3 hover:bg-gray-300 duration-100"
                      key={key}
                      onClick={() => {
                        setShowingDropdown(false);
                        setCurrentDisplaying(key);
                      }}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              {displays[currentDispalying].element}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
