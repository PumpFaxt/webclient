import React from "react";
import { Navigate, useParams } from "react-router-dom";

export default function TokenPage() {
  const { id } = useParams();

  if (!id) return <Navigate to="/showcase" />;

  return <div>index</div>;
}
