import React, { useState } from "react";
import Header from "./components/Header";
import Showcase from "./components/Showcase";

export default function () {
  const [query, setQuery] = useState("")

  return (
    <>
      <Header setQuery={setQuery} />
      <Showcase query={query} setQuery={setQuery} />
    </>
  );
}
