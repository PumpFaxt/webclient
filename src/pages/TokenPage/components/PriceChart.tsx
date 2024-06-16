import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import { twMerge } from "tailwind-merge";

export default function (props: { address: string; className?: string }) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const flag = useRef(false);

  const feed = useApiResponse(api.tokens.getPriceFeed, props.address);

  useEffect(() => {
    if (!flag.current && feed.data) {
      flag.current = true;

      feed.data.sort((a: any, b: any) => a.time - b.time);

      console.log(feed.data);

      const rect = ref.current.getBoundingClientRect();

      const chart = createChart(ref.current, {
        width: rect.width,
        height: rect.height,
        watermark: { text: "pumpfaxt.it" },

        layout: { background: { color: "#112" }, textColor: "#fff" },
        grid: { vertLines: { color: "#333" }, horzLines: { color: "#333" } },
      });
      // const candles = chart.addAreaSeries({
      //   lineColor: "#2962FF",
      //   topColor: "#2962FF",
      //   bottomColor: "rgba(41, 98, 255, 0.28)",
      // });

      // candles.setData(feed.data);

      // chart.timeScale().fitContent();
      const areaSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });
      areaSeries.setData(
        feed.data.map((o: any) => ({ time: o.time, price: o.mktCap }))
      );

      chart.timeScale().fitContent();
      // (ref.current as any).timeScale().fitContent();
    }
  }, [feed]);

  return <div className={twMerge(props.className)} ref={ref} />;
}
