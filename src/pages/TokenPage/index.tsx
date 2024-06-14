import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";

export default function TokenPage() {
  const { id } = useParams();

  if (!id) return <Navigate to="/showcase" />;

  return (
    <div className="p-page py-4">
      <Header />
    </div>
  );
}
