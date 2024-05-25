import ConnectWallet from "./ConnectWallet";
import FlexSeparator from "./FlexSeparator";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center p-3">
      <div className="flex items-center text-2xl gap-x-4">
        <img src="/logo.png" className="h-[1.8em] aspect-square" />
        <h1>PumpFaxt.it</h1>
      </div>

      <FlexSeparator />

      <ConnectWallet />
    </nav>
  );
}
