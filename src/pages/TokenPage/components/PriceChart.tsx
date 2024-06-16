import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { twMerge } from "tailwind-merge";

export default function (props: { address: string; className?: string }) {
  const ref = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const flag = useRef(false);

  const feed = useApiResponse(api.tokens.getPriceFeed, props.address);

  useEffect(() => {
    if (!flag.current && feed.data) {
      flag.current = true;

      const chart = createChart(ref.current, {});
      const candles = chart.addCandlestickSeries({});
      candles.setData(feed.data);
    }
  }, [feed]);

  return <canvas className={twMerge(props.className)} ref={ref} />;
}
