import React, { useEffect, useState } from "react";

export default function FormattedCurrency(props: {
  value: number | undefined;
  unit: "frax" | "token" | "usd";
}) {
  const [res, setRes] = useState<number | string | undefined>(props.value);

  function format() {
    if (props.value == undefined) return;
    if (props.unit == "frax") setRes(props.value / Math.pow(10, 18));
    if (props.unit == "token") setRes(props.value / Math.pow(10, 18));
    if (props.unit == "usd") setRes("props.value / Math.pow(10, 18)");
  }

  useEffect(() => {
    format();
  }, [props.value]);

  return (
    <span>
      {res || (
        <span className="w-[1em] h-[1em] border rounded-full border-dashed border-front" />
      )}
    </span>
  );
}
