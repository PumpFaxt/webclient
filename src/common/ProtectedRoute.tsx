import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import api, { jwtExists } from "../utils/api";
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
  const [verified, setVerified] = useState(false);

  async function verifyJwt() {
    setLoading(true);
    setVerified(false);
    if (jwtExists()) {
      const d = await api.user.verifyToken();
      setVerified(!d.invalidToken && d.user.address == address);
    }
    setLoading(false);
  }

  useEffect(() => {
    verifyJwt();
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

  return <Navigate to="/" />;
}
