import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useContractEvent, useContractRead, usePublicClient } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress } from "viem";
import { Token } from "../../../types";
import { twMerge } from "tailwind-merge";
import { ApexOptions } from "apexcharts";
import { ONE_FRAX } from "../../../config";
import FlexSeparator from "../../../common/FlexSeparator";

export default function Chart(props: {
  token: Token | undefined;
  className?: string;
  color: string;
}) {
  const { token } = props;

  const [series, setSeries] = useState<Array<[number, number]>>([]);

  const [indexBy, setIndexBy] = useState<"value" | "marketCap">("value");

  const { getContractEvents } = usePublicClient();

  async function loadPriceFeed() {
    setSeries([]);
    const logs = await getContractEvents({
      ...contractDefinitions.token,
      address: token?.address,
      fromBlock: BigInt(token?.createdBlock || 0),
      toBlock: "latest",
      eventName: "PriceChange",
    });

    setSeries(
      logs.map((l) => [
        Number(l.args.time) * 1000,
        Number(l.args[indexBy]) / Number(ONE_FRAX),
      ])
    );
  }

  useEffect(() => {
    loadPriceFeed();
  }, [indexBy]);

  useContractEvent({
    ...contractDefinitions.token,
    address: token?.address,
    eventName: "PriceChange",
    listener: (logs) => {
      loadPriceFeed();
    },
  });

  const config: ApexOptions = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    grid: { borderColor: "#ffffff34" },
    xaxis: {
      type: "datetime",
      min: new Date(series[0]?.[0] || 1).getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM hh:mm",
      },
      theme: "dark",
    },
    colors: [props.color],
    stroke: { width: 1 },
    fill: {
      type: "gradient",
      colors: [props.color],
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
  };

  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <div
      id="chart"
      ref={containerRef}
      className={twMerge("", props.className)}
      key={series.length.toString()}
    >
      <div className="flex mb-2">
        <FlexSeparator />

        <button
          className={twMerge(
            "px-3 border border-slate-800 font-light text-sm",
            indexBy == "value" && "bg-slate-700 "
          )}
          onClick={() => {
            setIndexBy("value");
          }}
        >
          Price
        </button>
        <button
          className={twMerge(
            "px-3 border border-slate-800 font-light text-sm",
            indexBy == "marketCap" && "bg-slate-700 "
          )}
          onClick={() => {
            setIndexBy("marketCap");
          }}
        >
          Mkt Cap
        </button>
      </div>

      {token && series && series.length > 0 && (
        <ReactApexChart
          options={{ ...config }}
          series={[{ data: series, name: indexBy }]}
          type="area"
          height={containerRef.current.getBoundingClientRect().width * (9 / 18)}
        />
      )}
    </div>
  );
}
