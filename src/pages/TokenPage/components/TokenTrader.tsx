import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function TokenTrader() {
  const [active, setActive] = useState("BUY");
  return <div className="border border-front/20 w-1/4 p-3"></div>;
}
