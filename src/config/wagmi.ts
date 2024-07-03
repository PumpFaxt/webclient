import { configureChains, createConfig } from "wagmi";
import { Chain } from "viem/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const fraxtal: Chain = {
  id: 252,
  name: "Fraxtal Mainnet L2",
  network: "Fraxtal",
  nativeCurrency: { symbol: "frxETH", name: "Frax Eth", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.frax.com"] },
    public: { http: ["https://rpc.frax.com"] },
  },
  testnet: true,
  blockExplorers: {
    default: { name: "fraxscan", url: "https://fraxscan.com" },
  },
};

const fraxtalTestnet: Chain = {
  id: 2522,
  name: "Fraxtal Testnet L2",
  network: "Fraxtal Testnet",
  nativeCurrency: { symbol: "frxETH", name: "Frax Eth", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.frax.com"] },
    public: { http: ["https://rpc.testnet.frax.com"] },
  },
  testnet: true,
  blockExplorers: {
    default: { name: "fraxscan", url: "https://holesky.fraxscan.com" },
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fraxtal],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  logger: { warn: (msg) => console.warn(msg) },
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        projectId: "756f8ad5a4c44ce4fbd9897445a10187",
        qrModalOptions: { themeMode: "dark" },
        metadata: {
          name: "PumpFaxt",
          description: "memecoin trading platform",
          icons: ["/favicon.ico"],
          url: window.location.hostname,
        },
      },
      chains: [fraxtal],
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default wagmiConfig;
export { publicClient, webSocketPublicClient };
