import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import api, { jwtExists } from "../utils/api";
import { useEffect, useState } from "react";
import useWeb3 from "../contexts/web3context";
import useToast from "../hooks/useToast";

export enum ProtectedTypes {
  PUBLICONLY,
  CONNECTEDONLY,
  USABLEONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
  fallbackUrl?: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { address } = useAccount();
  const { usable } = useWeb3();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  if (props.type === ProtectedTypes.CONNECTEDONLY) {
    if (!address) toast.error({ title: "Connect Wallet first" });

    return <>{!loading && <>{address ? <Outlet /> : <Navigate to="/" />}</>}</>;
  }

  if (props.type === ProtectedTypes.USABLEONLY) {
    if (!usable)
      toast.error({
        title: "Network not supported",
        description: "please switch in your wallet",
      });

    return <>{!loading && <>{usable ? <Outlet /> : <Navigate to="/" />}</>}</>;
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
