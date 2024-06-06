import React from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-y-10">
      <Header />
      <Stats />
    </div>
  );
}
