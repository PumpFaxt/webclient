import { Link, useNavigate } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import FlexSeparator from "./FlexSeparator";
import Icon from "./Icon";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center p-3">
      <button
        onClick={() => navigate("/showcase")}
        className="flex items-center text-2xl gap-x-4 mobile:gap-x-2"
      >
        <img src="/logo.png" className="h-[1.8em] aspect-square" />
        <h1 className="mobile:flex mobile:flex-col">
          PumpFaxt{" "}
          <span className="text-xs opacity-50 mobile:self-end">
            (Pump It Fast)
          </span>
        </h1>
      </button>

      <FlexSeparator />

      <div className="flex items-center mobile:flex-col-reverse mobile:gap-y-1 mobile:items-end">
        <Link
          to="/faucet"
          className="mr-4 underline hover:no-underline widescreen:text-sm"
        >
          How to get Frax?
        </Link>
        <ConnectWallet />
      </div>
    </nav>
  );
}
