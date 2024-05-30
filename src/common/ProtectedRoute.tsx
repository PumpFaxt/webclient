import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

export enum ProtectedTypes {
  PUBLICONLY,
  CONNECTEDONLY,
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
  return <Navigate to="/" />;
}
