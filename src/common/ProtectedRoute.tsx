import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { jwtExists } from "../utils/api";

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
  const loading = false;

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
    console.log(jwtExists());
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
