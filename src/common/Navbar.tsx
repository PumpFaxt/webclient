import { useNavigate } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import FlexSeparator from "./FlexSeparator";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center p-3">
      <button
        onClick={() => navigate("/showcase")}
        className="flex items-center text-2xl gap-x-4"
      >
        <img src="/logo.png" className="h-[1.8em] aspect-square" />
        <h1>
          PumpFaxt <span className="text-xs opacity-50">(Pump It Fast)</span>
        </h1>
      </button>

      <FlexSeparator />

      <ConnectWallet />
    </nav>
  );
}
