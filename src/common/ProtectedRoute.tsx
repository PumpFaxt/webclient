import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { jwtExists } from "../utils/api";
import { useEffect, useState } from "react";

export enum ProtectedTypes {
  PUBLICONLY,
  CONNECTEDONLY,
  VERIFIEDONLY,
  ADMINONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
  fallbackUrl?: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [address]);

  if (props.type === ProtectedTypes.CONNECTEDONLY) {
    return <>{!loading && <>{address ? <Outlet /> : <Navigate to="/" />}</>}</>;
  }

  if (props.type === ProtectedTypes.PUBLICONLY) {
    return (
      <>
        {!loading && <>{!address ? <Outlet /> : <Navigate to="/showcase" />}</>}
      </>
    );
  }

  if (props.type === ProtectedTypes.VERIFIEDONLY) {
    return (
      <>
        {!loading && (
          <> {address && jwtExists() ? <Outlet /> : <Navigate to="/" />} </>
        )}
      </>
    );
  }
  return <Navigate to="/" />;
}
