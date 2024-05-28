import React from "react";

export default function Header() {
  return (
    <section className="p-page py-5 flex flex-col items-center">
      <div className="flex flex-col w-1/2 bg-secondary px-8 py-6 saturate-0 focus-within:saturate-100 select-none">
        <input
          type="text"
          name="query"
          id="query-input"
          className="bg-foreground text-black p-2 border-2 border-t-black border-l-gray-700 border-r-gray-400 border-b-gray-400 outline-none focus:outline-black focus:outline-1 focus-within:outline-offset-0"
          placeholder="Type to search for token"
        />
        <div className="flex justify-center pt-3 gap-x-2">
          <button className="btn-retro px-5 py-1">Search Token</button>
          <button className="btn-retro px-5 py-1 flex gap-x-1 items-center">
            <img
              src="https://i.kym-cdn.com/entries/icons/original/000/031/727/cover10.jpg"
              alt="YES"
              className="h-[1.4em]"
            />
            Yes
          </button>
        </div>
      </div>
    </section>
  );
}
