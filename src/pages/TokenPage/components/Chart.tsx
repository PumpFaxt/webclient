import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useContractEvent, useContractRead, usePublicClient } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress } from "viem";
import { Navigate } from "react-router-dom";

export default function Chart(props: { address: string }) {
  const [series, setSeries] = useState<Array<{ x: Date; y: number }>>([]);

  const { getContractEvents } = usePublicClient();

  if (!isAddress(props.address)) return <Navigate to="/showcase" />;

  useContractEvent({
    ...contractDefinitions.token,
    address: props.address,
    eventName: "PriceChange",
    listener: (logs) => {
      logs.forEach((log) =>
        setSeries((s) => [
          ...s,
          { x: new Date(Number(log.args.time)), y: Number(log.args.value) },
        ])
      );
    },
  });

  const config = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={{ ...config }}
          series={[{ data: series }]}
          type="candlestick"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
