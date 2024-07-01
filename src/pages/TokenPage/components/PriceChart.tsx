import React from "react";
import { twMerge } from "tailwind-merge";

export default function PriceChart(props: {
  address: string;
  className?: string;
}) {
  return (
    <>
      <div className={twMerge("relative contrast-150", props.className)}>
        <iframe
          src="https://dexscreener.com/ethereum/0x16aC64ddFaCca437bE7FE0dA0c45Bcd97227588a?embed=1&theme=dark&trades=0&info=0"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </>
  );
}

// import React, { useEffect, useRef } from "react";
// import { createChart } from "lightweight-charts";
// import useApiResponse from "../../../hooks/useApiResponse";
// import api from "../../../utils/api";
// import { twMerge } from "tailwind-merge";
// import { useContractEvent } from "wagmi";
// import contractDefinitions from "../../../contracts";
// import { isAddress } from "viem";

// export default function (props: { address: string; className?: string }) {
//   const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
//   const flag = useRef(false);

//   if (!isAddress(props.address)) return <></>;

//   const feed = useApiResponse(api.tokens.getPriceFeed, props.address);

//   useContractEvent({
//     ...contractDefinitions.token,
//     address: props.address,
//     listener: () => {
//       feed.refetch();
//     },
//     eventName: "PriceChange",
//   });

//   useEffect(() => {
//     if (!flag.current && feed.data) {
//       flag.current = true;

//       feed.data.sort((a: any, b: any) => a.time - b.time);

//       const candlesticks = convertToCandlestick(feed.data, 1000);

//       const rect = ref.current.getBoundingClientRect();

//       const chart = createChart(ref.current, {
//         width: rect.width,
//         height: rect.height,
//         watermark: { text: "pumpfaxt" },
//         rightPriceScale: { autoScale: true },
//         layout: { background: { color: "#111" }, textColor: "#fff" },
//         grid: { vertLines: { color: "#222" }, horzLines: { color: "#222" } },
//       });

//       const series = chart.addCandlestickSeries({
//         priceFormat: { precision: 8, type: "price" },
//       });
//       series.setData(candlesticks as any);

//       chart.timeScale().fitContent();
//     }
//   }, [feed]);

//   return <div className={twMerge(props.className)} ref={ref} />;
// }

// type TimeSeries = {
//   time: number;
//   value: number;
// };

// type Candlestick = {
//   time: number;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// };

// function convertToCandlestick(
//   data: TimeSeries[],
//   interval: number
// ): Candlestick[] {
//   data.sort((a, b) => a.time - b.time);

//   const start = data[0].time;

//   const candleSticks: Candlestick[] = [];

//   let cs: Candlestick = {
//     low: data[0].value,
//     high: data[0].value,
//     close: data[0].value,
//     open: data[0].value,
//     time: start,
//   };

//   data.forEach((tick) => {
//     if (cs.time + interval > tick.time) {
//       cs.close = tick.value;
//       candleSticks.push(JSON.parse(JSON.stringify(cs)));

//       cs = {
//         low: tick.value,
//         high: tick.value,
//         close: tick.value,
//         open: tick.value,
//         time: tick.time + interval,
//       };
//     }

//     cs.close = tick.value;
//     if (cs.low > tick.value) {
//       cs.low = tick.value;
//     }
//     if (cs.high < tick.value) {
//       cs.high = tick.value;
//     }
//   });

//   cs.time += 1;
//   candleSticks.push(cs);

//   return candleSticks;
// }
